import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { ArrowRight, X } from 'lucide-react';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { NavLink } from 'react-router';

const ProductCart = ({ isCartOpen, setIsCartOpen }) => {
    const queryClient = useQueryClient();

    // Fetch cart data
    const { isLoading, error, data = [] } = useQuery({
        queryKey: ['cart'],
        queryFn: async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/cartList`
                );
                return response.data; // Axios automatically parses JSON
            } catch (err) {
                console.error(err, "Failed to fetch cart items");
                return []; // Fallback empty array on error
            }
        },
    });

    // Delete item mutation
    const { mutate: deleteItem } = useMutation({
        mutationFn: async (itemId) => {
            await axios.delete(`${import.meta.env.VITE_API_URL}/cartList/${itemId}`);
        },
        onMutate: async (itemId) => {
            // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
            await queryClient.cancelQueries(['cart']);

            // Snapshot the previous value
            const previousCart = queryClient.getQueryData(['cart']);

            // Optimistically update to the new value
            queryClient.setQueryData(['cart'], old =>
                old.filter(item => {
                    const currentItemId = item?.id || item?._id || item?.productId;
                    return currentItemId !== itemId;
                })
            );

            // Return a context object with the snapshotted value
            return { previousCart };
        },
        onError: (context) => {
            // Rollback to the previous value if mutation fails
            queryClient.setQueryData(['cart'], context.previousCart);
        },
        onSettled: () => {
            // Always refetch after error or success
            queryClient.invalidateQueries(['cart']);
        }
    });


    // Calculate total
    const totalPrice = data.reduce((sum, item) => {
        return sum + (item.price * item.quantity);
    }, 0);



    if (isLoading) return <div className="p-6 text-white">
        <div className="w-10 h-10 animate-[spin_2s_linear_infinite] rounded-full border-4 border-dashed border-[#FFB300]"></div>
    </div>;
    if (error) return <div className="p-6 text-red-500">Error: {error.message}</div>;


    return (
        <>
            {/* Cart Sidebar */}
            <div className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-[#1A1A1A] shadow-lg transform ${isCartOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out z-50`}>
                <div className="p-6 h-full flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-white">Your Cart</h2>
                        <button
                            onClick={() => setIsCartOpen(false)}
                            className="text-white hover:text-[#FFD700]"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    {/* Cart items */}
                    <div className="flex-1 overflow-y-auto">
                        <div className="border-b border-gray-700 py-4 space-y-8">
                            {data.map((item) => {
                                const itemKey = item?.id || item?._id || item?.productId || `item-${Math.random().toString(36).substr(2, 9)}`;
                                return (
                                    <div key={itemKey} className="flex gap-4">
                                        <div className="w-20 h-20 bg-gray-800 rounded-md overflow-hidden">
                                            <img
                                                src={item.img || '/placeholder-product.jpg'}
                                                alt={item.name || 'Product'}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        <div className="flex-1">
                                            <div className="flex justify-between items-start">
                                                <p className="text-white font-medium">
                                                    {item.title || 'Product Name'}
                                                </p>
                                                {/* Delete button */}
                                                <button
                                                    onClick={() => deleteItem(itemKey)}
                                                    className="text-gray-500 hover:text-red-500"
                                                >
                                                    <RiDeleteBin5Line size={18} />
                                                </button>
                                            </div>

                                            <div className='flex justify-between items-center'>
                                                <p className="text-[#FFD700] text-sm font-semibold my-1">
                                                    ৳{(item.price || 0).toFixed(2)}
                                                </p>
                                                {
                                                    item.size ?
                                                        <p className="text-[#FFB300] text-sm font-medium my-1">
                                                            Size: {item.size}
                                                        </p>
                                                        :
                                                        <></>
                                                }
                                            </div>

                                            {/* <div className="flex items-center mt-2">
                                                <button
                                                    className="w-8 h-8 flex items-center justify-center border text-white border-gray-600 rounded-l-md hover:bg-gray-700 transition"
                                                >
                                                    -
                                                </button>
                                                <span className="w-10 h-8 flex items-center justify-center text-white border-t border-b border-gray-600">
                                                    {item.quantity || 1}
                                                </span>
                                                <button
                                                    className="w-8 h-8 flex items-center justify-center border text-white border-gray-600 rounded-r-md hover:bg-gray-700 transition"
                                                >
                                                    +
                                                </button>
                                            </div> */}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Cart summary */}
                    {
                        data.length > 0 ?
                            <>
                                <div className="border-t border-gray-700 pt-4">
                                    <div className="flex justify-between mb-4">
                                        <span className="text-white">Total:</span>
                                        <span className="text-[#FFD700] font-bold">৳{totalPrice.toFixed(2)}</span>
                                    </div>
                                    <NavLink to='/place-orders'>
                                        <button onClick={() => setIsCartOpen(false)} className="w-full flex items-center justify-center gap-2 bg-[#FFD700] hover:bg-[#FFB300] text-black font-bold py-2 px-4 rounded transition">
                                            PROCEED TO CHECKOUT
                                            <ArrowRight />
                                        </button>
                                    </NavLink>
                                </div>
                            </>
                            :
                            <div className='text-white grid items-center justify-center'>
                                Your Cart is empty
                            </div>
                    }
                </div>
            </div>

            {/* Overlay when cart is open */}
            {isCartOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={() => setIsCartOpen(false)}
                />
            )}
        </>
    );
};

export default ProductCart;