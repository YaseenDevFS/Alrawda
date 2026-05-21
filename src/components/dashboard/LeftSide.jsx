'use client';
import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  BookOpen, 
  Moon, 
  Clock, 
  LineChart, 
  Trophy, 
  Users, 
  UserCircle, 
  Settings 
} from 'lucide-react';

const SidebarItem = ({ icon: Icon, label, href, active, onClick }) => (
  <div 
    onClick={() => onClick(href)}
    className={`
      select-none
      flex items-center gap-3 px-4 py-2.5 rounded-lg cursor-pointer transition-all duration-200
      ${active 
        ? 'bg-emerald-500/10 text-emerald-400 border-l-2 border-emerald-400' 
        : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'}
    `}
  >
    <Icon size={20} />
    <span className="text-sm font-medium">{label}</span>
  </div>
);

const MobileNavItem = ({ icon: Icon, label, href, active, onClick }) => (
  <div 
    onClick={() => onClick(href)}
    className={`
      
      select-none
      flex flex-col items-center gap-1 py-1 px-3 rounded-lg cursor-pointer transition-all duration-200
      ${active ? 'text-emerald-400' : 'text-gray-400 hover:text-gray-300'}
    `}
  >
    <Icon size={20} />
    <span className="text-[11px]">{label}</span>
    {active && <div className="w-1 h-1 bg-emerald-400 rounded-full mt-0.5" />}
  </div>
);

const Sidebar = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/main' },
    { icon: BookOpen, label: 'Quran', href: '/quran' },
    { icon: Moon, label: 'Azkar', href: '/azkar' },
    { icon: Clock, label: 'Prayer', href: '/prayer' },
    { icon: LineChart, label: 'Tracker', href: '/tracker' },
    { icon: Trophy, label: 'Challenges', href: '/challenges' },
    { icon: Users, label: 'Community', href: '/community' },
    { icon: UserCircle, label: 'Profile', href: '/profile' },
    { icon: Settings, label: 'Settings', href: '/settings' },
  ];

  const handleNavigation = (href) => router.push(href);

  const isActive = (href) => {
    if (href === '/main') return pathname === href;
    return pathname?.startsWith(href);
  };

  return (
    <>
      {/* Desktop Sidebar - visible on screens 768px and above */}
      <div className="hidden z-100 md:flex h-screen bg-gradient-to-br from-emerald-950/50 to-black/10">
        <aside className="w-64 border-r border-emerald-500/10 flex flex-col">
          {/* Logo */}
          <div className="p-6 border-b border-emerald-500/10">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-lg flex items-center justify-center">
                <div className="w-3 h-3 border-2 border-white rounded-full border-t-transparent animate-spin-slow" />
              </div>
              <span className="text-xl font-bold text-white">Noor</span>
            </div>
          </div>

          {/* Menu */}
          <nav className="flex-1 p-4 space-y-1">
            {menuItems.map((item) => (
              <SidebarItem
                key={item.label}
                icon={item.icon}
                label={item.label}
                href={item.href}
                active={isActive(item.href)}
                onClick={handleNavigation}
              />
            ))}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-emerald-500/10">
            <p className="text-gray-600 text-xs text-center">Noor App v1.0</p>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Navigation - visible on screens below 768px */}
      <div className="md:hidden min-h-screen bg-black">
        {/* Main Content */}
        <main className="pb-20">
          {children}
        </main>

        {/* Bottom Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 z-1000 backdrop-blur-lg border-t border-emerald-500/20 py-2">
          <div className="flex justify-around items-center">
            {menuItems.slice(0, 5).map((item) => (
              <MobileNavItem
                key={item.label}
                icon={item.icon}
                label={item.label}
                href={item.href}
                active={isActive(item.href)}
                onClick={handleNavigation}
              />
            ))}
          </div>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;