import { useState } from 'react';
import { Heart, ShoppingCart, X } from 'lucide-react'; // or your icon library
import { Badge } from '@mui/material'; // or your badge component
import Dialog from '../user-dialog/Dialog';

const NavbarWithSidebars = () => {
    const [isWishlistOpen, setIsWishlistOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const toggleWishlist = () => {
        setIsWishlistOpen(!isWishlistOpen);
        if (isCartOpen) setIsCartOpen(false);
    };

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen);
        if (isWishlistOpen) setIsWishlistOpen(false);
    };

    const closeAll = () => {
        setIsWishlistOpen(false);
        setIsCartOpen(false);
    };

    return (
        <>
            {/* Your existing navbar */}
            <nav className="bg-white dark:bg-gray-800 shadow-md p-4 flex justify-between items-center">
                {/* Left side of navbar */}
                <div className="flex items-center">
                    {/* Your logo or other navbar items */}
                </div>

                {/* Right side icons - now visible */}
                <div className="hidden lg:flex space-x-4 xl:space-x-6 items-center">
                    <button onClick={toggleWishlist} className="focus:outline-none">
                        <Badge badgeContent={4} className="text-yellow-400 font-bold hover:text-[#FFB300]">
                            <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-black dark:text-white hover:text-[#FFB300] dark:hover:text-[#FFD700]" />
                        </Badge>
                    </button>

                    <button onClick={toggleCart} className="focus:outline-none">
                        <Badge badgeContent={4} className="text-green-700 font-bold">
                            <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 text-black dark:text-white hover:text-[#FFB300]" />
                        </Badge>
                    </button>

                    <Dialog />
                </div>
            </nav>

            {/* Sidebars - positioned outside the navbar */}
            {/* Wishlist Sidebar */}
            <div className={`fixed top-0 right-0 h-full bg-white dark:bg-gray-800 shadow-xl z-50 transform transition-transform duration-300 ease-in-out 
        ${isWishlistOpen ? 'translate-x-0' : 'translate-x-full'} 
        w-full sm:w-96 lg:w-1/3 xl:w-1/4`}
                style={{ marginTop: '64px' }}> {/* Adjust this value to match your navbar height */}
                <div className="p-4 h-[calc(100%-64px)] overflow-y-auto">
                    <div className="flex justify-between items-center border-b pb-4">
                        <h2 className="text-xl font-bold">Your Wishlist</h2>
                        <button onClick={closeAll} className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                    {/* Wishlist content here */}
                </div>
            </div>

            {/* Shopping Cart Sidebar */}
            <div className={`fixed top-0 right-0 h-full bg-white dark:bg-gray-800 shadow-xl z-50 transform transition-transform duration-300 ease-in-out 
        ${isCartOpen ? 'translate-x-0' : 'translate-x-full'} 
        w-full sm:w-96 lg:w-1/3 xl:w-1/4`}
                style={{ marginTop: '64px' }}> {/* Adjust this value to match your navbar height */}
                <div className="p-4 h-[calc(100%-64px)] overflow-y-auto">
                    <div className="flex justify-between items-center border-b pb-4">
                        <h2 className="text-xl font-bold">Your Cart</h2>
                        <button onClick={closeAll} className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                    {/* Cart content here */}
                </div>
            </div>

            {/* Overlay */}
            {(isWishlistOpen || isCartOpen) && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={closeAll}
                    style={{ marginTop: '64px' }} // Adjust this value to match your navbar height
                />
            )}
        </>
    );
};

export default NavbarWithSidebars;