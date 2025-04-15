import { NavLink } from "react-router-dom";

const ProductCard = ({ product }) => {

    return (
        <div className="group w-full flex flex-col h-full rounded-lg relative overflow-hidden items-center">
            <NavLink
                to={`/singleproduct/${product._id}`}
                className="block w-full h-full max-w-[350px] mx-auto" // Added h-full here
            >
                <div className="w-full h-full flex flex-col space-y-4 rounded-lg p-4 sm:p-6 shadow-lg bg-white hover:shadow-xl transition-shadow duration-300">
                    <div className="relative pb-[75%] overflow-hidden rounded-lg flex-shrink-0">
                        <img
                            className="absolute h-full w-full object-cover"
                            src={product.img}
                            alt={product.title}
                        />
                    </div>
                    <div className="flex flex-col flex-grow space-y-2">
                        <h1 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-xl 2xl:text-[23] font-semibold text-black line-clamp-2">
                            {product.title}
                        </h1>
                        <div className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-lg 2xl:text-xl font-normal text-[#F8B01A] mt-auto">
                            Price: {product.price}৳
                        </div>
                    </div>
                </div>
            </NavLink>
        </div>
    )
}

export default ProductCard;


{/* Image with Gradient */ }
{/* <NavLink to={`/singleproduct/${product._id}`}>
                <div className="relative overflow-hidden w-full">
                    <img
                        width={400}
                        height={400}
                        className="h-[160px] sm:h-[275px] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        src={product.img}
                        alt="Product"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121C26]/90 via-transparent to-transparent" />
                </div>
            </NavLink> */}


{/* Details - Centered */ }
{/* <div className="grid gap-1 sm:gap-2 relative z-10 mt-2 sm:mt-4 flex-grow px-4 sm:px-6 items-center text-center justify-center flex-col">
                <h1 className="text-sm sm:text-xl font-bold text-black line-clamp-2">{product.title}</h1>
                <div className="text-sm sm:text-lg font-mono font-semibold text-[#FFD700] bg-[#253141] sm:px-7 lg:px-16 py-1 rounded-md inline-block mt-1 sm:mt-2">
                    Price: {product.price}৳
                </div>
            </div> */}

{/* Buttons - Centered */ }
{/* <div className="grid lg:flex xl:flex 2xl:flex gap-2 sm:gap-3 lg:gap-4 mt-2 sm:mt-4 px-4 sm:px-6 pb-4 sm:pb-6 items-center justify-center">
                <button
                    onClick={handleSubmit}
                    className="flex items-center justify-center gap-1 sm:gap-2 bg-[#FFD700] hover:bg-[#E5C100] text-[#1A1A1A] font-semibold px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg transition-all hover:shadow-lg text-xs sm:text-sm"
                >
                    <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>Add to Cart</span>
                </button>
                <NavLink to={`/singleproduct/${product._id}`}>
                    <button  className="flex items-center justify-center gap-1 sm:gap-2 border-2 hover:text-[#1E2B3A] text-black border-[#FFD700] hover:bg-[#FFD700] font-semibold px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg transition-all text-xs sm:text-sm">
                        <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>View Details</span>
                    </button>
                </NavLink>
            </div> */}