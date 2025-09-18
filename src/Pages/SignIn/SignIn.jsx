import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../useAuth/useAuth";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const SignIn = () => {
  const { signIn, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value.trim();
    const password = form.password.value;

    if (!email || !password) {
      return toast.error("Please fill in both email and password.");
    }

    signIn(email, password)
      .then(() => {
        toast.success("Logged in successfully!");
        setTimeout(() => {
          navigate(location?.state ? location.state : "/");
        }, 800);
      })
      .catch((err) => {
        if (err.code === "auth/user-not-found") {
          toast.error("No account found. Please sign up first.");
        } else if (err.code === "auth/wrong-password") {
          toast.error("Incorrect password. Please try again.");
        } else {
          toast.error("Something went wrong. Try again later.");
        }
      });
  };

  useEffect(() => {
    if (user) {
      navigate(location.state || "/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

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
                Welcome back, Gamer!
              </h3>
              <p className="text-gray-300 mt-4 text-lg max-w-md">
                Create your account today and get access to exclusive gaming
                gear, epic deals, and the ultimate gamers’ community.
              </p>
            </div>
          </div>

          {/* Right SignIn Form */}
          <div className="p-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
              <h2 className="text-center text-3xl font-bold tracking-tight text-white">
                Sign In
              </h2>
              <p className="mt-2 text-center text-sm text-gray-300">
                Don't have an account?{" "}
                <NavLink
                  to="/signup"
                  className="text-yellow-500 hover:text-yellow-600 font-semibold transition-colors">
                  Sign up
                </NavLink>
              </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
              <form onSubmit={handleLogin} className="space-y-6">
                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300 mb-1">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    className="w-full px-3 py-2 border rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                    placeholder="Enter your email"
                  />
                </div>

                {/* Password */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-300 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      className="w-full px-3 py-2 border rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-yellow-400 focus:outline-none pr-10"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-300 hover:text-yellow-400"
                      onClick={togglePasswordVisibility}>
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-yellow-500 text-black rounded-lg font-semibold hover:bg-yellow-600 transition-all">
                    Sign In
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
