'use client';
import React, { useEffect, useState } from 'react';
import { Clock, MapPin, Sun, Moon, Sunrise, Sunset, Coffee, AlertCircle } from 'lucide-react';

function PrayerTimesSection() {
  const [prayerTimes, setPrayerTimes] = useState({});
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [nextPrayer, setNextPrayer] = useState(null);
  const [currentPrayer, setCurrentPrayer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState("");

  const prayersList = [
    { name: "Fajr", arabicName: "الفجر", icon: Sunrise },
    { name: "Dhuhr", arabicName: "الظهر", icon: Sun },
    { name: "Asr", arabicName: "العصر", icon: Coffee },
    { name: "Maghrib", arabicName: "المغرب", icon: Sunset },
    { name: "Isha", arabicName: "العشاء", icon: Moon }
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
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
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
      }, 60000);
      return () => clearInterval(interval);
    }
  }, [nextPrayer, prayerTimes]);

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
    let baseClass = "relative group overflow-hidden bg-gradient-to-br from-black/90 via-emerald-950/30 to-black/90 backdrop-blur-sm rounded-2xl p-4 flex items-center justify-between transition-all duration-500 border";
    if (nextPrayer === prayerName) return `${baseClass} border-emerald-400/60 hover:border-emerald-400/80 shadow-lg shadow-emerald-500/20 hover:shadow-xl hover:shadow-emerald-500/30`;
    if (currentPrayer === prayerName) return `${baseClass} border-emerald-500/40 hover:border-emerald-400/60 shadow-md shadow-emerald-500/10`;
    return `${baseClass} border-emerald-500/20 hover:border-emerald-500/40`;
  };

  if (loading) return (
    <div className="px-4 py-6">
      <div className="bg-gradient-to-br from-black/90 via-emerald-950/30 to-black/90 rounded-2xl p-6 border border-emerald-500/20">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-emerald-500/20 rounded w-1/4"></div>
          <div className="grid grid-cols-5 gap-4">
            {[1,2,3,4,5].map(i => <div key={i} className="h-24 bg-emerald-500/10 rounded-xl"></div>)}
          </div>
        </div>
      </div>
    </div>
  );

  if (error) return (
    <div className="px-4 py-6">
      <div className="bg-gradient-to-br from-red-950/30 to-black/90 rounded-2xl p-6 border border-red-500/30">
        <div className="flex items-center gap-3">
          <AlertCircle className="w-6 h-6 text-red-400" />
          <div>
            <p className="text-red-400 font-semibold">Error</p>
            <p className="text-gray-400 text-sm">{error}</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="py-6">
      <div className="mb-6">
        <div className="flex items-center justify-between flex-wrap gap-3 mb-2">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-emerald-400 border-emerald-500 border-l-4 pl-2 text-xl lg:text-2xl font-semibold">Prayer Times</h2>
            </div>
            <p className="text-gray-400 text-sm mt-2">Manage your daily prayer schedule</p>
          </div>
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <MapPin className="w-4 h-4 text-emerald-400" />
            <span>{city}{country && `, ${country}`}</span>
          </div>
        </div>

        {nextPrayer && prayerTimes[nextPrayer] && (
          <div className="mt-4 p-4 bg-gradient-to-r from-emerald-600/20 via-emerald-500/10 to-emerald-600/20 rounded-xl border border-emerald-500/30">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400/30 to-emerald-600/30 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Next Prayer</p>
                  <p className="text-emerald-400 font-semibold text-lg">{nextPrayer}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-gray-400 text-xs">Time Remaining</p>
                <p className="text-white font-bold text-2xl">{timeRemaining}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4">
        {prayersList.map((prayer) => {
          const Icon = prayer.icon;
          return (
            <div key={prayer.name} className={getPrayerCardClass(prayer.name)}>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/5 to-emerald-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="relative z-10 flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <div className="text-emerald-400"><Icon className="w-5 h-5" /></div>
                  <div>
                    <h3 className="text-sm md:text-base font-semibold text-gray-200">{prayer.name}</h3>
                    <p className="text-xs text-gray-500 hidden sm:block">{prayer.arabicName}</p>
                  </div>
                </div>
                <p className="text-lg md:text-xl font-bold text-white">{prayerTimes[prayer.name] || "--:--"}</p>
                <div className="flex gap-1 mt-2">
                  {nextPrayer === prayer.name && <span className="text-xs bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-2 py-0.5 rounded-full">Next</span>}
                  {currentPrayer === prayer.name && <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/30">Current</span>}
                </div>
              </div>
              <div className="relative z-10 opacity-50 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400/10 to-emerald-600/10 flex items-center justify-center">
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

      <div className="mt-6 text-center">
        <p className="text-gray-500 text-xs flex items-center justify-center gap-2">
          <Clock className="w-3 h-3" />
          Prayer times are based on your current location
          <button onClick={() => window.location.reload()} className="text-emerald-400 hover:text-emerald-300 transition-colors text-xs underline">Refresh</button>
        </p>
      </div>
    </div>
  );
}

export default PrayerTimesSection;