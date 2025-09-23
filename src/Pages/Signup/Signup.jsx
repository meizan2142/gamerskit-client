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
   <div className="flex min-h-screen items-center justify-center bg-black px-4 py-12 sm:px-6 lg:px-8">
      <Toaster />
      <div className="w-full max-w-[900px] overflow-hidden rounded-2xl bg-gray-900 shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Hero Section */}
          <div className="bg-gradient-to-br from-black via-gray-900 to-gray-800 relative hidden md:block">
            <div className="absolute inset-0 bg-black/40" />
            <div className="relative flex h-full flex-col justify-center p-12">
              <h3 className="text-yellow-400 text-4xl font-extrabold md:text-5xl lg:text-6xl drop-shadow-md">
                Join the
                <br />
                GamersKit Squad!
              </h3>
              <p className="text-gray-300 mt-4 text-lg max-w-md">
                Create your account today and get access to exclusive gaming
                gear, epic deals, and the ultimate gamers’ community.
              </p>
            </div>
          </div>

          {/* Right SignUp Form */}
          <div className="p-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
              <h2 className="text-center text-3xl font-bold tracking-tight text-white">
                Sign Up
              </h2>
              <p className="mt-2 text-center text-sm text-gray-300">
                Already have an account?{" "}
                <NavLink
                  to="/signin"
                  className="text-yellow-500 hover:text-yellow-600 font-semibold transition-colors">
                  Sign In
                </NavLink>
              </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Full Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Your Full Name"
                    className="w-full px-3 py-2 border rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                    {...register("name", { required: "Full name is required" })}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-3 py-2 border rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="w-full px-3 py-2 border rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-yellow-400 focus:outline-none pr-10"
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message: "Password must be at least 6 characters",
                        },
                      })}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-300 hover:text-yellow-400"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-yellow-500 text-black rounded-lg font-semibold hover:bg-yellow-600 transition-all"
                  >
                    Sign Up
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
}

export default Signup