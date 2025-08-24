import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import StockModal from "../../../../Components/StockModal/StockModal";
import Loader from "../../../../Components/loader";

const StockJerseys = () => {
    const { isLoading, error, data: addedProducts } = useQuery({
        queryKey: ['addedProducts'],
        queryFn: async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/addedProducts`
                );
                return response.data;
            } catch (err) {
                console.error(err, "Failed to fetch cart items");
                return [];
            }
        },
    });



    // Sort the data when needed (e.g., in rendering)
    const sortedData = addedProducts ? [...addedProducts].sort((a, b) => b.price - a.price) : [];

     if (isLoading) return (
        <Loader/>
    );

    if (error) return <div className="min-h-screen pt-24 flex justify-center">Error: {error.message}</div>;

    return (
        <div className="pt-8 px-4 sm:px-6 md:px-10 space-y-8">
            <h1 className="font-bold text-3xl text-center mb-8">Inventory Overview</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {sortedData.map((data) => (
                    <div key={data._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                        <div className="p-5">
                            {/* Product Image */}
                            <div className="relative pb-[100%] mb-4 rounded-lg overflow-hidden bg-gray-100">
                                <img
                                    className="absolute h-full w-full object-contain p-4"
                                    src={data.mainImage}
                                    alt={data.title}
                                />
                            </div>

                            {/* Product Info */}
                            <div className="space-y-3">
                                <h2 className="text-lg font-semibold text-gray-800 truncate">{data.title}</h2>
                                <h2 className="text-base font-semibold text-gray-400 truncate">Last Updated : {data.modified}</h2>

                                {/* Stock Summary */}
                                <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                                    <div className="text-center">
                                        <p className="text-xs text-gray-500">Opening Stock</p>
                                        <p className="font-bold text-gray-700">{data.totalSizes}</p>
                                    </div>
                                    <div className="h-8 w-px bg-gray-300"></div>
                                    <div className="text-center">
                                        <p className="text-xs text-gray-500">Closing Stock</p>
                                        <p className={`font-bold ${data.leftProducts < 5 ? 'text-red-500' : 'text-green-500'}`}>
                                            {data.leftProducts}
                                        </p>
                                    </div>
                                </div>

                                {/* Size Breakdown */}
                                {!['car', 'Sleeves', 'Mask', 'consoles'].includes(data.name) && (
                                    <div className="pt-2">
                                        <div className="grid grid-cols-3 gap-2">
                                            {['s', 'm', 'l', 'xl', 'xxl', 'xxxl', 'xxxxl'].map(size => (
                                                <div key={size} className="text-center rounded-md bg-[#E7E7E7]">
                                                    <p className="text-xs font-medium text-gray-500">
                                                        {size === 'xxxl' ? '3XL' :
                                                            size === 'xxxxl' ? '4XL' :
                                                                size.toUpperCase()}
                                                    </p>
                                                    <p className="text-sm font-semibold">
                                                        {data.sizes[size] || 0}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div>
                                <StockModal data={data} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default StockJerseys;