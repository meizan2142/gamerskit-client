import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router";

const AddProduct = () => {
    const navigate = useNavigate()
    const handleAddProduct = async (e) => {
        e.preventDefault();
        const form = e.target;

        // Extract form data
        const productDetails = {
            name: form.name.value,
            description: form.description.value,
            title: form.title.value,
            price: form.price.value,
            totalSizes: form.elements.totalSizes?.value || "0",
            leftProducts: form.elements.leftProducts?.value || "0",
            sizes: {
                s: form.elements.s?.value || "0",
                m: form.elements.m?.value || "0",
                l: form.elements.l?.value || "0",
                xl: form.elements.xl?.value || "0",
                xxl: form.elements.xxl?.value || "0",
                xxxl: form.elements.xxxl?.value || "0",
                xxxxl: form.elements.xxxxl?.value || "0",
            },
            mainImage: form.elements.mainImage.value,
            subImages: [
                form.elements.img1.value,
                form.elements.img2.value,
                form.elements.img3.value,
                form.elements.img4.value,
            ],
        };

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/addedProducts`,
                productDetails
            );
            console.log("Product added successfully:", response.data);
            toast.success("Product saved successfully!");
            setTimeout(() => navigate('/my-orders'), 1000);
        } catch (error) {
            console.error("Error saving product:", error);
            toast.error("Failed to save product.");
        }
    };
    return (
        <div>
            <form onSubmit={handleAddProduct} className="container flex flex-col mx-auto space-y-8 md:space-y-12">
                <Toaster />
                <fieldset className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 p-4 sm:p-6 rounded-md shadow-sm">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-4 col-span-full">
                        {/* Product Name and Title */}
                        <div className="col-span-full grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="w-full">
                                <label htmlFor="name" className="text-sm sm:text-base font-bold">Name (small letters)</label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    placeholder="Name"
                                    className="w-full rounded-md border border-black text-black p-2 sm:p-3 outline-none"
                                />
                            </div>

                            <div className="w-full">
                                <label htmlFor="title" className="text-sm sm:text-base font-bold">Product Title</label>
                                <input
                                    id="title"
                                    name="title"
                                    type="text"
                                    placeholder="Product Title"
                                    className="w-full rounded-md border border-black text-black p-2 sm:p-3 outline-none"
                                />
                            </div>
                        </div>

                        {/* Price */}
                        <div className="col-span-full sm:col-span-3">
                            <label htmlFor="price" className="text-sm sm:text-base font-bold">Price</label>
                            <input
                                id="price"
                                name="price"
                                type="number"
                                placeholder="Product Price"
                                className="w-full rounded-md border-black text-black p-2 sm:p-3 outline"
                            />
                        </div>
                        <div className="col-span-full sm:col-span-3">
                            <label htmlFor="description" className="text-sm sm:text-base font-bold">Description (one item per line)</label>
                            <textarea
                                id="description"
                                name="description"
                                placeholder="Enter each list item on a new line"
                                className="w-full rounded-md border-black text-black p-2 sm:p-3 outline min-h-[100px]"
                                rows={4}
                            />
                        </div>

                        {/* District and Thana */}
                        <div className="col-span-full grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* District */}
                            <div className="w-full">
                                <label htmlFor="Total SizesProducts" className="text-sm sm:text-base font-bold">Total Products</label>
                                <input
                                    type="number"
                                    id="totalSizes"
                                    name="totalSizes"
                                    placeholder="Total Products"
                                    className="w-full rounded-md border border-black text-black p-2 sm:p-3 outline-none" />
                            </div>

                            {/* Thana */}
                            <div className="w-full">
                                <label htmlFor="thana" className="text-sm sm:text-base font-bold">Left Products</label>
                                <input
                                    type="number"
                                    id="leftProducts"
                                    name="leftProducts"
                                    placeholder="Left Products"
                                    className="w-full rounded-md border border-black text-black p-2 sm:p-3 outline-none" />
                            </div>
                        </div>
                        {/* Sizes */}
                        <div className="col-span-full grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="min-w-[120px] flex-1">
                                <label htmlFor="s" className="text-sm sm:text-base font-bold block">Size: S</label>
                                <input
                                    type="number"
                                    name="s"
                                    id="s"
                                    placeholder="Total S Sizes"
                                    className="w-full rounded-md border border-black text-black p-2 sm:p-3 outline-none"
                                />
                            </div>
                            <div className="min-w-[120px] flex-1">
                                <label htmlFor="s" className="text-sm sm:text-base font-bold block">Size: M</label>
                                <input
                                    type="number"
                                    name="m"
                                    id="m"
                                    placeholder="Total M Sizes"
                                    className="w-full rounded-md border border-black text-black p-2 sm:p-3 outline-none"
                                />
                            </div>
                            <div className="min-w-[120px] flex-1">
                                <label htmlFor="s" className="text-sm sm:text-base font-bold block">Size: L</label>
                                <input
                                    type="number"
                                    name="l"
                                    id="l"
                                    placeholder="Total L Sizes"
                                    className="w-full rounded-md border border-black text-black p-2 sm:p-3 outline-none"
                                />
                            </div>
                            <div className="min-w-[120px] flex-1">
                                <label htmlFor="s" className="text-sm sm:text-base font-bold block">Size: XL</label>
                                <input
                                    type="number"
                                    name="xl"
                                    id="xl"
                                    placeholder="Total XL Sizes"
                                    className="w-full rounded-md border border-black text-black p-2 sm:p-3 outline-none"
                                />
                            </div>
                            <div className="min-w-[120px] flex-1">
                                <label htmlFor="s" className="text-sm sm:text-base font-bold block">Size: XXL</label>
                                <input
                                    type="number"
                                    name="xxl"
                                    id="xxl"
                                    placeholder="Total XXL Sizes"
                                    className="w-full rounded-md border border-black text-black p-2 sm:p-3 outline-none"
                                />
                            </div>
                            <div className="min-w-[120px] flex-1">
                                <label htmlFor="s" className="text-sm sm:text-base font-bold block">Size: 3XL</label>
                                <input
                                    type="number"
                                    name="xxxl"
                                    id="xxxl"
                                    placeholder="Total 3XL Sizes"
                                    className="w-full rounded-md border border-black text-black p-2 sm:p-3 outline-none"
                                />
                            </div>
                            <div className="min-w-[120px] flex-1">
                                <label htmlFor="s" className="text-sm sm:text-base font-bold block">Size: 4XL</label>
                                <input
                                    type="number"
                                    name="xxxxl"
                                    id="xxxxl"
                                    placeholder="Total 4XL Sizes"
                                    className="w-full rounded-md border border-black text-black p-2 sm:p-3 outline-none"
                                />
                            </div>
                            <div className="min-w-[120px] flex-1">
                                <label htmlFor="mainImage" className="text-sm sm:text-base font-bold block">Main Image (URL)</label>
                                <input
                                    type="url"
                                    name="mainImage"
                                    id="mainImage"
                                    placeholder="Main Image (URL)"
                                    className="w-full rounded-md border border-black text-black p-2 sm:p-3 outline-none"
                                />
                            </div>
                        </div>
                        {/* Sub Images URL */}
                        <div className="col-span-full sm:col-span-3">
                            <label htmlFor="img1" className="text-sm sm:text-base font-bold">Sub Images</label>
                            <input
                                name="img1"
                                id="img1"
                                type="url"
                                placeholder="1"
                                className="w-full rounded-md border-black text-black p-2 sm:p-3 outline"
                            />
                        </div>
                        <div className="col-span-full sm:col-span-3">
                            <input
                                name="img2"
                                id="img2"
                                type="url"
                                placeholder="2"
                                className="w-full rounded-md border-black text-black p-2 sm:p-3 outline"
                            />
                        </div>
                        <div className="col-span-full sm:col-span-3">
                            <input
                                type="url"
                                id="img3"
                                name="img3"
                                placeholder="3"
                                className="w-full rounded-md border-black text-black p-2 sm:p-3 outline"
                            />
                        </div>
                        <div className="col-span-full sm:col-span-3">
                            <input
                                type="url"
                                placeholder="4"
                                id="img4"
                                name="img4"
                                className="w-full rounded-md border-black text-black p-2 sm:p-3 outline"
                            />
                        </div>
                    </div>
                </fieldset>

                {/* Hidden submit button for the price summary section to trigger */}
                <button type="submit" className="block bg-yellow-400 py-2 rounded-md text-base font-bold">
                    Add Product
                </button>
            </form>
        </div>
    )
}

export default AddProduct