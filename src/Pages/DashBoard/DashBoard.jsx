import { Outlet } from "react-router"

const DashBoard = () => {
    return (
        <div className="pt-20 md:pt-20 lg:pt-24 px-4 sm:px-6 md:px-10 text-center space-y-6 md:space-y-10">
            <div className="w-full mx-auto flex flex-col lg:flex-row lg:justify-between lg:min-h-screen gap-6">
                {/* Sidebar - Hidden on mobile, visible on lg screens */}
                <div className="hidden lg:block lg:w-1/4 xl:w-1/5 border p-5 rounded-lg bg-[#FFD700] space-y-20">
                    {/* Sidebar content */}
                    <nav className="space-y-4">
                        <button className="w-full py-2 px-4 rounded text-white">All Orders</button>
                        <button className="w-full py-2 px-4 rounded ">Stock Jersey</button>
                        {/* Add more nav items as needed */}
                    </nav>
                </div>

                {/* Mobile menu button - Visible only on mobile */}
                <div className="lg:hidden">
                    <button className="w-full py-2 px-4 rounded bg-[#171825] text-white mb-4">
                        Menu
                    </button>
                </div>

                {/* Main content area */}
                <div className="w-full lg:w-3/4 xl:w-4/5 lg:mr-0 bg-white p-6 rounded-lg shadow">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default DashBoard