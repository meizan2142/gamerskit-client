import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { NavLink } from "react-router"

const StockJerseys = () => {
    const { isLoading, error, data } = useQuery({
        queryKey: ['addedProducts'],
        queryFn: async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/addedProducts`
                );
                return response.data; // Axios automatically parses JSON
            } catch (err) {
                console.error(err, "Failed to fetch cart items");
                return []; // Fallback empty array on error
            }
        },
    });
    if (isLoading) return <div className="min-h-screen pt-24 flex justify-center">
        <div className="w-10 h-10 animate-[spin_2s_linear_infinite] rounded-full border-4 border-dashed border-[#FFB300]"></div>
    </div>;
    if (error) return <div className="min-h-screen pt-24 flex justify-center">Error: {error.message}</div>;
    return (
        <div className="pt-2 md:pt-2 lg:pt-2 px-4 sm:px-6 md:px-10 space-y-6 md:space-y-10">
            <h1 className="font-bold text-3xl text-center">Stock Product</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-5 gap-3">
                {
                    data.map((data) => <div key={data._id} className="group w-full flex flex-col h-full rounded-lg relative overflow-hidden items-center">
                        <NavLink
                            // to={`/singleproduct/${data._id}`}
                            className="block w-full h-full max-w-[350px] mx-auto"
                        >
                            <div className="w-full h-full flex flex-col space-y-4 rounded-lg p-4 sm:p-6 shadow-lg bg-white hover:shadow-xl transition-shadow duration-300">
                                <div className="relative pb-[75%] overflow-hidden rounded-lg flex-shrink-0">
                                    <img
                                        className="absolute h-full w-full object-cover"
                                        src={data.mainImage}
                                        alt={data.title}
                                    />
                                </div>
                                <div className="flex flex-col flex-grow space-y-4">
                                    <div className="flex justify-between">
                                        <h1 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-xl 2xl:text-[23] font-semibold text-black line-clamp-2">
                                            Total: {data.totalSizes}
                                        </h1>
                                        <h1 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-xl 2xl:text-[23] font-semibold text-black line-clamp-2">
                                            Left: {data.leftProducts}
                                        </h1>
                                    </div>
                                    <div className="text-xs flex justify-around sm:text-sm md:text-base lg:text-lg xl:text-lg 2xl:text-xl font-normal text-[#F8B01A] mt-auto">
                                        {['car', 'Sleeves', 'mask'].includes(data.name) ? (
                                            <></>  // Hide sizes for these products
                                        ) : (
                                            <div className="flex gap-8">
                                                {/* First Column */}
                                                <div className="space-y-3 font-bold">
                                                    {['s', 'm', 'l', 'xl'].map(size => (
                                                        <p key={size}>
                                                            {size.toUpperCase()}: <span className="ml-2 font-normal text-black">{data.sizes[size] || 0}</span>
                                                        </p>
                                                    ))}
                                                </div>

                                                {/* Second Column */}
                                                <div className="space-y-3 font-bold">
                                                    {['xxl', 'xxxl', 'xxxxl'].map(size => (
                                                        <p key={size}>
                                                            {size === 'xxxl' ? '3XL' : size === 'xxxxl' ? '4XL' : size.toUpperCase()}:
                                                            <span className="ml-2 font-normal text-black">{data.sizes[size] || 0}</span>
                                                        </p>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </NavLink>
                    </div>)
                }
            </div>
        </div>
    )
}

export default StockJerseys