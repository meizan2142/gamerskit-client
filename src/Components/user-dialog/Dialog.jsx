import { User, X } from "lucide-react";
import { useState } from "react";

export default function Dialog() {
    const [openModal, setOpenModal] = useState(false);

    return (
        <div className="mx-auto flex items-center justify-center">
            <User onClick={() => setOpenModal(true)} className="cursor-pointer text-black hover:text-gray-700" />


            {/* Modal */}
            {openModal && (
                <div onClick={() => setOpenModal(false)} className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50">
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white  rounded-lg w-full max-w-sm p-6 shadow-lg transition-transform transform scale-100"
                    >
                        {/* Close Button */}
                        <X onClick={() => setOpenModal(false)} className="w-6 cursor-pointer ml-auto hover:text-gray-700 fill-black dark:fill-white"/>

                        <h1 className="text-2xl font-semibold mb-4">Signin</h1>

                        {/* Login Form */}
                        <form>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-sm font-medium">Email</label>
                                <input id="email" type="email" className="mt-1 block w-full p-2 border rounded-md " placeholder="Email" />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="password" className="block text-sm font-medium">Password</label>
                                <input id="password" type="password" className="mt-1 block w-full p-2 border rounded-md" placeholder="Password" />
                            </div>
                            <div className="">
                            <button className="px-4 py-2 w-full block rounded-xl text-base hover:bg-[#FF6F61] transition-all ease-in bg-black text-white outline-none">SignIn</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
