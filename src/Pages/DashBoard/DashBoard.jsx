import { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router"

const DashBoard = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();

    // Redirect to all-orders when dashboard is accessed directly
    useEffect(() => {
        if (window.location.pathname === '/admin-dashboard') {
            navigate('/dashboard/pending-orders', { replace: true });
        }
    }, [navigate]);
    return (
        <div className="pt-8 md:pt-8 lg:pt-8 px-4 sm:px-6 md:px-10 text-center space-y-6 md:space-y-10 relative">
            <div className="w-full mx-auto flex flex-col lg:flex-row lg:justify-between lg:min-h-screen gap-6">

                {/* Desktop Sidebar */}
                <div className="hidden lg:block lg:w-1/4 xl:w-1/5 border p-5 rounded-lg bg-[#F1EFEC] space-y-20">
                    <nav className="grid">
                        <NavLink
                            to='/'
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={({ isActive }) =>
                                `w-full py-2 px-4 mb-3 rounded ${isActive ? 'bg-green-600 text-white' : 'bg-[#333333] text-white'}`
                            }
                        >
                            Home
                        </NavLink>

                        <NavLink
                            to='/dashboard/accounts'
                            className={({ isActive }) =>
                                `w-full py-2 px-4 mb-3 rounded ${isActive ? 'bg-green-600 text-white' : 'bg-[#333333] text-white'}`
                            }
                        >
                            Accounts
                        </NavLink>

                        <NavLink
                            to='/dashboard/add-product'
                            className={({ isActive }) =>
                                `w-full py-2 px-4 mb-3 rounded ${isActive ? 'bg-green-600 text-white' : 'bg-[#333333] text-white'}`
                            }
                        >
                            Add Product
                        </NavLink>
                        <NavLink
                            to='/dashboard/all-orders'
                            className={({ isActive }) =>
                                `w-full py-2 px-4 mb-3 rounded ${isActive ? 'bg-green-600 text-white' : 'bg-[#333333] text-white'}`
                            }
                        >
                            All Orders
                        </NavLink>

                        <NavLink
                            to='/dashboard/stock-jerseys'
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={({ isActive }) =>
                                `w-full py-2 px-4 mb-3 rounded ${isActive ? 'bg-green-600 text-white' : 'bg-[#333333] text-white'}`
                            }
                        >
                            Stock Product
                        </NavLink>

                        <NavLink
                            to='/dashboard/pending-orders'
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={({ isActive }) =>
                                `w-full py-2 px-4 mb-3 rounded ${isActive ? 'bg-green-600 text-white' : 'bg-[#333333] text-white'}`
                            }
                        >
                            Pending Orders
                        </NavLink>
                        <NavLink
                            to='/dashboard/orders-summary'
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={({ isActive }) =>
                                `w-full py-2 px-4 mb-3 rounded ${isActive ? 'bg-green-600 text-white' : 'bg-[#333333] text-white'}`
                            }
                        >
                            Pending Orders Summary
                        </NavLink>

                        <NavLink
                            to='/dashboard/delivered-orders'
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={({ isActive }) =>
                                `w-full py-2 px-4 mb-3 rounded ${isActive ? 'bg-green-600 text-white' : 'bg-[#333333] text-white'}`
                            }
                        >
                            Delivered Orders
                        </NavLink>
                        <NavLink
                            to='/dashboard/cancelled-orders'
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={({ isActive }) =>
                                `w-full py-2 px-4 mb-3 rounded ${isActive ? 'bg-green-600 text-white' : 'bg-[#333333] text-white'}`
                            }
                        >
                            Cancelled Orders
                        </NavLink>
                        <NavLink
                            to='/dashboard/returned-orders'
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={({ isActive }) =>
                                `w-full py-2 px-4 mb-3 rounded ${isActive ? 'bg-green-600 text-white' : 'bg-[#333333] text-white'}`
                            }
                        >
                            Returned Orders
                        </NavLink>
                    </nav>
                </div>

                {/* Mobile Menu Button */}
                <div className="lg:hidden">
                    <button
                        className="w-full py-2 px-4 rounded bg-[#333333] text-white mb-4"
                        onClick={() => setIsMobileMenuOpen(true)}
                    >
                        Menu
                    </button>
                </div>

                {/* Mobile Sidebar */}
                <div className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                    <div className="p-5 space-y-6 h-full flex flex-col">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-bold text-left">Dashboard</h2>
                            <button onClick={() => setIsMobileMenuOpen(false)} className="text-gray-600 text-xl">✕</button>
                        </div>
                        <NavLink to='/' onClick={() => setIsMobileMenuOpen(false)}
                            className={({ isActive }) =>
                                `w-full py-2 px-4 mb-3 rounded ${isActive ? 'bg-green-600 text-white' : 'bg-[#333333] text-white'}`
                            }
                        >
                            <button className="w-full py-2 px-4 rounded text-white">Home</button>
                        </NavLink>
                        <NavLink to='/dashboard/all-orders' onClick={() => setIsMobileMenuOpen(false)}
                            className={({ isActive }) =>
                                `w-full py-2 px-4 mb-3 rounded ${isActive ? 'bg-green-600 text-white' : 'bg-[#333333] text-white'}`
                            }
                        >
                            <button className="w-full py-2 px-4 rounded text-white">All Orders</button>
                        </NavLink>
                        <NavLink to='/dashboard/add-product' onClick={() => setIsMobileMenuOpen(false)}
                            className={({ isActive }) =>
                                `w-full py-2 px-4 mb-3 rounded ${isActive ? 'bg-green-600 text-white' : 'bg-[#333333] text-white'}`
                            }
                        >
                            <button className="w-full py-2 px-4 rounded text-white">Add Product</button>
                        </NavLink>
                        <NavLink to='/dashboard/stock-jerseys' onClick={() => setIsMobileMenuOpen(false)}
                            className={({ isActive }) =>
                                `w-full py-2 px-4 mb-3 rounded ${isActive ? 'bg-green-600 text-white' : 'bg-[#333333] text-white'}`
                            }
                        >
                            <button className="w-full py-2 px-4 rounded text-white">Stock Product</button>
                        </NavLink>
                        <NavLink to='/dashboard/pending-orders' onClick={() => setIsMobileMenuOpen(false)}
                            className={({ isActive }) =>
                                `w-full py-2 px-4 mb-3 rounded ${isActive ? 'bg-green-600 text-white' : 'bg-[#333333] text-white'}`
                            }
                        >
                            <button className="w-full py-2 px-4 rounded text-white">Pending Orders</button>
                        </NavLink>
                        <NavLink to='/dashboard/delivered-orders' onClick={() => setIsMobileMenuOpen(false)}
                            className={({ isActive }) =>
                                `w-full py-2 px-4 mb-3 rounded ${isActive ? 'bg-green-600 text-white' : 'bg-[#333333] text-white'}`
                            }
                        >
                            <button className="w-full py-2 px-4 rounded text-white">Delivered Orders</button>
                        </NavLink>
                        <NavLink to='/dashboard/cancelled-orders' onClick={() => setIsMobileMenuOpen(false)}
                            className={({ isActive }) =>
                                `w-full py-2 px-4 mb-3 rounded ${isActive ? 'bg-green-600 text-white' : 'bg-[#333333] text-white'}`
                            }
                        >
                            <button className="w-full py-2 px-4 rounded text-white">Cancelled Orders</button>
                        </NavLink>
                        <NavLink to='/dashboard/returned-orders' onClick={() => setIsMobileMenuOpen(false)}
                            className={({ isActive }) =>
                                `w-full py-2 px-4 mb-3 rounded ${isActive ? 'bg-green-600 text-white' : 'bg-[#333333] text-white'}`
                            }
                        >
                            <button className="w-full py-2 px-4 rounded text-white">Returned Orders</button>
                        </NavLink>
                    </div>
                </div>

                {/* Backdrop Overlay */}
                {isMobileMenuOpen && (
                    <div
                        className="fixed inset-0 bg-[#333333] bg-opacity-30 z-40"
                        onClick={() => setIsMobileMenuOpen(false)}
                    />
                )}

                {/* Main Content */}
                <div className="w-full lg:w-3/4 xl:w-4/5 lg:mr-0 bg-[#E7E7E7] p-6 rounded-lg shadow">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default DashBoard