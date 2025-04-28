import { ArrowLeft, Eye, EyeOff, X } from "lucide-react"
import { NavLink, useLocation, useNavigate } from "react-router"
import { useAuth } from "../../useAuth/useAuth"
import { useEffect, useState } from "react"
import toast, { Toaster } from "react-hot-toast"

const SignIn = () => {
    const { signIn, user } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }


    const handleLogin = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        signIn(email, password)
            .then(res => {
                console.log(res.user);
                toast.success('Logged in successfully!');
                setTimeout(() => {
                    navigate(location?.state ? location?.state : '/');
                }, 1000);
            })
            .catch(err => {
                // Show toast error based on error type
                if (err.code === 'auth/user-not-found') {
                    toast.error('No account found. Please sign up first.');
                } else if (err.code === 'auth/wrong-password') {
                    toast.error('Incorrect password. Please try again.');
                } else {
                    toast.error('No account found. Please sign up first.');
                }
            });
    }
    useEffect(() => {
        if (user) {
            navigate(location.state)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div className="flex items-center justify-center min-h-screen pt-0 sm:pt-12 md:pt-24">
            <div>
                <Toaster />
            </div>
            <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white  rounded-lg w-full max-w-sm p-6 shadow-lg"
            >
                {/* Navigate to backpage */}
                <NavLink to='/'>
                    <ArrowLeft className="w-6 cursor-pointer ml-auto hover:text-gray-700 fill-white" />
                </NavLink>

                <h1 className="text-2xl font-semibold mb-4">SignIn</h1>

                {/* Login Form */}
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium">Email</label>
                        <input id="email" type="email" className="mt-1 block w-full p-2 border rounded-md " placeholder="Email" />
                    </div>

                    <div className="mb-4 space-y-2">
                        <label htmlFor="password" className="block text-sm font-medium">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                className="mt-1 block w-full p-2 border rounded-md pr-10"
                                placeholder="Password"
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? (
                                    <EyeOff className="h-5 w-5 text-black" />
                                ) : (
                                    <Eye className="h-5 w-5 text-black" />
                                )}
                            </button>
                        </div>
                        {/* <div className="flex justify-end">
                            <NavLink className="hover:underline text-sm" to="/forgot-password">
                                Forgot Password?
                            </NavLink>
                        </div> */}
                    </div>
                    <div className="">
                        <button className="px-4 py-2 w-full block rounded-xl text-base hover:bg-[#FF6F61] transition-all ease-in bg-black text-white outline-none">SignIn</button>
                    </div>
                    <p className="flex justify-center items-center pt-3">Don't have an account?<NavLink to='/signup' className='font-bold text-cyan-400 underline'>Signup</NavLink></p>
                </form>
            </div>
        </div>
    )
}

export default SignIn