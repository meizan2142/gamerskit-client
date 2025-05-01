import { ArrowRight, ShoppingBasket, X } from 'lucide-react';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { NavLink } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

const ProductCart = ({ isCartOpen, setIsCartOpen }) => {
    const queryClient = useQueryClient();
    const [localCartItems, setLocalCartItems] = useState([]);

    // Fetch cart items from localStorage
    const { isLoading, error } = useQuery({
        queryKey: ['cart'],
        queryFn: () => {
            const cartData = localStorage.getItem('cart');
            const items = cartData ? JSON.parse(cartData) : [];
            setLocalCartItems(items); // Update local state
            return items;
        },
        refetchOnWindowFocus: true,
        enabled: isCartOpen // Only fetch when cart is open
    });

    // Watch for localStorage changes
    useEffect(() => {
        const handleStorageChange = () => {
            const cartData = localStorage.getItem('cart');
            setLocalCartItems(cartData ? JSON.parse(cartData) : []);
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    // Mutation for removing item from cart
    const { mutate: removeFromCart } = useMutation({
        mutationFn: (productId) => {
            const currentCart = JSON.parse(localStorage.getItem('cart') || '[]');
            const updatedCart = currentCart.filter(item => item.productId !== productId);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            // Trigger storage event to update all components
            window.dispatchEvent(new Event('storage'));
            return updatedCart;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['cart']);
        }
    });

    // Calculate total using local state
    const totalPrice = localCartItems.reduce((sum, item) => {
        return sum + (item.price * (item.quantity || 1));
    }, 0);

    // Close cart when navigating away
    useEffect(() => {
        const handleRouteChange = () => setIsCartOpen(false);
        window.addEventListener('beforeunload', handleRouteChange);
        return () => window.removeEventListener('beforeunload', handleRouteChange);
    }, [setIsCartOpen]);

    if (isLoading) return (
        <div className="p-6 text-white">
            <div className="w-10 h-10 animate-[spin_2s_linear_infinite] rounded-full border-4 border-dashed border-[#FFB300]"></div>
        </div>
    );

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
                        {localCartItems.length > 0 ? (
                            <div className="border-b border-gray-700 py-4 space-y-8">
                                {localCartItems.map((item) => (
                                    <div key={`${item.productId}-${item.size || ''}`} className="flex gap-4">
                                        <div className="w-20 h-20 bg-gray-800 rounded-md overflow-hidden">
                                            <img
                                                src={item.img || '/placeholder-product.jpg'}
                                                alt={item.title || 'Product'}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        <div className="flex-1">
                                            <div className="flex justify-between items-start">
                                                <p className="text-white font-medium">
                                                    {item.title || 'Product Name'}
                                                </p>
                                                <button
                                                    onClick={() => removeFromCart(item.productId)}
                                                    className="text-gray-500 hover:text-red-500"
                                                >
                                                    <RiDeleteBin5Line size={18} />
                                                </button>
                                            </div>

                                            <div className='flex justify-between items-center'>
                                                <p className="text-[#FFD700] text-sm font-semibold my-1">
                                                    ৳{(item.price || 0)} {item.quantity > 1 && `× ${item.quantity}`}
                                                </p>
                                                {item.size && (
                                                    <p className="text-[#FFB300] text-sm font-medium my-1">
                                                        Size: {item.size}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className='text-white flex flex-col space-y-5 items-center justify-center h-full'>
                                <p className='font-bold text-xl'>Your Cart is empty</p>
                                <NavLink to='/shop'>
                                    <button
                                        onClick={() => setIsCartOpen(false)}
                                        className="flex items-center justify-center gap-2 bg-[#FFD700] hover:bg-[#FFB300] text-black font-bold py-2 px-4 rounded transition"
                                    >
                                        <ShoppingBasket className="w-4 h-4" />
                                        Continue Shopping
                                    </button>
                                </NavLink>
                            </div>
                        )}
                    </div>

                    {/* Cart summary - only shows when items exist */}
                    {localCartItems.length > 0 && (
                        <div className="border-t border-gray-700 pt-4">
                            <div className="flex justify-between mb-4">
                                <span className="text-white">Total:</span>
                                <span className="text-[#FFD700] font-bold">৳{totalPrice}</span>
                            </div>
                            <NavLink to='/place-orders'>
                                <button
                                    onClick={() => setIsCartOpen(false)}
                                    className="w-full flex items-center justify-center gap-2 bg-[#FFD700] hover:bg-[#FFB300] text-black font-bold py-2 px-4 rounded transition"
                                >
                                    PROCEED TO CHECKOUT
                                    <ArrowRight />
                                </button>
                            </NavLink>
                        </div>
                    )}
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