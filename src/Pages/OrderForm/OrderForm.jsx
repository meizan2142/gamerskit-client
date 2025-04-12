const OrderForm = () => {
    return (
        <div className="pt-24 p-10 text-center space-y-10">
            <div>
                <h1 className="font-bold text-3xl">Delivery Details</h1>
            </div>
            {/* Main Div */}
            <div className="flex justify-center grid-cols-1 w-full mx-auto sm:grid gap-8 sm:grid-cols-1 md:grid-cols-1 md:grid lg:flex">
                {/* Input Fields */}
                <div className="">
                    <form noValidate="" action="" className="container flex flex-col mx-auto space-y-12">
                        <fieldset className="grid grid-cols-2 gap-6 p-6 rounded-md shadow-sm">
                            <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                                <div className="col-span-full sm:col-span-3">
                                    <label htmlFor="email" className="text-sm">Email</label>
                                    <input id="email" type="email" placeholder="Email" className="w-full rounded-md border-black focus:ring focus:ring-opacity-75 text-black focus:ring-violet-600 p-3 outline" />
                                </div>
                                <div className="col-span-full sm:col-span-3">
                                    <label htmlFor="firstname" className="text-sm">Name</label>
                                    <input id="firstname" type="text" placeholder="First name" className="w-full rounded-md border-black focus:ring focus:ring-opacity-75 text-black focus:ring-violet-600 p-3 outline" />
                                </div>
                                <div className="col-span-full">
                                    <label htmlFor="address" className="text-sm">Mobile Number</label>
                                    <input id="address" type="number" placeholder="" className="w-full rounded-md border-black focus:ring focus:ring-opacity-75 text-black focus:ring-violet-600 p-3 outline" />
                                </div>
                                <div className="col-span-full sm:col-span-3">
                                    <label htmlFor="city" className="text-sm">City</label>
                                    <input id="city" type="text" placeholder="" className="w-full rounded-md border-black focus:ring focus:ring-opacity-75 text-black focus:ring-violet-600 p-3 outline" />
                                </div>
                                <div className="col-span-full sm:col-span-3">
                                    <label htmlFor="state" className="text-sm">Thana</label>
                                    <input id="state" type="text" placeholder="" className="w-full rounded-md border-black focus:ring focus:ring-opacity-75 text-black focus:ring-violet-600 p-3 outline" />
                                </div>
                                <div className="col-span-full">
                                    <label htmlFor="zip" className="text-sm">Address</label>
                                    <input id="zip" type="text" placeholder="" className="w-full rounded-md border-black focus:ring focus:ring-opacity-75 text-black focus:ring-violet-600 p-3 outline" />
                                </div>
                            </div>
                        </fieldset>
                    </form>
                </div>

                {/* Line of middle */}
                <hr className="border border-black min-h-screen" />

                {/* Price view */}
                <div>
                    Sabrina Akter Aksha
                </div>
            </div>
        </div>
    )
}

export default OrderForm