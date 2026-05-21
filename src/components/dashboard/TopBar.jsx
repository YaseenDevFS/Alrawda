'use client'
import { useRouter } from 'next/navigation'; // للـ App Router (Next.js 13+)
import React, { useState, useEffect } from 'react';
import { Search, Bell, Moon, Sun, Menu, X,  } from 'lucide-react';
import axios from 'axios';

const TopBar = () => {
  const Router = useRouter();
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // جلب بيانات المستخدم
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');

        console.log("Token from localStorage:", token);

        if (!token) {
          console.log("No token found, user not logged in");
          setLoading(false);
          return;
        }

        console.log("Fetching user data from /api/auth/me");
        const res = await axios.get("https://alrawda-backend.vercel.app/api/auth/me", {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        console.log("Full API Response:", res);
        console.log("Response data:", res.data);
        console.log("User object:", res.data.user);

        // ✅ البيانات موجودة في res.data.user
        if (res.data && res.data.user) {
          setUserData(res.data.user);
          console.log("User data set successfully:", res.data.user);
        } else {
          console.log("User data not found in response");
        }

        setLoading(false);
      } catch (err) {
        console.error("Error fetching user data:", err);
        if (err.response) {
          console.error("Error response data:", err.response.data);
          console.error("Error response status:", err.response.status);

          // إذا كان التوكن منتهي الصلاحية
          if (err.response.status === 401) {
            console.log("Token expired or invalid, clearing localStorage");
            localStorage.removeItem('token');
            localStorage.removeItem('user');
          }
        }
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return (
    <>
      <header className="h-30 md:h-20 w-full backdrop-blur-md border-emerald-500/20 flex items-center justify-between py-2 px-4 sm:px-6 md:px-8 sticky top-0 z-1000">

        <div className="lg:hidden flex items-center">
          <h1 className="text-emerald-400 font-bold text-lg">IQraa</h1>
        </div>

        <div className="hidden md:block relative flex-1 max-w-[200px] md:max-w-sm lg:w-96">
          <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-500" />
          </div>
          <input
            type="text"
            placeholder="Search Quran, prayers..."
            className="w-full bg-emerald-500/10 backdrop-blur-sm rounded-lg py-2 pl-8 pr-3 text-sm text-gray-300 placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 transition-all"
          />
        </div>

        <div className="flex items-center gap-2 sm:gap-2 md:gap-5">

          <button className="relative p-2 bg-emerald-500/10 backdrop-blur-sm rounded-lg text-gray-400 hover:text-white hover:bg-emerald-500/20 transition-all duration-300">
            <Bell size={18} className="sm:w-5 sm:h-5" />
            <span className="absolute top-0 right-0 w-4 h-4 bg-gradient-to-r from-amber-500 to-amber-600 text-[10px] text-white font-bold flex items-center justify-center rounded-full shadow-lg">
              3
            </span>
          </button>

          <button
            onClick={toggleTheme}
            className="p-2 bg-emerald-500/10 backdrop-blur-sm rounded-lg flex items-center gap-2 text-gray-400 hover:text-white hover:bg-emerald-500/20 transition-all duration-300"
          >
            {isDarkMode ? (
              <Sun size={16} className="sm:w-[18px] sm:h-[18px] text-yellow-400" />
            ) : (
              <Moon size={16} className="sm:w-[18px] sm:h-[18px] text-sky-400" />
            )}
            <span className="hidden sm:inline text-xs text-gray-300 font-medium">
              {isDarkMode ? 'Light' : 'Dark'}
            </span>
          </button>

          {/* Profile Section */}
          <div className="flex items-center gap-2 ml-0 sm:ml-2 cursor-pointer group">
            <div className="hidden sm:block text-right">
              <p className="text-gray-400 text-[10px] sm:text-xs">Welcome back</p>
              <h2
                className="text-gray-100 text-xs sm:text-sm font-semibold group-hover:text-emerald-400 transition-colors cursor-pointer"
                onClick={() => Router.push('/profile')}
              >
                {loading ? 'Loading...' : (userData?.name || 'Guest')}
              </h2>
            </div>

            <div className="sm:hidden text-right">
              <h2 className="text-gray-100 text-sm font-semibold">
                {loading ? '...' : (userData?.name || 'Guest')}
              </h2>
            </div>

            <div className="relative">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-emerald-500/30 to-emerald-700/30 border-2 border-emerald-500/30 flex items-center justify-center text-gray-200 text-sm font-semibold group-hover:border-emerald-400/50 transition-all duration-300">
                {userData?.name ? userData.name.charAt(0).toUpperCase() : 'G'}
              </div>
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-emerald-900"></div>
            </div>
          </div>


        </div>
      </header>

     

      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideRight {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(0);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
        .animate-slideRight {
          animation: slideRight 0.3s ease-out;
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default TopBar;