import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, User, Loader, ChevronDown, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "../utils/toast";


export const Signup: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userType, setUserType] = useState("");
  const [showPassword, setShowPassword] = useState(false); // password show kranay k lye
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // password show kranay k lye

  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setIsLoading(true);

    try {
      await signup(email, password, name, userType);
      toast.success("Account created successfully!");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Failed to create account");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0c111a] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#14e7ff] mb-2">FINSURE</h1>
          <p className="text-[#e7f0fa]/60">
            Financial Insights & Secure Reporting
          </p>
        </div>

        <div className="bg-[#151c27] border border-[#14e7ff]/20 rounded-lg p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-[#e7f0fa] mb-6">
            Create Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#e7f0fa] mb-2">
                Full Name
              </label>
              <div className="relative">
                <User
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#e7f0fa]/60"
                  size={20}
                />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full bg-[#0c111a] text-[#e7f0fa] pl-10 pr-4 py-3 rounded-lg border border-[#14e7ff]/20 focus:border-[#14e7ff] focus:outline-none transition-colors"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#e7f0fa] mb-2">
                Email
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#e7f0fa]/60"
                  size={20}
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-[#0c111a] text-[#e7f0fa] pl-10 pr-4 py-3 rounded-lg border border-[#14e7ff]/20 focus:border-[#14e7ff] focus:outline-none transition-colors"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#e7f0fa] mb-2">
                User Type
              </label>

              <div className="relative group">
                <User
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#e7f0fa]/60"
                  size={20}
                />

                {/* Arrow */}
                <ChevronDown
                  size={20}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#e7f0fa]/60
                 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                />

                <select
                  value={userType}
                  onChange={(e) => setUserType(e.target.value)}
                  required
                  className="w-full bg-[#0c111a] text-[#e7f0fa]
                 pl-10 pr-10 py-3 rounded-lg
                 border border-[#14e7ff]/20
                 focus:border-[#14e7ff] focus:outline-none
                 transition-colors
                 appearance-none cursor-pointer"
                >
                  <option value="" disabled>
                    Select user type
                  </option>

                  <option
                    value="businessman"
                    className="bg-[#0c111a] hover:bg-[#0ab6ff] hover:text-[#0c111a]"
                  >
                    Businessman
                  </option>

                  <option
                    value="freelancer"
                    className="bg-[#0c111a] hover:bg-[#0ab6ff] hover:text-[#0c111a]"
                  >
                    Freelancer
                  </option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#e7f0fa] mb-2">
                Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#e7f0fa]/60"
                  size={20}
                />

                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-[#0c111a] text-[#e7f0fa] pl-10 pr-12 py-3 rounded-lg border border-[#14e7ff]/20 focus:border-[#14e7ff] focus:outline-none transition-colors"
                  placeholder="••••••••"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#e7f0fa]/60 hover:text-[#14e7ff]"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>


            <div>
              <label className="block text-sm font-medium text-[#e7f0fa] mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#e7f0fa]/60"
                  size={20}
                />

                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full bg-[#0c111a] text-[#e7f0fa] pl-10 pr-12 py-3 rounded-lg border border-[#14e7ff]/20 focus:border-[#14e7ff] focus:outline-none transition-colors"
                  placeholder="••••••••"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#e7f0fa]/60 hover:text-[#14e7ff]"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>


            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#0ab6ff] hover:bg-[#14e7ff] text-[#0c111a] py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader className="animate-spin" size={20} />
                  <span>Creating account...</span>
                </>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-[#e7f0fa]/60 text-sm">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-[#14e7ff] hover:text-[#0ab6ff] transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
