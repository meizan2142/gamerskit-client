const OrderForm = () => {
    return (
        <div className="pt-24 p-10 text-center space-y-10">
            <div>
                <h1 className="font-bold text-3xl">Delivery Details</h1>
            </div>
            {/* Main Div */}
            <div className="grid grid-cols-1 sm:grid gap-10 sm:grid-cols-1 md:grid-cols-1 md:grid lg:flex lg:justify-between">
                {/* Input Fields */}
                <div>
                    <form noValidate="" action="" className="container flex flex-col mx-auto space-y-12">
                        <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-50">
                            <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                                <div className="col-span-full sm:col-span-3">
                                    <label htmlFor="firstname" className="text-sm">First name</label>
                                    <input id="firstname" type="text" placeholder="First name" className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300" />
                                </div>
                                <div className="col-span-full sm:col-span-3">
                                    <label htmlFor="lastname" className="text-sm">Last name</label>
                                    <input id="lastname" type="text" placeholder="Last name" className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300" />
                                </div>
                                <div className="col-span-full sm:col-span-3">
                                    <label htmlFor="email" className="text-sm">Email</label>
                                    <input id="email" type="email" placeholder="Email" className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300" />
                                </div>
                                <div className="col-span-full">
                                    <label htmlFor="address" className="text-sm">Address</label>
                                    <input id="address" type="text" placeholder="" className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300" />
                                </div>
                                <div className="col-span-full sm:col-span-2">
                                    <label htmlFor="city" className="text-sm">City</label>
                                    <input id="city" type="text" placeholder="" className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300" />
                                </div>
                                <div className="col-span-full sm:col-span-2">
                                    <label htmlFor="state" className="text-sm">State / Province</label>
                                    <input id="state" type="text" placeholder="" className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300" />
                                </div>
                                <div className="col-span-full sm:col-span-2">
                                    <label htmlFor="zip" className="text-sm">ZIP / Postal</label>
                                    <input id="zip" type="text" placeholder="" className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300" />
                                </div>
                            </div>
                        </fieldset>
                    </form>
                </div>

                {/* Line of middle */}
                <hr className="border border-black min-h-screen" />

                {/* Price view */}
                <div>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda, tempore dignissimos accusantium inventore facilis sint. Molestias aut tempore est omnis, ipsum ab? Voluptate cupiditate consequuntur minus sequi asperiores at labore?</div>
            </div>
        </div>
    )
}

export default OrderForm