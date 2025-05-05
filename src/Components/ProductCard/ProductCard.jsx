import { NavLink } from "react-router-dom";

const ProductCard = ({ product }) => {
    return (
        <div className="group w-full flex flex-col h-full rounded-lg relative overflow-hidden items-center">
            <NavLink
                to={`/singleproduct/${product._id}`}
                className="block w-full h-full max-w-[350px] mx-auto"
            >
                <div className="w-full h-full flex flex-col space-y-4 rounded-lg p-4 sm:p-6 shadow-lg bg-white hover:shadow-xl transition-shadow duration-300">
                    <div className="relative pb-[75%] overflow-hidden rounded-lg flex-shrink-0">
                        <img
                            className="absolute h-full w-full object-cover"
                            src={product.mainImage}
                            alt={product.title}
                        />
                    </div>
                    <div className="flex flex-col flex-grow space-y-2">
                        <h1 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-xl 2xl:text-[23] font-semibold text-black line-clamp-2">
                            {product.title}
                        </h1>
                        <div className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-lg 2xl:text-xl font-normal text-[#F8B01A] mt-auto">
                            {
                                product.name === "car" ?
                                <p>Price: ৳{product.price} <span className="text-green-400">(Free Delivery)</span></p>
                                :
                                <p>Price: ৳{product.price}</p>
                            }
                        </div>
                    </div>
                </div>
            </NavLink>
        </div>
    )
}

export default ProductCard;