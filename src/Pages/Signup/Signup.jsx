import { ArrowLeft } from "lucide-react"
import { NavLink } from "react-router"

const Signup = () => {
    return (
        <div className="flex items-center justify-center min-h-screen pt-10 px-3 sm:pt-12 md:pt-24">
            <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white  rounded-lg w-full max-w-sm p-6 shadow-lg"
            >
                {/* Navigate to backpage */}
                <NavLink to='/signin'>
                    <ArrowLeft className="w-6 cursor-pointer ml-auto hover:text-gray-700 fill-white" />
                </NavLink>

                <h1 className="text-2xl font-semibold mb-4">SignUp</h1>

                {/* Login Form */}
                <form>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium">Full Name</label>
                        <input id="name" type="text" className="mt-1 block w-full p-2 border rounded-md " placeholder="Your Full Name" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium">Email</label>
                        <input id="email" type="email" className="mt-1 block w-full p-2 border rounded-md " placeholder="Email" />
                    </div>
                    <div className="mb-4 space-y-2">
                        <label htmlFor="password" className="block text-sm font-medium">Password</label>
                        <input id="password" type="password" className="mt-1 block w-full p-2 border rounded-md" placeholder="Password" />
                    </div>
                    <div className="">
                        <button className="px-4 py-2 w-full block rounded-xl text-base hover:bg-[#FF6F61] transition-all ease-in bg-black text-white outline-none">SignIn</button>
                    </div>
                    <p className="flex justify-center items-center pt-3">Already have an account?<NavLink to='/signin' className='font-bold text-cyan-400 underline'>Signin</NavLink></p>
                </form>
            </div>
        </div>
    )
}

export default Signup