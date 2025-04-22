import { NavLink } from "react-router"

const StockJerseys = () => {
    return (
        <div className="pt-2 md:pt-2 lg:pt-2 px-4 sm:px-6 md:px-10 space-y-6 md:space-y-10">
            <div className="flex justify-between">
                <h1 className="font-bold text-3xl text-center">Stock Jerseys</h1>
            </div>

                <>
                    <div className="overflow-x-auto">
                        <table className="min-w-[90%] shadow-md border mx-auto border-gray-100 my-2">
                            <thead>
                                <tr className="bg-[#333333] text-white">
                                    <th className="py-3 px-6 text-left border-b">Product Name</th>
                                    <th className="py-3 px-6 text-left border-b">S</th>
                                    <th className="py-3 px-6 text-left border-b">M</th>
                                    <th className="py-3 px-6 border-b text-end">L</th>
                                    <th className="py-3 px-6 border-b text-end">XL</th>
                                    <th className="py-3 px-6 border-b text-end">XXL</th>
                                    <th className="py-3 px-6 text-left border-b">3XL</th>
                                    <th className="py-3 px-6 text-left border-b">4XL</th>
                                    <th className="py-3 px-6 text-left border-b">Total Quantity</th>
                                </tr>
                            </thead>
                            <tbody>
                                    <tr>
                                        <td className="py-4 px- border-b">Nissan GTR Skyline 4WD</td>
                                        <td className="py-4 px-3 border-b">
                                            3
                                        </td>
                                        <td className="py-4 px-3 border-b">5</td>
                                        <td className="py-4 px-3 border-b text-end">
                                            2
                                        </td>
                                        <td className="py-4 px-3 border-b text-end">10</td>
                                        <td className="py-4 px-3 border-b text-end">8</td>
                                        <td className="py-4 px-3 border-b space-y-1">
                                            9
                                        </td>
                                        <td className="py-4 px-3 border-b space-y-1">
                                            4
                                        </td>
                                        <td className="py-4 px-3 border-b space-y-1">
                                            5
                                        </td>
                                        {/* <td className="text-center">It has no sizes</td> */}
                                    </tr>
                            </tbody>
                        </table>
                    </div>
                </>
        </div>
    )
}

export default StockJerseys