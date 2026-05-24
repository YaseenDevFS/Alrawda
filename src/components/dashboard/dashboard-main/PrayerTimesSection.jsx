'use client';
import React, { useEffect, useState } from 'react';
import { Clock, MapPin, Sun, Moon, Sunrise, Sunset, Coffee, AlertCircle, Sparkles } from 'lucide-react';

function PrayerTimesSection() {
  const [prayerTimes, setPrayerTimes] = useState({});
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [nextPrayer, setNextPrayer] = useState(null);
  const [currentPrayer, setCurrentPrayer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState("");
  const [animatedCards, setAnimatedCards] = useState({});

  const prayersList = [
    { name: "Fajr", arabicName: "الفجر", icon: Sunrise, color: "from-orange-400 to-amber-500" },
    { name: "Dhuhr", arabicName: "الظهر", icon: Sun, color: "from-yellow-400 to-orange-500" },
    { name: "Asr", arabicName: "العصر", icon: Coffee, color: "from-amber-400 to-yellow-500" },
    { name: "Maghrib", arabicName: "المغرب", icon: Sunset, color: "from-red-400 to-orange-500" },
    { name: "Isha", arabicName: "العشاء", icon: Moon, color: "from-indigo-400 to-purple-500" }
  ];

  const convertTimeToDate = (timeStr) => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    const now = new Date();
    const prayerTime = new Date();
    prayerTime.setHours(hours, minutes, 0, 0);
    return prayerTime;
  };

  const calculateTimeRemaining = (prayerTime) => {
    const now = new Date();
    const targetTime = convertTimeToDate(prayerTime);
    if (now > targetTime) return "Passed";
    const diff = targetTime - now;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    return hours > 0 ? `${hours}h ${minutes}m` : minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;
  };

  const determinePrayers = (timings) => {
    if (!timings?.Fajr) return;
    const prayersOrder = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
    const now = new Date();
    
    for (let i = 0; i < prayersOrder.length; i++) {
      if (now < convertTimeToDate(timings[prayersOrder[i]])) {
        setNextPrayer(prayersOrder[i]);
        setCurrentPrayer(i > 0 ? prayersOrder[i - 1] : null);
        setTimeRemaining(calculateTimeRemaining(timings[prayersOrder[i]]));
        return;
      }
    }
    setNextPrayer('Fajr');
    setCurrentPrayer('Isha');
    setTimeRemaining(calculateTimeRemaining(timings.Fajr));
  };

  useEffect(() => {
    if (nextPrayer && prayerTimes[nextPrayer]) {
      const interval = setInterval(() => {
        setTimeRemaining(calculateTimeRemaining(prayerTimes[nextPrayer]));
      }, 1000); // تحديث كل ثانية بدل دقيقة
      return () => clearInterval(interval);
    }
  }, [nextPrayer, prayerTimes]);

  useEffect(() => {
    // تفعيل الأنيميشن للبطاقات بشكل متتالي
    const timeouts = {};
    prayersList.forEach((prayer, index) => {
      timeouts[prayer.name] = setTimeout(() => {
        setAnimatedCards(prev => ({ ...prev, [prayer.name]: true }));
      }, index * 100);
    });
    return () => {
      Object.values(timeouts).forEach(timeout => clearTimeout(timeout));
    };
  }, []);

  useEffect(() => {
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude: lat, longitude: lon } = position.coords;
        try {
          const [prayerRes, locationRes] = await Promise.all([
            fetch(`https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lon}&method=5`),
            fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`)
          ]);
          
          const prayerData = await prayerRes.json();
          const timings = prayerData.data.timings;
          setPrayerTimes(timings);
          determinePrayers(timings);
          
          const locationData = await locationRes.json();
          setCity(locationData.city || locationData.locality || "Unknown");
          setCountry(locationData.countryName || "");
        } catch (err) {
          setError("Failed to fetch prayer times. Please try again.");
        } finally {
          setLoading(false);
        }
      },
      () => {
        setError("Unable to get your location. Please enable location services.");
        setLoading(false);
      }
    );
  }, []);

  const getPrayerCardClass = (prayerName) => {
    let baseClass = "relative group overflow-hidden bg-gradient-to-br from-black/60 via-emerald-950/20 to-black/60 backdrop-blur-md rounded-2xl p-4 flex items-center justify-between transition-all duration-500 border hover:scale-[1.02]";
    if (nextPrayer === prayerName) return `${baseClass} border-emerald-400/60 shadow-lg shadow-emerald-500/30 animate-card-glow`;
    if (currentPrayer === prayerName) return `${baseClass} border-emerald-500/40 shadow-md shadow-emerald-500/20`;
    return `${baseClass} border-emerald-500/20 hover:border-emerald-500/40 hover:shadow-lg hover:shadow-emerald-500/10`;
  };

  if (loading) return (
    <div className="px-5 py-6 animate-slide-up-fade">
      <div className="bg-gradient-to-br from-black/90 via-emerald-950/30 to-black/90 rounded-2xl p-6 border border-emerald-500/20">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-emerald-500/20 rounded w-1/4"></div>
          <div className="grid grid-cols-5 gap-4">
            {[1,2,3,4,5].map(i => (
              <div key={i} className="h-24 bg-emerald-500/10 rounded-xl animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  if (error) return (
    <div className="px-4 py-6 animate-slide-up-fade">
      <div className="bg-gradient-to-br from-red-950/30 to-black/90 rounded-2xl p-6 border border-red-500/30">
        <div className="flex items-center gap-3">
          <AlertCircle className="w-6 h-6 text-red-400 animate-pulse" />
          <div>
            <p className="text-red-400 font-semibold">Error</p>
            <p className="text-gray-400 text-sm">{error}</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="py-6 px-1">
      <div className="mb-6 animate-slide-up-fade">
        <div className="flex items-center justify-between flex-wrap gap-3 mb-2">
          <div className="animate-slide-left-fade">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-1 h-8 bg-gradient-to-b from-emerald-400 to-emerald-600 rounded-full"></div>
                <h2 className="text-emerald-400 text-xl lg:text-2xl font-semibold bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">
                  Prayer Times
                </h2>
              </div>
            </div>
            <p className="text-gray-400 text-sm">Manage your daily prayer schedule</p>
          </div>
          <div className="flex items-center gap-2 text-gray-400 text-sm bg-emerald-500/10 backdrop-blur-sm px-3 py-2 rounded-full animate-slide-left-fade delay-200">
            <MapPin className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span>{city}{country && `, ${country}`}</span>
          </div>
        </div>

        {nextPrayer && prayerTimes[nextPrayer] && (
          <div className="mt-4 p-4 bg-gradient-to-r from-emerald-600/20 via-emerald-500/10 to-emerald-600/20 rounded-xl border border-emerald-500/30 animate-slide-up-fade delay-300 time-progress">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400/30 to-emerald-600/30 flex items-center justify-center animate-float">
                  <Clock className="w-6 h-6 text-emerald-400 animate-pulse" />
                </div>
                <div>
                  <p className="text-gray-400 text-xs flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-emerald-400" />
                    Next Prayer
                  </p>
                  <p className="text-emerald-400 font-bold text-xl">{nextPrayer}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-gray-400 text-xs">Time Remaining</p>
                <p className="text-white font-bold text-3xl pulse-text">{timeRemaining}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4">
        {prayersList.map((prayer, idx) => {
          const Icon = prayer.icon;
          const isAnimated = animatedCards[prayer.name];
          return (
            <div 
              key={prayer.name} 
              className={`${getPrayerCardClass(prayer.name)} ${isAnimated ? 'animate-slide-up-fade' : 'opacity-0'}`}
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              {/* خلفية متحركة عند hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              
              <div className="relative z-10 flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <div className={`text-emerald-400 ${nextPrayer === prayer.name ? 'animate-float' : ''}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm md:text-base font-semibold text-gray-200">{prayer.name}</h3>
                    <p className="text-xs text-gray-500 hidden sm:block">{prayer.arabicName}</p>
                  </div>
                </div>
                
                <p className="text-lg md:text-xl font-bold text-white bg-gradient-to-r from-white to-gray-300 bg-clip-text">
                  {prayerTimes[prayer.name] || "--:--"}
                </p>
                
                <div className="flex gap-1 mt-2">
                  {nextPrayer === prayer.name && (
                    <span className="text-xs bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-2 py-0.5 rounded-full animate-scale-pulse">
                      Next
                    </span>
                  )}
                  {currentPrayer === prayer.name && (
                    <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/30 backdrop-blur-sm">
                      Current
                    </span>
                  )}
                </div>
              </div>
              
              <div className="relative z-10 opacity-50 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110">
                <div className={`w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400/10 to-emerald-600/10 flex items-center justify-center ${nextPrayer === prayer.name ? 'animate-rotate-clockwise' : ''}`}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={`transition-all duration-300 ${nextPrayer === prayer.name ? 'text-emerald-400' : currentPrayer === prayer.name ? 'text-emerald-300' : 'text-gray-500'}`}>
                    <circle cx="12" cy="12" r="5" fill="currentColor" className="opacity-90" />
                    <path d="M12 3V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="opacity-70" />
                    <path d="M12 19V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="opacity-70" />
                  </svg>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 text-center animate-slide-up-fade delay-500">
        <p className="text-gray-500 text-xs flex items-center justify-center gap-2">
          <Clock className="w-3 h-3 animate-pulse" />
          Prayer times are based on your current location
          <button 
            onClick={() => window.location.reload()} 
            className="text-emerald-400 hover:text-emerald-300 transition-all duration-300 text-xs underline hover:scale-105"
          >
            Refresh
          </button>
        </p>
      </div>
    </div>
  );
}

export default PrayerTimesSection;