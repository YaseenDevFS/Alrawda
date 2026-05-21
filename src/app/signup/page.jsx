// app/signup/page.jsx
'use client';
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Eye, EyeOff, UserPlus, User, Shield } from 'lucide-react';

function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const res = await axios.post(
        "http://localhost:5000/api/auth/signup",
        {
          name,
          email,
          password,
        }
      );

      console.log("Signup response:", res.data);
      
      // ✅ بعد التسجيل الناجح، توجه إلى صفحة login
      router.push("/login");
      
    } catch (err) {
      console.error("Signup error:", err);
      setError(
        err.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-gray-950 via-black to-emerald-950/30 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-5">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-2xl shadow-2xl mb-3">
            <UserPlus className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">
            Create Account
          </h1>
          <p className="text-gray-400 mt-1 text-xs">Join our spiritual community</p>
        </div>

        <div className="bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-xl rounded-2xl border border-emerald-500/20 p-5">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-2">
                <p className="text-red-400 text-xs text-center">{error}</p>
              </div>
            )}

            {/* Name Field */}
            <div className="space-y-1">
              <label className="text-gray-300 text-xs font-medium flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-emerald-400" />
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-gray-950/50 border border-emerald-500/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-emerald-400"
                placeholder="Ahmed Mohamed"
                required
              />
            </div>

            {/* Email Field */}
            <div className="space-y-1">
              <label className="text-gray-300 text-xs font-medium flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-emerald-400" />
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-950/50 border border-emerald-500/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-emerald-400"
                placeholder="ahmed@example.com"
                required
              />
            </div>

            {/* Password Field */}
            <div className="space-y-1">
              <label className="text-gray-300 text-xs font-medium flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-950/50 border border-emerald-500/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-emerald-400 pr-10"
                  placeholder="••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-emerald-400"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg text-white font-semibold text-sm disabled:opacity-70"
            >
              {loading ? 'Creating account...' : 'Sign Up'}
            </button>

            <div className="text-center">
              <p className="text-gray-400 text-xs">
                Already have an account?{' '}
                <button
                  onClick={() => router.push('/login')}
                  className="text-emerald-400 hover:text-emerald-300"
                >
                  Login
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;