import { useState } from 'react';
import { allLocation } from "./locations";

const OrderForm = () => {
    const locations = allLocation();
    const [selectedDistrict, setSelectedDistrict] = useState('');

    // Get the selected location object based on the selected district name
    const selectedLocation = locations.find(loc => loc.name === selectedDistrict);

    // Get thanas for the selected district or empty array if none selected
    const thanas = selectedLocation ? selectedLocation.thana : [];

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
                                    <input id="email" type="email" placeholder="Email" className="w-full rounded-md border-black text-black  p-3 outline" />
                                </div>
                                <div className="col-span-full sm:col-span-3">
                                    <label htmlFor="firstname" className="text-sm">Name</label>
                                    <input id="firstname" type="text" placeholder="Your Full Name" className="w-full rounded-md border-black text-black  p-3 outline" />
                                </div>
                                <div className="col-span-full">
                                    <label htmlFor="address" className="text-sm">Mobile Number</label>
                                    <input id="address" type="number" placeholder="Your mobile number" className="w-full rounded-md border-black text-black  p-3 outline" />
                                </div>
                                <div className="col-span-full sm:col-span-3">
                                    <label htmlFor="city" className="text-sm">District</label>
                                    <select
                                        id="district"
                                        name="district"
                                        className="w-full rounded-md border-black text-black p-3 outline"
                                        value={selectedDistrict}
                                        onChange={(e) => setSelectedDistrict(e.target.value)}
                                    >
                                        <option value="">Select a district</option>
                                        {locations.map((location) => (
                                            <option key={location.name} value={location.name}>
                                                {location.district}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-span-full sm:col-span-3">
                                    <label htmlFor="thana" className="text-sm">Thana</label>
                                    <select
                                        id="thana"
                                        name="thana"
                                        className="w-full rounded-md border-black text-black p-3 outline"
                                        disabled={!selectedDistrict}
                                    >
                                        <option value="">Select a thana</option>
                                        {thanas.map((thana, index) => (
                                            <option key={index} value={thana}>
                                                {thana}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-span-full">
                                    <label htmlFor="zip" className="text-sm">Address</label>
                                    <input id="zip" type="text" placeholder="Your Address" className="w-full rounded-md border-black text-black  p-3 outline" />
                                </div>
                                <div className="col-span-full sm:col-span-3">
                                    <label htmlFor="digits" className="text-sm">Bkash / Nagad Last 4 Digits</label>
                                    <input id="digits" type="number" placeholder="Last 4 digits" className="w-full rounded-md border-black text-black  p-3 outline" />
                                </div>
                                <div className="col-span-full sm:col-span-3">
                                    <label htmlFor="amount" className="text-sm">Advance amount</label>
                                    <input id="amount" type="text" placeholder="Advance amount" className="w-full rounded-md border-black text-black  p-3 outline" />
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

export default OrderForm;