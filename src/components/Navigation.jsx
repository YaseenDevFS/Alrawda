// frontend/src/components/Navigation.jsx
'use client';

import React, { useState, useEffect } from 'react';
import { 
  Home, 
  BookOpen, 
  User, 
  Heart, 
  Menu, 
  X,
  Sun,
  Moon,
  LogIn,
  LogOut,
  UserPlus,
  Settings,
  Shield,
  Bell,
  Search,
  Star,
  BookMarked,
  GraduationCap,
  Users,
  Sparkles,
  ArrowRight,
  ChevronLeft
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [scrolled, setScrolled] = useState(false);

  // التحقق من حالة تسجيل الدخول
  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (token && user) {
      setIsLoggedIn(true);
      try {
        const userData = JSON.parse(user);
        setUserName(userData.name || '');
      } catch (e) {
        console.error('Error parsing user data');
      }
    } else {
      setIsLoggedIn(false);
      setUserName('');
    }
  }, [pathname]);

  // تأثير التمرير لتغيير شكل الناف بار
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleGoBack = () => {
    // إذا كان هناك صفحة سابقة في التاريخ، ارجع لها
    if (window.history.length > 1) {
      router.back();
    } else {
      // وإلا اذهب إلى الصفحة الرئيسية
      router.push('/');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUserName('');
    router.push('/');
    setIsMobileMenuOpen(false);
  };

  // تحديد ما إذا كان يجب إظهار زر الرجوع (ليس في الصفحة الرئيسية)
  const showBackButton = pathname !== '/';

  const navLinks = [
    { href: '/', label: 'الرئيسية', icon: <Home className="w-4 h-4" /> },
    { href: '/adhkar', label: 'الأذكار', icon: <BookOpen className="w-4 h-4" /> },
    { href: '/quran', label: 'القرآن', icon: <BookMarked className="w-4 h-4" /> },
    { href: '/community', label: 'المجتمع', icon: <Users className="w-4 h-4" /> },
    { href: '/learning', label: 'التعلم', icon: <GraduationCap className="w-4 h-4" /> },
  ];

  return (
    <>
      {/* Navigation Bar */}
      <nav 
        className={`fixed top-0   right-2 w-[79.5vw]   z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-[#051410]/95 backdrop-blur-md border-b border-emerald-500/20 shadow-lg' 
            : 'bg-gradient-to-r from-emerald-900/80 to-emerald-800/80 backdrop-blur-sm border-b border-emerald-500/30'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="flex items-center justify-between h-14 sm:h-16">
            
            {/* Left Side - Back Button + Logo */}
            <div className="flex items-center gap-2">
              {/* زر الرجوع - يظهر فقط في الصفحات الفرعية */}
              {showBackButton && (
                <button 
                  onClick={handleGoBack}
                  className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors group"
                  title="رجوع"
                >
                  <ChevronLeft className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </button>
              )}
              
              {/* Logo */}
              <Link href="/" className="flex items-center gap-2 group">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
                  <span className="text-white text-lg">🕌</span>
                </div>
                <span className="text-white font-bold text-base sm:text-lg hidden sm:block">
                  <span className="text-emerald-400">Quran</span>Connect
                </span>
                <span className="text-white font-bold text-base sm:text-lg block sm:hidden">
                  QC
                </span>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-1 lg:gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 px-3 lg:px-4 py-2 rounded-lg transition-all duration-300 ${
                    pathname === link.href
                      ? 'bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 text-emerald-400 border border-emerald-500/30'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.icon}
                  <span className="text-sm font-medium">{link.label}</span>
                </Link>
              ))}
            </div>

            {/* Right Side - User Actions */}
            <div className="flex items-center gap-2">
              
              {/* Search Button */}
              <button className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
                <Search className="w-4 h-4" />
              </button>

              {/* Theme Toggle */}
              <button className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
                <Sun className="w-4 h-4" />
              </button>

              {/* Desktop User Actions */}
              <div className="hidden sm:flex items-center gap-2">
                {isLoggedIn ? (
                  <>
                    {/* Notifications */}
                    <button className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors relative">
                      <Bell className="w-4 h-4" />
                      <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    </button>
                    
                    {/* Profile Dropdown */}
                    <div className="relative group">
                      <button className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-white/10 transition-colors">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-emerald-400/30 to-emerald-600/30 flex items-center justify-center text-sm border border-emerald-500/30">
                          {userName ? userName.charAt(0).toUpperCase() : '👤'}
                        </div>
                        <span className="text-gray-300 text-sm hidden lg:block">
                          {userName ? userName.split(' ')[0] : 'User'}
                        </span>
                      </button>
                      
                      {/* Dropdown Menu */}
                      <div className="absolute left-0 top-full mt-2 w-48 bg-black/95 backdrop-blur-md rounded-xl border border-emerald-500/30 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                        <div className="py-2">
                          <Link 
                            href="/profile" 
                            className="flex items-center gap-3 px-4 py-2 text-gray-300 hover:text-white hover:bg-white/5 transition-colors text-sm"
                          >
                            <User className="w-4 h-4" />
                            الملف الشخصي
                          </Link>
                          <Link 
                            href="/favorites" 
                            className="flex items-center gap-3 px-4 py-2 text-gray-300 hover:text-white hover:bg-white/5 transition-colors text-sm"
                          >
                            <Star className="w-4 h-4" />
                            المفضلة
                          </Link>
                          <Link 
                            href="/settings" 
                            className="flex items-center gap-3 px-4 py-2 text-gray-300 hover:text-white hover:bg-white/5 transition-colors text-sm"
                          >
                            <Settings className="w-4 h-4" />
                            الإعدادات
                          </Link>
                          <div className="h-px bg-gray-700 my-1"></div>
                          <button 
                            onClick={handleLogout}
                            className="flex items-center gap-3 px-4 py-2 text-red-400 hover:text-red-300 hover:bg-white/5 transition-colors text-sm w-full"
                          >
                            <LogOut className="w-4 h-4" />
                            تسجيل الخروج
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <Link 
                      href="/login"
                      className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-colors text-sm"
                    >
                      <LogIn className="w-4 h-4" />
                      دخول
                    </Link>
                    <Link 
                      href="/signup"
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-sm font-medium hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300"
                    >
                      <UserPlus className="w-4 h-4" />
                      تسجيل
                    </Link>
                  </>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          isMobileMenuOpen ? 'visible' : 'invisible'
        }`}
      >
        {/* Backdrop */}
        <div 
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
            isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
        
        {/* Menu Panel */}
        <div 
          className={`absolute right-0 top-0 bottom-0 w-72 bg-gradient-to-b from-[#0a1a15] to-[#051410] shadow-2xl transition-transform duration-300 transform ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex flex-col h-full">
            {/* Menu Header with Back Button */}
            <div className="p-4 border-b border-emerald-500/20">
              <div className="flex items-center gap-3">
                {/* زر الرجوع في القائمة المتنقلة */}
                {showBackButton && (
                  <button 
                    onClick={handleGoBack}
                    className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                )}
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400/30 to-emerald-600/30 flex items-center justify-center text-2xl border border-emerald-500/30">
                  🕌
                </div>
                <div>
                  <h3 className="text-white font-semibold">QuranConnect</h3>
                  <p className="text-gray-500 text-xs">منصة قرآنية متكاملة</p>
                </div>
              </div>
            </div>

            {/* Menu Links */}
            <div className="flex-1 py-4">
              {/* زر الرجوع في منتصف القائمة (اختياري) */}
              {showBackButton && (
                <button 
                  onClick={handleGoBack}
                  className="flex items-center gap-3 px-4 py-3 w-full text-emerald-400 hover:bg-white/5 transition-colors border-b border-emerald-500/20 mb-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="text-sm">رجوع</span>
                </button>
              )}
              
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 transition-colors ${
                    pathname === link.href
                      ? 'bg-emerald-500/10 text-emerald-400 border-r-2 border-emerald-400'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.icon}
                  <span className="text-sm">{link.label}</span>
                </Link>
              ))}
              
              <div className="h-px bg-gray-800 my-2"></div>
              
              {isLoggedIn ? (
                <>
                  <Link 
                    href="/profile" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    <User className="w-4 h-4" />
                    <span className="text-sm">الملف الشخصي</span>
                  </Link>
                  <Link 
                    href="/favorites" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    <Star className="w-4 h-4" />
                    <span className="text-sm">المفضلة</span>
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-white/5 transition-colors w-full"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="text-sm">تسجيل الخروج</span>
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    href="/login" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    <LogIn className="w-4 h-4" />
                    <span className="text-sm">دخول</span>
                  </Link>
                  <Link 
                    href="/signup" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 text-emerald-400 mx-3 rounded-lg"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span className="text-sm">إنشاء حساب جديد</span>
                  </Link>
                </>
              )}
            </div>

            {/* Menu Footer */}
            <div className="p-4 border-t border-emerald-500/20">
              <div className="flex justify-center gap-3">
                <span className="text-gray-600 text-[10px]">© 2024 QuranConnect</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer to prevent content from going under navbar */}
      <div className="h-14 sm:h-16"></div>
    </>
  );
}

export default Navigation;