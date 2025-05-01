import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavLinks } from "./navData";
import { AlignJustify, ShoppingCart, User, X } from "lucide-react";
import { Badge } from "@mui/material";
import ProductCart from "../ProductCart/ProductCart";
import mainLogo from '/src/assets/logo-icon.png';
import { useAuth } from "../../useAuth/useAuth";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const links = useNavLinks();
    const { user, logOut } = useAuth();
    const [cartCount, setCartCount] = useState(0)

    useEffect(() => {
        const updateCartCount = () => {
            const cartData = localStorage.getItem('cart');
            setCartCount(cartData ? JSON.parse(cartData).length : 0);
        };

        // Initial load
        updateCartCount();

        // Enhanced storage event listener
        const handleStorageChange = (e) => {
            if (e.key === 'cart' || !e.key) { // Handle both specific and dispatched events
                updateCartCount();
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    


    return (
        <>
            <header className="p-4 lg:px-8 xl:px-20 shadow-none fixed w-full z-50 bg-[#1A1A1A]">
                <div className="container mx-auto flex justify-between items-center">
                    {/* Mobile Menu Button - First on small screens */}
                    <button
                        className="p-2 lg:hidden text-white order-1 lg:order-none"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? (
                            <X size={24} className="hover:text-[#FFD700]" />
                        ) : (
                            <AlignJustify size={24} className="hover:text-[#FFD700]" />
                        )}
                    </button>

                    {/* Logo - Second on small screens */}
                    <NavLink to='/' className="order-2 lg:order-none mx-auto lg:mx-0">
                        <img
                            src={mainLogo}
                            alt="GamersKit Logo"
                            className="h-9 w-auto"
                        />
                    </NavLink>

                    {/* Navigation Links */}
                    <nav
                        className={`lg:flex ${isOpen ? "block" : "hidden"} lg:block absolute lg:relative top-16 lg:top-0 left-0 w-full lg:w-auto bg-[#1A1A1A] lg:bg-transparent shadow-md lg:shadow-none transition-all order-4 lg:order-none`}
                    >
                        <ul className="flex flex-col lg:flex-row items-center space-y-8 lg:space-y-0 lg:space-x-8 xl:space-x-12 text-center p-4 lg:p-0">
                            {links.map((link) => (
                                <li key={link.path}>
                                    <NavLink
                                        to={link.path}
                                        onClick={() => setIsOpen(false)}
                                        className={({ isActive }) =>
                                            isActive
                                                ? "font-bold text-white text-sm sm:text-base border-b-2 border-[#FFD700]"
                                                : "text-gray-300 hover:text-[#FFD700] transition text-sm sm:text-base"
                                        }
                                    >
                                        {link.pathName}
                                    </NavLink>
                                </li>
                            ))}
                            {
                                user &&
                                <button
                                    onClick={logOut}
                                    className="w-full sm:flex md:flex lg:hidden xl:hidden 2xl:hidden px-3 py-2 text-sm font-bold tracking-wide transition sm:mt-0 sm:w-auto sm:shrink-0 bg-[#FFD700] text-black hover:bg-[#FFB300] rounded-md"
                                >
                                    Signout
                                </button>
                            }
                        </ul>
                    </nav>

                    {/* Icons and Buttons - Third on small screens */}
                    <div className="flex space-x-4 xl:space-x-6 items-center order-3 lg:order-none">
                        {/* Cart with badge showing total items */}
                        <Badge
                            badgeContent={cartCount}
                            color="primary"
                            className="text-[#FAE82A] font-bold"
                        >
                            <button onClick={() => setIsCartOpen(true)}>
                                <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 text-white hover:text-[#FFD700]" />
                            </button>
                        </Badge>

                        {user ? (
                            <button
                                onClick={logOut}
                                className="w-full hidden lg:flex xl:flex 2xl:flex px-3 py-2 text-sm font-bold tracking-wide transition sm:mt-0 sm:w-auto sm:shrink-0 bg-[#FFD700] text-black hover:bg-[#FFB300] rounded-md"
                            >
                                Signout
                            </button>
                        ) : (
                            <NavLink to='/signin'>
                                <User className="cursor-pointer text-white hover:text-[#FFB300]" />
                            </NavLink>
                        )}
                    </div>
                </div>
            </header>
            <ProductCart isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
        </>
    );
};

export default Navbar;