import { ArrowLeft, X } from "lucide-react"
import { NavLink } from "react-router"

const SignIn = () => {
    return (
        <div className="flex items-center justify-center min-h-screen pt-0 sm:pt-12 md:pt-24">
            <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white  rounded-lg w-full max-w-sm p-6 shadow-lg"
            >
                {/* Navigate to backpage */}
                <NavLink to='/'>
                    <ArrowLeft className="w-6 cursor-pointer ml-auto hover:text-gray-700 fill-white" />
                </NavLink>
                
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
    )
}

export default SignIn