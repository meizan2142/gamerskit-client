import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const StockModal = ({ data }) => {
    const [openModal, setOpenModal] = useState(false);
    const queryClient = useQueryClient();
    const [openingStock, setOpeningStock] = useState(data.totalSizes || 0);
    const [soldProducts, setSoldProducts] = useState(0);
    const [closingStock, setClosingStock] = useState(0);
    const [sizeValues, setSizeValues] = useState(data.sizes || {});
const [perPiecePrice, setPerPiecePrice] = useState(data.price || 0);
const [totalPrice, setTotalPrice] = useState((data.price || 0) * (data.totalSizes || 0));

    const handlePerPiecePriceChange = (e) => {
        const value = Number(e.target.value) || 0;
        setPerPiecePrice(value);
        setTotalPrice(value * openingStock);
    };

    const handleOpeningStockChange = (e) => {
        const value = Number(e.target.value) || 0;
        setOpeningStock(value);
        setClosingStock(value - soldProducts);
        setTotalPrice(perPiecePrice * value);
    };

    const handleSoldProductsChange = (e) => {
        const value = Number(e.target.value) || 0;
        setSoldProducts(value);
        setClosingStock(openingStock - value);
    };

    const handleSizeChange = (size, value) => {
        setSizeValues(prev => ({
            ...prev,
            [size]: Number(value) || 0
        }));
    };

    const { mutateAsync: updateStock, isPending } = useMutation({
        mutationFn: async ({ id, payload }) => {
            const response = await axios.patch(
                `${import.meta.env.VITE_API_URL}/addedProducts/${id}`,
                payload,
                {
                    headers: { 'Content-Type': 'application/json' }
                }
            );
            return response.data;
        },
        onMutate: async (variables) => {
            await queryClient.cancelQueries(['products']);
            const previousData = queryClient.getQueryData(['products']) || [];
            queryClient.setQueryData(['products'], (old) => {
                if (!old) return old;
                return old.map(product =>
                    product._id === variables.id
                        ? {
                            ...product,
                            totalSizes: variables.payload.openingStock,
                            leftProducts: variables.payload.closingStock,
                            sizes: variables.payload.sizeValues,
                            modified: variables.payload.modified,
                            perPiecePrice: variables.payload.perPiecePrice,
                            totalPrice: variables.payload.totalPrice 
                        }
                        : product
                );
            });

            return { previousData };
        },
        onError: (error, context) => {
            if (context?.previousData) {
                queryClient.setQueryData(['products'], context.previousData);
            }
            toast.error(`Update failed: ${error.response?.data?.message || error.message}`);
        },
        onSettled: () => {
            queryClient.invalidateQueries(['products']);
        },
        onSuccess: () => {
            toast.success('Stock updated successfully!');
            setOpenModal(false);
        }
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!data?._id) {
            toast.error('No product ID found');
            return;
        }

        const updatedAt = new Date().toLocaleString('en-US', {
            month: 'numeric',
            day: 'numeric',
            year: 'numeric'
        }).replace(',', '');

    const payload = {
        openingStock: openingStock,
        closingStock: closingStock,
        sizeValues: sizeValues,
        modified: updatedAt,
        perPiecePrice: perPiecePrice,
        totalPrice: totalPrice
    };


        await updateStock({ id: data._id, payload });
    };

    useEffect(() => {
        if (openModal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [openModal]);

    return (
        <div className="pt-2">
            <div>
                <Toaster />
            </div>
            <button
                onClick={() => setOpenModal(true)}
                className="rounded-lg bg-gradient-to-r from-gray-700 to-gray-600 px-6 py-2.5 font-medium text-white transition-all hover:from-gray-800 hover:to-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
                Update Closing Stock
            </button>

            <div
                className={`fixed inset-0 z-[100] grid place-items-center bg-black/30 backdrop-blur transition-opacity duration-200 ${openModal ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
                onClick={() => setOpenModal(false)}
            >
                <div
                    className={`relative my-12 w-full max-w-sm transform transition-all duration-200 ${openModal ? 'scale-100 opacity-100' : 'scale-110 opacity-0'}`}
                    onClick={(e_) => e_.stopPropagation()}
                >
                    <div className="rounded-xl bg-white p-5 shadow-lg sm:p-6 dark:bg-gray-900">
                        <div className="flex justify-end">
                            <button onClick={() => setOpenModal(false)} className="rounded-full p-1.5 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800">
                                <svg className="h-5 w-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <h2 className="mb-6 text-center text-2xl font-semibold text-gray-900 dark:text-white">{data.title}</h2>

                        <form className="space-y-5" onSubmit={handleSubmit}>
                            <div className="space-y-4">
                                <div className="flex gap-2">
                                    {/* Opening Stock */}
                                    <div className="relative">
                                        <input
                                            value={openingStock}
                                            onChange={handleOpeningStockChange}
                                            id="total"
                                            type="number"
                                            className="peer w-full rounded-md border border-gray-300 bg-transparent px-4 py-2.5 text-gray-900 placeholder-transparent focus:outline-none focus:ring-1 focus:ring-gray-500 dark:border-gray-700 dark:text-white"
                                            placeholder="Opening Stock"
                                            required
                                        />
                                        <label
                                            htmlFor="Opening Stock"
                                            className="absolute -top-2 left-3 bg-white px-1 text-xs font-medium text-gray-600 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-gray-600 dark:bg-gray-900 dark:text-gray-400 dark:peer-focus:text-gray-400"
                                        >
                                            Opening Stock
                                        </label>
                                    </div>
                                    {/* Sold Products */}
                                    <div className="relative">
                                        <input
                                            value={soldProducts}
                                            onChange={handleSoldProductsChange}
                                            id="sold"
                                            type="number"
                                            className="peer w-full rounded-md border border-gray-300 bg-transparent px-4 py-2.5 text-gray-900 placeholder-transparent focus:outline-none focus:ring-1 focus:ring-gray-500 dark:border-gray-700 dark:text-white"
                                            placeholder="Sold Products"
                                            required
                                        />
                                        <label
                                            htmlFor="sold"
                                            className="absolute -top-2 left-3 bg-white px-1 text-xs font-medium text-gray-600 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-gray-600 dark:bg-gray-900 dark:text-gray-400 dark:peer-focus:text-gray-400"
                                        >
                                            Sold Products
                                        </label>
                                    </div>
                                </div>
                                {/* Closing Stock */}
                                <div className="relative mt-4">
                                    <input
                                        value={closingStock}
                                        id="closing"
                                        type="number"
                                        readOnly
                                        className="peer w-full rounded-md border border-gray-300 bg-transparent px-4 py-2.5 text-gray-900 placeholder-transparent focus:outline-none focus:ring-1 focus:ring-gray-500 dark:border-gray-700 dark:text-white"
                                        placeholder="Closing Stock"
                                    />
                                    <label
                                        htmlFor="closing"
                                        className="absolute -top-2 left-3 bg-white px-1 text-xs font-medium text-gray-600 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-gray-600 dark:bg-gray-900 dark:text-gray-400 dark:peer-focus:text-gray-400"
                                    >
                                        Closing Stock
                                    </label>
                                </div>
                                {/* Per Piece price */}
                                <div className="relative mt-4">
                                    <input
                                        onChange={handlePerPiecePriceChange}
                                        id="perPiecePrice"
                                        type="number"
                                        className="peer w-full rounded-md border border-gray-300 bg-transparent px-4 py-2.5 text-gray-900 placeholder-transparent focus:outline-none focus:ring-1 focus:ring-gray-500 dark:border-gray-700 dark:text-white"
                                    />
                                    <label
                                        htmlFor="perPiecePrice"
                                        className="absolute -top-2 left-3 bg-white px-1 text-xs font-medium text-gray-600 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-gray-600 dark:bg-gray-900 dark:text-gray-400 dark:peer-focus:text-gray-400"
                                    >
                                        Per Piece Price
                                    </label>
                                    {/* perPiecePrice */}
                                </div>
                                {/* Total Price = perPiecePrice * openingstock */}
                                <div className="relative mt-4">
                                    <input
                                        id="totalPrice"
                                        type="number"
                                        className="peer w-full rounded-md border border-gray-300 bg-transparent px-4 py-2.5 text-gray-900 placeholder-transparent focus:outline-none focus:ring-1 focus:ring-gray-500 dark:border-gray-700 dark:text-white"
                                    />
                                    <label
                                        htmlFor="totalPrice"
                                        className="absolute -top-2 left-3 bg-white px-1 text-xs font-medium text-gray-600 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-gray-600 dark:bg-gray-900 dark:text-gray-400 dark:peer-focus:text-gray-400"
                                    >
                                        Total Price
                                    </label>
                                </div>
                                {/* Different Sizes */}
                                {!['car', 'Sleeves', 'Mask'].includes(data.name) && (
                                    <>
                                        <div className="flex gap-2">
                                            {/* S sizes */}
                                            <div className="relative">
                                                <input
                                                    value={sizeValues.s || ''}
                                                    onChange={(e) => handleSizeChange('s', e.target.value)}
                                                    id="s-size"
                                                    type="number"
                                                    className="peer w-full rounded-md border border-gray-300 bg-transparent px-4 py-2.5 text-gray-900 placeholder-transparent focus:outline-none focus:ring-1 focus:ring-gray-500 dark:border-gray-700 dark:text-white"
                                                    placeholder="S Size"
                                                />
                                                <label
                                                    htmlFor="s-size"
                                                    className="absolute -top-2 left-3 bg-white px-1 text-xs font-medium text-gray-600 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-gray-600 dark:bg-gray-900 dark:text-gray-400 dark:peer-focus:text-gray-400"
                                                >
                                                    S Size
                                                </label>
                                            </div>
                                            {/* M sizes */}
                                            <div className="relative">
                                                <input
                                                    value={sizeValues.m || ''}
                                                    onChange={(e) => handleSizeChange('m', e.target.value)}
                                                    id="m-size"
                                                    type="number"
                                                    className="peer w-full rounded-md border border-gray-300 bg-transparent px-4 py-2.5 text-gray-900 placeholder-transparent focus:outline-none focus:ring-1 focus:ring-gray-500 dark:border-gray-700 dark:text-white"
                                                    placeholder="M Size"
                                                />
                                                <label
                                                    htmlFor="m-size"
                                                    className="absolute -top-2 left-3 bg-white px-1 text-xs font-medium text-gray-600 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-gray-600 dark:bg-gray-900 dark:text-gray-400 dark:peer-focus:text-gray-400"
                                                >
                                                    M Size
                                                </label>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            {/* L sizes */}
                                            <div className="relative">
                                                <input
                                                    value={sizeValues.l || ''}
                                                    onChange={(e) => handleSizeChange('l', e.target.value)}
                                                    id="l-size"
                                                    type="number"
                                                    className="peer w-full rounded-md border border-gray-300 bg-transparent px-4 py-2.5 text-gray-900 placeholder-transparent focus:outline-none focus:ring-1 focus:ring-gray-500 dark:border-gray-700 dark:text-white"
                                                    placeholder="L Size"
                                                />
                                                <label
                                                    htmlFor="l-size"
                                                    className="absolute -top-2 left-3 bg-white px-1 text-xs font-medium text-gray-600 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-gray-600 dark:bg-gray-900 dark:text-gray-400 dark:peer-focus:text-gray-400"
                                                >
                                                    L Size
                                                </label>
                                            </div>
                                            {/* XL sizes */}
                                            <div className="relative">
                                                <input
                                                    value={sizeValues.xl || ''}
                                                    onChange={(e) => handleSizeChange('xl', e.target.value)}
                                                    id="xl-size"
                                                    type="number"
                                                    className="peer w-full rounded-md border border-gray-300 bg-transparent px-4 py-2.5 text-gray-900 placeholder-transparent focus:outline-none focus:ring-1 focus:ring-gray-500 dark:border-gray-700 dark:text-white"
                                                    placeholder="XL Size"
                                                />
                                                <label
                                                    htmlFor="xl-size"
                                                    className="absolute -top-2 left-3 bg-white px-1 text-xs font-medium text-gray-600 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-gray-600 dark:bg-gray-900 dark:text-gray-400 dark:peer-focus:text-gray-400"
                                                >
                                                    XL Size
                                                </label>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            {/* XXL Sizes */}
                                            <div className="relative">
                                                <input
                                                    value={sizeValues.xxl || ''}
                                                    onChange={(e) => handleSizeChange('xxl', e.target.value)}
                                                    id="xxl-size"
                                                    type="number"
                                                    className="peer w-full rounded-md border border-gray-300 bg-transparent px-4 py-2.5 text-gray-900 placeholder-transparent focus:outline-none focus:ring-1 focus:ring-gray-500 dark:border-gray-700 dark:text-white"
                                                    placeholder="XXL Size"
                                                />
                                                <label
                                                    htmlFor="xxl-size"
                                                    className="absolute -top-2 left-3 bg-white px-1 text-xs font-medium text-gray-600 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-gray-600 dark:bg-gray-900 dark:text-gray-400 dark:peer-focus:text-gray-400"
                                                >
                                                    XXL Size
                                                </label>
                                            </div>
                                            {/* 3XL Sizes */}
                                            <div className="relative">
                                                <input
                                                    value={sizeValues.xxxl || ''}
                                                    onChange={(e) => handleSizeChange('xxxl', e.target.value)}
                                                    id="xxxl-size"
                                                    type="number"
                                                    className="peer w-full rounded-md border border-gray-300 bg-transparent px-4 py-2.5 text-gray-900 placeholder-transparent focus:outline-none focus:ring-1 focus:ring-gray-500 dark:border-gray-700 dark:text-white"
                                                    placeholder="3XL Size"
                                                />
                                                <label
                                                    htmlFor="xxxl-size"
                                                    className="absolute -top-2 left-3 bg-white px-1 text-xs font-medium text-gray-600 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-gray-600 dark:bg-gray-900 dark:text-gray-400 dark:peer-focus:text-gray-400"
                                                >
                                                    3XL Size
                                                </label>
                                            </div>
                                        </div>
                                        {/* 4XL Sizes */}
                                        <div className="relative">
                                            <input
                                                value={sizeValues.xxxxl || ''}
                                                onChange={(e) => handleSizeChange('xxxxl', e.target.value)}
                                                id="xxxxl-size"
                                                type="number"
                                                className="peer w-full rounded-md border border-gray-300 bg-transparent px-4 py-2.5 text-gray-900 placeholder-transparent focus:outline-none focus:ring-1 focus:ring-gray-500 dark:border-gray-700 dark:text-white"
                                                placeholder="4XL Size"
                                            />
                                            <label
                                                htmlFor="xxxxl-size"
                                                className="absolute -top-2 left-3 bg-white px-1 text-xs font-medium text-gray-600 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-gray-600 dark:bg-gray-900 dark:text-gray-400 dark:peer-focus:text-gray-400"
                                            >
                                                4XL Size
                                            </label>
                                        </div>
                                    </>
                                )}
                            </div>
                            <button
                                type="submit"
                                disabled={isPending}
                                className="w-full rounded-lg bg-gradient-to-r from-gray-700 to-gray-600 px-6 py-2.5 font-medium text-white transition-all hover:from-gray-800 hover:to-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-70"
                            >
                                {isPending ? 'Updating...' : 'Update'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StockModal