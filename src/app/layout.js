'use client';
import Sidebar from '../components/dashboard/LeftSide';
import { usePathname } from 'next/navigation';

export default function RootLayout({ children }) {
  const pathname = usePathname();
  
  // ده بيحدد لو احنا في صفحة login أو signup
  // لاحظ: login دلوقتي في المسار '/' مش '/login'
  const isAuthPage = pathname === '/' || pathname === '/signup';

  return (
    <html lang="en">
      <body className="bg-[#0a0a0a]">
        {isAuthPage ? (
          // صفحة تسجيل الدخول أو انشاء حساب - من غير Sidebar
          <main className="min-h-screen">
            {children}
          </main>
        ) : (
          // باقي الصفحات - مع Sidebar
          <div className="flex">
            <Sidebar />
            <main className="flex-1 min-h-screen overflow-auto">
              {children}
            </main>
          </div>
        )}
      </body>
    </html>
  );
}