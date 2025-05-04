const AddProduct = () => {
    return (
        <div>
            <form className="container flex flex-col mx-auto space-y-8 md:space-y-12">
                <fieldset className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 p-4 sm:p-6 rounded-md shadow-sm">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-4 col-span-full">
                        {/* Product Name and Title */}
                        <div className="col-span-full grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="w-full">
                                <label htmlFor="name" className="text-sm sm:text-base font-bold">Name (small letters)</label>
                                <input
                                    id="name"
                                    type="text"
                                    placeholder="Name"
                                    className="w-full rounded-md border border-black text-black p-2 sm:p-3 outline-none"
                                />
                            </div>

                            <div className="w-full">
                                <label htmlFor="title" className="text-sm sm:text-base font-bold">Product Title</label>
                                <input
                                    id="title"
                                    type="text"
                                    placeholder="Product Title"
                                    className="w-full rounded-md border border-black text-black p-2 sm:p-3 outline-none"
                                />
                            </div>
                        </div>

                        {/* Price */}
                        <div className="col-span-full sm:col-span-3">
                            <label htmlFor="price" className="text-sm sm:text-base font-bold">Price</label>
                            <input
                                id="price"
                                type="number"
                                placeholder="Product Price"
                                className="w-full rounded-md border-black text-black p-2 sm:p-3 outline"
                            />
                        </div>

                        {/* District and Thana */}
                        <div className="col-span-full grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* District */}
                            <div className="w-full">
                                <label htmlFor="totalProducts" className="text-sm sm:text-base font-bold">Total Products</label>
                                <input
                                    type="number"
                                    id="totalProducts"
                                    placeholder="Total Products"
                                    className="w-full rounded-md border border-black text-black p-2 sm:p-3 outline-none" />
                            </div>

                            {/* Thana */}
                            <div className="w-full">
                                <label htmlFor="thana" className="text-sm sm:text-base font-bold">Left Products</label>
                                <input
                                    type="text"
                                    placeholder="Left Products"
                                    className="w-full rounded-md border border-black text-black p-2 sm:p-3 outline-none" />
                            </div>
                        </div>
                        <div className="col-span-full grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* District */}
                            <div className="min-w-[120px] flex-1">
                                <label htmlFor="s" className="text-sm sm:text-base font-bold block">Size: S</label>
                                <input
                                    type="number"
                                    id="s"
                                    placeholder="Total"
                                    className="w-full rounded-md border border-black text-black p-2 sm:p-3 outline-none"
                                />
                            </div>
                            <div className="min-w-[120px] flex-1">
                                <label htmlFor="s" className="text-sm sm:text-base font-bold block">Size: M</label>
                                <input
                                    type="number"
                                    id="s"
                                    placeholder="Total"
                                    className="w-full rounded-md border border-black text-black p-2 sm:p-3 outline-none"
                                />
                            </div>
                            <div className="min-w-[120px] flex-1">
                                <label htmlFor="s" className="text-sm sm:text-base font-bold block">Size: L</label>
                                <input
                                    type="number"
                                    id="s"
                                    placeholder="Total"
                                    className="w-full rounded-md border border-black text-black p-2 sm:p-3 outline-none"
                                />
                            </div>
                            <div className="min-w-[120px] flex-1">
                                <label htmlFor="s" className="text-sm sm:text-base font-bold block">Size: XL</label>
                                <input
                                    type="number"
                                    id="s"
                                    placeholder="Total"
                                    className="w-full rounded-md border border-black text-black p-2 sm:p-3 outline-none"
                                />
                            </div>
                            <div className="min-w-[120px] flex-1">
                                <label htmlFor="s" className="text-sm sm:text-base font-bold block">Size: XXL</label>
                                <input
                                    type="number"
                                    id="s"
                                    placeholder="Total"
                                    className="w-full rounded-md border border-black text-black p-2 sm:p-3 outline-none"
                                />
                            </div>
                            <div className="min-w-[120px] flex-1">
                                <label htmlFor="s" className="text-sm sm:text-base font-bold block">Size: 3XL</label>
                                <input
                                    type="number"
                                    id="s"
                                    placeholder="Total"
                                    className="w-full rounded-md border border-black text-black p-2 sm:p-3 outline-none"
                                />
                            </div>
                            <div className="min-w-[120px] flex-1">
                                <label htmlFor="s" className="text-sm sm:text-base font-bold block">Size: 4XL</label>
                                <input
                                    type="number"
                                    id="s"
                                    placeholder="Total"
                                    className="w-full rounded-md border border-black text-black p-2 sm:p-3 outline-none"
                                />
                            </div>
                            <div className="min-w-[120px] flex-1">
                                <label htmlFor="mainImage" className="text-sm sm:text-base font-bold block">Main Image (URL)</label>
                                <input
                                    type="text"
                                    id="mainImage"
                                    placeholder="Main Image (URL)"
                                    className="w-full rounded-md border border-black text-black p-2 sm:p-3 outline-none"
                                />
                            </div>
                        </div>
                        {/* Sub Images URL */}
                        <div className="col-span-full sm:col-span-3">
                            <label htmlFor="price" className="text-sm sm:text-base font-bold">Sub Images</label>
                            <input
                                id="price"
                                type="number"
                                placeholder="1"
                                className="w-full rounded-md border-black text-black p-2 sm:p-3 outline"
                            />
                        </div>
                        <div className="col-span-full sm:col-span-3">
                            <input
                                id="price"
                                type="number"
                                placeholder="2"
                                className="w-full rounded-md border-black text-black p-2 sm:p-3 outline"
                            />
                        </div>
                        <div className="col-span-full sm:col-span-3">
                            <input
                                id="price"
                                type="number"
                                placeholder="3"
                                className="w-full rounded-md border-black text-black p-2 sm:p-3 outline"
                            />
                        </div>
                        <div className="col-span-full sm:col-span-3">
                            <input
                                id="price"
                                type="number"
                                placeholder="4"
                                className="w-full rounded-md border-black text-black p-2 sm:p-3 outline"
                            />
                        </div>
                    </div>
                </fieldset>

                {/* Hidden submit button for the price summary section to trigger */}
                <button type="submit" className="block bg-yellow-400 py-2 rounded-md text-base font-bold">
                    Add Product
                </button>
            </form>
        </div>
    )
}

export default AddProduct