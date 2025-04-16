const MyOrders = () => {
    return (
        <div className="pt-20 md:pt-20 lg:pt-24 px-4 sm:px-6 md:px-10 text-center space-y-6 md:space-y-10">
            <h1 className="font-bold text-3xl">My Orders</h1>

            <div className="overflow-x-auto ">
                <table className="min-w-[90%] shadow-md  border mx-auto border-gray-100  my-6">
                    <thead>
                        <tr className="bg-[#333333] text-white">
                            <th className="py-3 px-6 text-left border-b">Serial</th>
                            <th className="py-3 px-6 text-left border-b">Name</th>
                            <th className="py-3 px-6 text-left border-b">Age</th>
                            <th className="py-3 px-6 text-left border-b">Gender</th>
                            <th className="py-3 px-6  border-b text-end">Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="hover:bg-gray-50 transition duration-300">
                            <td className="py-4 px-6 border-b">1 </td>
                            <td className="py-4 px-6 border-b">Shiyam </td>
                            <td className="py-4 px-6 border-b">19</td>
                            <td className="py-4 px-6 border-b">Male</td>
                            <td className="py-4 px-6 border-b text-end">Mirpur 15, Dhaka</td>
                        </tr>
                        <tr className="hover:bg-gray-50 transition duration-300">
                            <td className="py-4 px-6 border-b">2</td>
                            <td className="py-4 px-6 border-b">Arif</td>
                            <td className="py-4 px-6 border-b">17</td>
                            <td className="py-4 px-6 border-b">Male</td>
                            <td className="py-4 px-6 border-b text-end">Bagerhat, Khulna</td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default MyOrders