import { useState } from "react";

const Newsletter = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Submitted email:', email);
        setEmail('');
    };
    return (
        // <div className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 mt-24">
        //     <div className="max-w-7xl mx-auto">
        //         {/* Newsletter Section */}
        //         <div className="py-8 px-4 sm:px-6 lg:px-8">
        //             <div className="max-w-7xl mx-auto">
        //                 <div className="text-center">
        //                     <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
        //                         Want product news and updates?
        //                     </h2>
        //                     <p className="text-lg sm:text-xl text-gray-600 mb-8">
        //                         Sign up for our newsletter.
        //                     </p>
        //                 </div>

        //                 <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        //                     <div className="flex flex-col sm:flex-row gap-4">
        //                         <input
        //                             type="email"
        //                             value={email}
        //                             onChange={(e) => setEmail(e.target.value)}
        //                             placeholder="Enter your email"
        //                             required
        //                             className="flex-grow px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
        //                         />
        //                         <button
        //                             type="submit"
        //                             className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-200"
        //                         >
        //                             Subscribe
        //                         </button>
        //                     </div>
        //                 </form>

        //                 <div className="mt-8 text-center text-sm text-gray-500">
        //                     <p>
        //                         We care about your data. Read our{' '}
        //                         <a href="#" className="text-blue-600 hover:text-blue-800 underline">
        //                             privacy policy
        //                         </a>
        //                         .
        //                     </p>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </div>
        <div className="bg-[#F5F5F5] py-12 px-4 sm:px-6 lg:px-8 mt-24"> {/* Light gray background */}
            <div className="max-w-7xl mx-auto">
                {/* Newsletter Section */}
                <div className="py-8 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center">
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black mb-4"> {/* Black text */}
                                Want product news and updates?
                            </h2>
                            <p className="text-lg sm:text-xl text-gray-700 mb-8"> {/* Dark gray text */}
                                Sign up for our newsletter.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                            <div className="flex flex-col sm:flex-row gap-4">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    required
                                    className="flex-grow px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD700] focus:border-[#FFD700] outline-none transition"
                                />
                                <button
                                    type="submit"
                                    className="px-6 py-3 bg-black hover:bg-[#333333] text-white font-medium rounded-lg transition duration-200"
                                >
                                    Subscribe
                                </button>
                            </div>
                        </form>

                        <div className="mt-8 text-center text-sm text-gray-600">
                            <p>
                                We care about your data. Read our{' '}
                                <a href="#" className="text-[#FFD700] hover:text-[#FFB300] underline"> {/* Yellow link */}
                                    privacy policy
                                </a>
                                .
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Newsletter