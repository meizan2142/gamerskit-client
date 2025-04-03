const WishList = () => {
    return (
        <div className="pt-24 text-center">
            <div className="flex flex-col items-center justify-center space-y-5">
                <h1 className="font-bold text-5xl">WISHLIST</h1>
                <p>Your wishlist is empty</p>
                <button className="flex-1 flex items-center justify-center gap-1 sm:gap-2 bg-black outline-none lg:gap-2 border-2 hover:text-black text-white border-[#FFD700] hover:bg-[#FFD700] font-semibold px-2 sm:px-3 lg:px-4 py-2 sm:py-3 lg:py-3 rounded-lg transition-all text-xs sm:text-sm lg:text-[10px] xl:text-base">
                    <span>View Details</span>
                </button>
            </div>
        </div>
    )
}

export default WishList