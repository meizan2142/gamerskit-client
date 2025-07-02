import { ArrowLeft, Eye, EyeOff } from "lucide-react"
import { useForm } from "react-hook-form"
import { NavLink, useLocation, useNavigate } from "react-router"
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "../../useAuth/useAuth";
import { useState } from "react";

const Signup = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser, setLoading, updateUserProfile } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // OnSubmit function
    const onSubmit = async (data) => {
        try {
            setLoading(true);
            // User registration with Firebase
            const result = await createUser(data.email, data.password);
            console.log(result);

            // Update user profile with name
            await updateUserProfile(data.name);

            // Prepare user data for your database including the role
            const userData = {
                name: data.name,
                email: data.email,
                role: "customer",
                createdAt: new Date().toLocaleString()
            };

            // Save user data to your database
            const response = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(userData)
            });

            const responseData = await response.json();

            if (responseData.insertedId) {
                toast.success('Registered successfully');
                setTimeout(() => {
                    navigate(location?.state ? location?.state : '/');
                }, 1000);
            }
        }
        catch (err) {
            console.log(err);
            toast.error("Registration successful! Please sign in to continue.");
        }
        finally {
            setLoading(false);
        }
    }
    return (
        <div className="flex items-center justify-center min-h-screen pt-10 px-3 sm:pt-12 md:pt-24">
            <div>
                <Toaster />
            </div>
            <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white  rounded-lg w-full max-w-sm p-6 shadow-lg"
            >
                {/* Navigate to backpage */}
                <NavLink to='/signin'>
                    <ArrowLeft className="w-6 cursor-pointer ml-auto hover:text-gray-700 fill-white" />
                </NavLink>

                <h1 className="text-2xl font-semibold mb-4">SignUp</h1>

                {/* Register Form */}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium">
                            Full Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            className="mt-1 block w-full p-2 border rounded-md"
                            placeholder="Your Full Name"
                            {...register('name', { required: 'Full name is required' })}
                        />
                        {errors.name && (
                            <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            className="mt-1 block w-full p-2 border rounded-md"
                            placeholder="Email"
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: 'Invalid email address',
                                },
                            })}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                        )}
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
                                {...register('password', {
                                    required: 'Password is required',
                                    minLength: {
                                        value: 6,
                                        message: 'Password must be at least 6 characters',
                                    },
                                })}
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
                        {errors.password && (
                            <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
                        )}
                    </div>

                    <div className="">
                        <button
                            type="submit"
                            className="px-4 py-2 w-full  flex items-center flex-col justify-center  rounded-xl text-base hover:bg-[#FF6F61] transition-all ease-in bg-black text-white outline-none"
                        >
                            SignUp
                        </button>
                    </div>

                    <p className="flex justify-center items-center pt-3">
                        Already have an account?
                        <NavLink to="/signin" className="font-bold text-cyan-400 underline">
                            SignIn
                        </NavLink>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Signup