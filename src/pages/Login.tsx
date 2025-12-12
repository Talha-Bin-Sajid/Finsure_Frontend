import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Loader } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { toast } from '../utils/toast';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('demo@finsure.com');
  const [password, setPassword] = useState('demo123');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(email, password);
      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0c111a] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#14e7ff] mb-2">FINSURE</h1>
          <p className="text-[#e7f0fa]/60">Financial Insights & Secure Reporting</p>
        </div>

        <div className="bg-[#151c27] border border-[#14e7ff]/20 rounded-lg p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-[#e7f0fa] mb-6">Welcome Back</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#e7f0fa] mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#e7f0fa]/60" size={20} />
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
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#e7f0fa]/60" size={20} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-[#0c111a] text-[#e7f0fa] pl-10 pr-4 py-3 rounded-lg border border-[#14e7ff]/20 focus:border-[#14e7ff] focus:outline-none transition-colors"
                  placeholder="••••••••"
                />
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
                  <span>Signing in...</span>
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-[#e7f0fa]/60 text-sm">
              Don't have an account?{' '}
              <Link to="/signup" className="text-[#14e7ff] hover:text-[#0ab6ff] transition-colors">
                Sign up
              </Link>
            </p>
          </div>

          <div className="mt-4 p-4 bg-[#14e7ff]/10 border border-[#14e7ff]/20 rounded-lg">
            <p className="text-xs text-[#e7f0fa]/80">
              <strong>Demo credentials:</strong><br />
              Email: demo@finsure.com<br />
              Password: demo123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
