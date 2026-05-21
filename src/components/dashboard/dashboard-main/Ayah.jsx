'use client';
import React, { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';
import '../../../app/globals.css';

function Ayah() {
  const [ayahData, setAyahData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDailyAyah = async () => {
    try {
      setLoading(true);
      const randomAyahNumber = Math.floor(Math.random() * 6236) + 1;
      const response = await fetch(`https://api.alquran.cloud/v1/ayah/${randomAyahNumber}/editions/quran-uthmani,en.pickthall`);
      const data = await response.json();
      
      if (data.code === 200) {
        setAyahData({
          arabic: data.data[0].text,
          translation: data.data[1].text,
          surah: data.data[0].surah.name,
          ayahNumber: data.data[0].numberInSurah
        });
      }
    } catch (err) {
      setAyahData({
        arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
        translation: "In the name of Allah, the Most Gracious, the Most Merciful",
        surah: "Al-Fatihah",
        ayahNumber: 1
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDailyAyah();
  }, []);

  if (loading) {
    return (
      <div className="px-4 py-6">
        <div className="bg-gradient-to-br from-black/90 via-emerald-950/50 to-black/90 rounded-2xl p-6 border border-emerald-500/20 backdrop-blur-sm">
          <div className="animate-pulse space-y-4">
            <div className="h-6 bg-emerald-500/20 rounded w-1/4"></div>
            <div className="h-20 bg-emerald-500/20 rounded"></div>
            <div className="h-16 bg-emerald-500/20 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-1">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-emerald-400 border-emerald-500 border-l-4 pl-2 text-xl lg:text-2xl font-semibold">Read Quraan</h2>
          <button className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 text-emerald-300 text-sm font-medium hover:from-emerald-500/30 hover:to-emerald-600/30 transition-all duration-300 border border-emerald-500/30">
            <Sparkles className="w-4 h-4 inline mr-1" /> To Quraan
          </button>
        </div>
        <p className="text-gray-400 text-sm mt-2">Continue your journey through the Holy Quran</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Stats Card */}
        <div className="col-span-1">
          <div className="relative group overflow-hidden bg-gradient-to-br from-black/90 via-emerald-950/30 to-black/90 backdrop-blur-sm rounded-2xl p-6 border border-emerald-500/30 hover:border-emerald-400/50 transition-all duration-500 h-full shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/5 to-emerald-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/0 via-emerald-500/20 to-emerald-500/0 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400/30 to-emerald-600/30 flex items-center justify-center border border-emerald-500/30">
                  <span className="text-lg">⭐</span>
                </div>
                <div>
                  <h3 className="text-emerald-300 font-semibold text-sm">Quick Stats</h3>
                  <p className="text-gray-500 text-xs">Reading Progress</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Today's Reading</span>
                  <span className="text-emerald-400 font-semibold">0/30 Juz</span>
                </div>
                <div className="w-full bg-emerald-500/10 rounded-full h-2 overflow-hidden">
                  <div className="bg-gradient-to-r from-emerald-400 to-emerald-600 h-2 rounded-full w-0 relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                  </div>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-gray-400 text-sm">Last Read</span>
                  <span className="text-gray-300 text-sm">Al-Fatihah</span>
                </div>
                <button className="w-full mt-3 py-2 rounded-lg bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 hover:from-emerald-500/30 hover:to-emerald-600/30 text-emerald-300 text-sm font-medium transition-all duration-300 border border-emerald-500/30 hover:border-emerald-400/50">
                  Continue Reading
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Daily Ayah Card */}
        <div className="col-span-1 lg:col-span-2">
          <div className="group relative overflow-hidden bg-gradient-to-br from-black/90 via-emerald-950/40 to-black/90 backdrop-blur-sm rounded-2xl border border-emerald-500/30 hover:border-emerald-400/50 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-500/10 h-full">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/10 to-emerald-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-emerald-500/10 to-transparent rounded-tl-2xl"></div>
            <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-emerald-500/10 to-transparent rounded-br-2xl"></div>
            
            <div className="relative p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400/30 to-emerald-600/30 flex items-center justify-center border border-emerald-500/30">
                    <span className="text-lg">📖</span>
                  </div>
                  <div>
                    <h3 className="text-emerald-300 font-semibold text-xs">Daily Ayah</h3>
                    <p className="text-gray-400 text-xs">Verse of the Day</p>
                  </div>
                </div>
                <button onClick={fetchDailyAyah} className="text-emerald-400/70 hover:text-emerald-300 transition-all duration-300 text-xs flex items-center gap-1 hover:scale-105">
                  <span className="text-sm">🔄</span>
                  <span className="hidden sm:inline">Refresh</span>
                </button>
              </div>

              <div className="mb-4 text-right">
                <p className="text-base md:text-lg font-arabic leading-loose text-white/90 group-hover:text-white transition-colors duration-300">
                  {ayahData?.arabic}
                </p>
              </div>

              <div className="mb-4">
                <p className="text-gray-300 text-xs italic leading-relaxed">
                  "{ayahData?.translation}"
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-emerald-500/20">
                <div className="flex items-center gap-1 group-hover:gap-2 transition-all duration-300">
                  <span className="text-emerald-400 text-xs">📍</span>
                  <span className="text-gray-300 text-xs font-medium">{ayahData?.surah}</span>
                </div>
                <div className="flex items-center gap-1 group-hover:gap-2 transition-all duration-300">
                  <span className="text-emerald-400 text-xs">🔢</span>
                  <span className="text-gray-300 text-xs">Ayah {ayahData?.ayahNumber}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ayah;