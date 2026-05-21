'use client';
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Eye, EyeOff, LogIn, Sparkles, Shield } from 'lucide-react';
import '../app/globals.css';

function LoginPage() {
  const router = useRouter();
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
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );

      console.log("Login response:", res.data);
      
      // ✅ حفظ التوكن في localStorage
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        console.log("Token saved to localStorage");
      }
      
      // ✅ حفظ بيانات المستخدم أيضاً (اختياري)
      if (res.data.user) {
        localStorage.setItem('user', JSON.stringify(res.data.user));
        console.log("User data saved:", res.data.user);
      }
      
      // ✅ التوجيه إلى الصفحة الرئيسية
      router.push("/main");
      
    } catch (err) {
      console.error("Login error:", err);
      setError(
        err.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br backdrop-blur-2xl from-gray-950 via-black to-emerald-950/30 select-none flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/20 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-600/20 rounded-full blur-[120px] animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-400/5 rounded-full blur-[80px]" />
      </div>

      {/* Login Card */}
      <div className="relative w-full max-w-md">
        {/* Logo & Brand */}
        <div className="text-center mb-5 animate-fade-in">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-2xl shadow-2xl shadow-emerald-500/30 mb-3 group hover:scale-105 transition-transform duration-300">
            <div className="w-6 h-6 border-2 border-white/90 rounded-full border-t-transparent animate-spin-slow" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">
            Noor
          </h1>
          <p className="text-gray-400 mt-1 text-xs">Welcome back to your spiritual journey</p>
        </div>

        {/* Login Form */}
        <div className="bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-xl rounded-2xl border border-emerald-500/20 p-5 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Error Message */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-2 animate-shake">
                <p className="text-red-400 text-xs text-center">{error}</p>
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-1">
              <label className="text-gray-300 text-xs font-medium flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-emerald-400" />
                Email Address
              </label>
              <div className="relative group">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-950/50 border border-emerald-500/20 rounded-lg px-3 py-2 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 transition-all duration-300"
                  placeholder="demo@noor.com"
                  required
                />
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-emerald-500/0 via-emerald-500/5 to-emerald-500/0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1">
              <label className="text-gray-300 text-xs font-medium flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
                Password
              </label>
              <div className="relative group">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-950/50 border border-emerald-500/20 rounded-lg px-3 py-2 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 transition-all duration-300 pr-10"
                  placeholder="••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-emerald-400 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-emerald-500/0 via-emerald-500/5 to-emerald-500/0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </div>
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <button
                type="button"
                className="text-emerald-400 text-xs hover:text-emerald-300 transition-colors hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="relative w-full py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg text-white font-semibold text-sm overflow-hidden group transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/25 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Logging in...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <LogIn className="w-4 h-4" />
                  <span>Login</span>
                </div>
              )}
              
              {/* Button Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </button>

            {/* Demo Credentials */}
            <div className="pt-3 border-t border-emerald-500/10">
              <p className="text-gray-500 text-xs text-center mb-1.5">Demo Credentials:</p>
              <div className="flex items-center justify-center gap-4 text-xs">
                <div className="flex items-center gap-1 text-gray-400">
                  <Mail className="w-3 h-3" />
                  <span>demo@noor.com</span>
                </div>
                <div className="flex items-center gap-1 text-gray-400">
                  <Lock className="w-3 h-3" />
                  <span>123456</span>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Sign Up Link */}
        <div className="text-center mt-4">
          <p className="text-gray-400 text-xs">
            Don't have an account?{' '}
            <button
              onClick={() => router.push('/signup')}
              className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors hover:underline"
            >
              Sign Up
            </button>
          </p>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-4">
          <p className="text-gray-600 text-xs flex items-center justify-center gap-1">
            <Shield className="w-3 h-3" />
            Your spiritual journey starts here
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;