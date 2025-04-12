const OrderForm = () => {
    return (
        <div className="pt-24 text-center">
            <h1>Place orders</h1>
            <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-50">
                <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                    <div className="col-span-full sm:col-span-3">
                        <label htmlFor="firstname" className="text-sm">Facebook/Instagram Name</label>
                        <input id="firstname" type="text" placeholder="First name" className="w-full rounded-md border focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300" />
                    </div>
                    <div className="col-span-full sm:col-span-3">
                        <label htmlFor="email" className="text-sm">Email</label>
                        <input id="email" type="email" placeholder="Email" className="w-full rounded-md border focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300" />
                    </div>
                    <div className="col-span-full">
                        <label htmlFor="address" className="text-sm">Address</label>
                        <input id="address" type="text" placeholder="" className="w-full rounded-md focus:ring border focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300" />
                    </div>
                    <div className="col-span-full sm:col-span-2">
                        <label htmlFor="city" className="text-sm">City</label>
                        <input id="city" type="text" placeholder="" className="w-full rounded-md focus:ring border focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300" />
                    </div>
                    <div className="col-span-full sm:col-span-2">
                        <label htmlFor="state" className="text-sm">State / Province</label>
                        <input id="state" type="text" placeholder="" className="w-full rounded-md focus:ring border focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300" />
                    </div>
                    <div className="col-span-full sm:col-span-2">
                        <label htmlFor="zip" className="text-sm">ZIP / Postal</label>
                        <input id="zip" type="text" placeholder="" className="w-full rounded-md focus:ring border focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300" />
                    </div>
                </div>
            </fieldset>
        </div>
    )
}

export default OrderForm