import { User } from "lucide-react";
import { useState } from "react";

export default function Dialog() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            {/* User Icon Button */}
            <button onClick={() => setIsOpen(true)} className="p-2 rounded-full ">
                <User/>
            </button>

            {/* Modal Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0  flex justify-center items-center"
                    onClick={() => setIsOpen(false)}
                >
                    {/* Modal Box */}
                    <div
                        className="bg-white p-6 rounded-lg shadow-lg w-96 relative"
                        onClick={(e) => e.stopPropagation()} // Prevent modal close on clicking inside
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
                        >
                            ✖
                        </button>

                        {/* Modal Content */}
                        <h2 className="text-xl font-bold mb-4">Sign in</h2>
                        <p className="text-gray-500 mb-4">Access your account</p>

                        {/* Input Fields */}
                        <input
                            type="text"
                            placeholder="Name"
                            className="w-full p-2 border rounded-md mb-3"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full p-2 border rounded-md mb-3"
                        />

                        {/* Forgot Password */}
                        <a href="#" className="text-sm text-blue-500 block mb-3">
                            Forgot password?
                        </a>

                        {/* Sign-in Button */}
                        <button className="w-full bg-black text-white p-2 rounded-md">
                            Sign in
                        </button>

                        {/* Sign-up Link */}
                        <p className="text-center text-sm mt-3">
                            Don't have an account?{" "}
                            <a href="#" className="text-blue-500">
                                Sign up
                            </a>
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
