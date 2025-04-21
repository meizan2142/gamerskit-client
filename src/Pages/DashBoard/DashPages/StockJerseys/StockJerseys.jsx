import { NavLink } from "react-router"

const StockJerseys = () => {
    return (
        <div className="pt-2 md:pt-2 lg:pt-2 px-4 sm:px-6 md:px-10 space-y-6 md:space-y-10">
            <div className="flex justify-between">
                <h1 className="font-bold text-3xl text-center">All Orders</h1>
            </div>

                <>
                    <div className="overflow-x-auto">
                        <table className="min-w-[90%] shadow-md border mx-auto border-gray-100 my-2">
                            <thead>
                                <tr className="bg-[#333333] text-white">
                                    <th className="py-3 px-6 text-left border-b">Serial</th>
                                    <th className="py-3 px-6 text-left border-b">Date</th>
                                    <th className="py-3 px-6 text-left border-b">Name</th>
                                    <th className="py-3 px-6 border-b text-end">Quantity</th>
                                    <th className="py-3 px-6 border-b text-end">Advance Amount</th>
                                    <th className="py-3 px-6 border-b text-end">Remaining Amount</th>
                                    <th className="py-3 px-6 text-left border-b">Check Details</th>
                                    <th className="py-3 px-6 text-left border-b">Delete Order</th>
                                </tr>
                            </thead>
                            <tbody>
                                    <tr>
                                        <td className="py-4 px-6 border-b">1</td>
                                        <td className="py-4 px-6 border-b">
                                            {/* {new Date(item.orderDate).toLocaleDateString()} */}
                                            12/12/2024
                                        </td>
                                        <td className="py-4 px-6 border-b">Nissan</td>
                                        <td className="py-4 px-6 border-b text-end">
                                            2
                                        </td>
                                        <td className="py-4 px-6 border-b text-end">৳100</td>
                                        <td className="py-4 px-6 border-b text-end">৳520</td>
                                        <td className="py-4 px-6 border-b space-y-1">
                                            <NavLink to={``}>
                                                <button className="px-5 gap-2 py-3 rounded-full flex items-center justify-center mx-auto lg:mx-0 xl:mx-0 2xl:mx-0 text-[10px] sm:text-base font-bold hover:bg-[#FFD700] text-white bg-[#FFB300] transition-all">
                                                    Check Details
                                                </button>
                                            </NavLink>
                                        </td>
                                        <td className="py-4 px-6 border-b space-y-1">
                                            <button
                                                className="text-gray-500 hover:text-red-500"
                                            >
                                                delete
                                            </button>
                                        </td>
                                    </tr>
                            </tbody>
                        </table>
                    </div>
                </>
        </div>
    )
}

export default StockJerseys