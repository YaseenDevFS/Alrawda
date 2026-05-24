// frontend/src/app/quran/page.jsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Volume2,
  Info,
  X,
  Star,
  ArrowUp,
  Plus,
  Minus,
  Grid3x3,
  List,
  Clock,
  Play,
  Pause
} from 'lucide-react';
import { fetchAllSurahs, fetchSurahById } from '@/services/quranApi';

function QuranPage() {
  const [surahs, setSurahs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSurah, setSelectedSurah] = useState(null);
  const [ayahs, setAyahs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [bookmarks, setBookmarks] = useState([]);
  const [recentSurahs, setRecentSurahs] = useState([]);
  const [fontSize, setFontSize] = useState(20);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [playingAyah, setPlayingAyah] = useState(null);
  const [showSurahSelector, setShowSurahSelector] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  
  const contentRef = useRef(null);
  const audioRef = useRef(null);

  // Load surahs
  useEffect(() => {
    loadSurahs();
    loadBookmarks();
    loadRecentSurahs();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (contentRef.current) {
        setShowScrollTop(contentRef.current.scrollTop > 300);
      }
    };
    
    const currentRef = contentRef.current;
    if (currentRef) {
      currentRef.addEventListener('scroll', handleScroll);
      return () => currentRef.removeEventListener('scroll', handleScroll);
    }
  }, [selectedSurah]);

  const scrollToTop = () => {
    if (contentRef.current) {
      contentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const loadSurahs = async () => {
    setLoading(true);
    const data = await fetchAllSurahs();
    setSurahs(data);
    setLoading(false);
  };

  const loadSurah = async (surahId, surahName) => {
    setLoading(true);
    const data = await fetchSurahById(surahId);
    if (data) {
      setSelectedSurah({
        id: data.number,
        name: data.name,
        englishName: data.englishName,
        revelationType: data.revelationType === 'Meccan' ? 'Meccan' : 'Medinan',
        numberOfAyahs: data.numberOfAyahs
      });
      setAyahs(data.ayahs);
      saveToRecent(surahId, surahName);
      setShowSurahSelector(false);
    }
    setLoading(false);
  };

  const saveToRecent = (surahId, surahName) => {
    const recent = JSON.parse(localStorage.getItem('recentSurahs') || '[]');
    const newRecent = [{ id: surahId, name: surahName, timestamp: Date.now() }, ...recent.filter(s => s.id !== surahId)].slice(0, 10);
    localStorage.setItem('recentSurahs', JSON.stringify(newRecent));
    setRecentSurahs(newRecent);
  };

  const loadBookmarks = () => {
    const saved = JSON.parse(localStorage.getItem('quranBookmarks') || '[]');
    setBookmarks(saved);
  };

  const loadRecentSurahs = () => {
    const recent = JSON.parse(localStorage.getItem('recentSurahs') || '[]');
    setRecentSurahs(recent);
  };

  const addBookmark = (surahId, ayahNumber) => {
    const newBookmark = { surahId, ayahNumber, timestamp: Date.now() };
    const updated = [...bookmarks, newBookmark];
    setBookmarks(updated);
    localStorage.setItem('quranBookmarks', JSON.stringify(updated));
  };

  const removeBookmark = (surahId, ayahNumber) => {
    const updated = bookmarks.filter(b => !(b.surahId === surahId && b.ayahNumber === ayahNumber));
    setBookmarks(updated);
    localStorage.setItem('quranBookmarks', JSON.stringify(updated));
  };

  const isBookmarked = (surahId, ayahNumber) => {
    return bookmarks.some(b => b.surahId === surahId && b.ayahNumber === ayahNumber);
  };

  const playRecitation = (surahId, ayahNumber) => {
    if (playingAyah === ayahNumber) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      setPlayingAyah(null);
      return;
    }
    
    if (audioRef.current) {
      audioRef.current.pause();
    }
    
    const audioUrl = `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${surahId}_${ayahNumber}.mp3`;
    const audio = new Audio(audioUrl);
    audioRef.current = audio;
    setPlayingAyah(ayahNumber);
    audio.play();
    audio.onended = () => setPlayingAyah(null);
  };

  const increaseFontSize = () => {
    if (fontSize < 36) setFontSize(fontSize + 2);
  };

  const decreaseFontSize = () => {
    if (fontSize > 12) setFontSize(fontSize - 2);
  };

  const filteredSurahs = surahs.filter(surah =>
    surah.name.includes(searchTerm) ||
    surah.englishName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Render continuous ayahs
  const renderContinuousAyahs = () => {
    return ayahs.map((ayah, index) => (
      <span key={ayah.number} className="quran-ayah-group">
        <span className="ayah-text">{ayah.text}</span>
        <span 
          className={`ayah-number-btn ${playingAyah === ayah.numberInSurah ? 'playing' : ''}`}
          onClick={() => playRecitation(selectedSurah.id, ayah.numberInSurah)}
          title={playingAyah === ayah.numberInSurah ? 'Stop' : 'Listen'}
        >
          {playingAyah === ayah.numberInSurah ? (
            <Pause className="w-3 h-3" />
          ) : (
            <span>{ayah.numberInSurah}</span>
          )}
        </span>
        <span className="mx-0.5"></span>
      </span>
    ));
  };

  return (
    <div className="h-full bg-gradient-to-b from-[#051410] to-[#0a1a15] overflow-hidden flex flex-col">
      
      {/* Header with Surah Selector Button */}
      <div className="sticky top-0 z-20 bg-[#051410]/95 backdrop-blur-md border-b border-emerald-500/20 px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Title */}
          <h1 className="text-white font-semibold text-lg">
            <span className="text-emerald-400">Holy</span> Quran
          </h1>

          {/* Surah Selector Button */}
          <button
            onClick={() => setShowSurahSelector(!showSurahSelector)}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 border border-emerald-500/30 text-white font-medium text-sm flex items-center gap-2 hover:shadow-lg hover:shadow-emerald-500/10 transition-all"
          >
            {selectedSurah ? (
              <>
                <BookOpen className="w-4 h-4 text-emerald-400" />
                <span>{selectedSurah.englishName}</span>
                <ChevronLeft className="w-4 h-4" />
              </>
            ) : (
              <>
                <Grid3x3 className="w-4 h-4" />
                <span>Select Surah</span>
              </>
            )}
          </button>

          {/* Font Size Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={decreaseFontSize}
              className="p-2 rounded-lg bg-black/50 text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
              title="Decrease font size"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="text-gray-400 text-xs hidden sm:block">{fontSize}px</span>
            <button
              onClick={increaseFontSize}
              className="p-2 rounded-lg bg-black/50 text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
              title="Increase font size"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Surah Selector Modal */}
      {showSurahSelector && (
        <div className="fixed inset-0 z-30 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-gradient-to-br from-[#0a1a15] md:ml-60 to-[#051410] rounded-2xl border border-emerald-500/30 w-full max-w-4xl max-h-[80vh] overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="p-4 border-b border-emerald-500/20 flex justify-between items-center">
              <h2 className="text-white font-semibold text-lg">Select a Surah</h2>
              <button
                onClick={() => setShowSurahSelector(false)}
                className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search Bar */}
            <div className="p-4 border-b border-emerald-500/20">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search for a surah..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 pl-10 rounded-lg bg-black/50 border border-emerald-500/30 text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-emerald-400"
                />
              </div>
            </div>

            {/* Recent Surahs */}
            {recentSurahs.length > 0 && searchTerm === '' && (
              <div className="px-4 py-3 bg-emerald-500/5">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400 text-xs font-semibold">Recently Read</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {recentSurahs.slice(0, 5).map((recent) => {
                    const surah = surahs.find(s => s.number === recent.id);
                    if (!surah) return null;
                    return (
                      <button
                        key={recent.id}
                        onClick={() => loadSurah(recent.id, recent.name)}
                        className="px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 text-sm hover:bg-emerald-500/30 transition-colors"
                      >
                        {surah.englishName}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Surah Grid */}
            <div className="p-4 overflow-y-auto max-h-[50vh]">
              {loading && !surahs.length ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="w-8 h-8 text-emerald-400 animate-spin" />
                </div>
              ) : (
                <div className={`grid ${viewMode === 'grid' ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3' : 'space-y-2'}`}>
                  {filteredSurahs.map((surah) => (
                    <button
                      key={surah.number}
                      onClick={() => loadSurah(surah.number, surah.name)}
                      className={`group p-3 rounded-xl transition-all duration-300 text-left ${
                        viewMode === 'grid'
                          ? 'bg-gradient-to-br from-black/50 to-black/30 border border-emerald-500/20 hover:border-emerald-400/50 hover:shadow-lg hover:shadow-emerald-500/10'
                          : 'flex items-center justify-between px-4 py-3 hover:bg-white/5 border-b border-emerald-500/10'
                      }`}
                    >
                      <div className={viewMode === 'grid' ? 'text-center' : 'flex-1'}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-emerald-400 text-xs font-bold">{surah.number}</span>
                          {viewMode === 'grid' && (
                            <span className="text-gray-500 text-[10px]">{surah.revelationType === 'Meccan' ? 'Meccan' : 'Medinan'}</span>
                          )}
                        </div>
                        <h3 className="text-white font-semibold text-base mb-1">{surah.englishName}</h3>
                        <p className="text-gray-500 text-[10px]">{surah.name}</p>
                        <div className="text-gray-600 text-[9px] mt-1">{surah.numberOfAyahs} verses</div>
                      </div>
                      {viewMode === 'list' && (
                        <div className="text-left">
                          <div className="text-gray-500 text-[10px]">{surah.name}</div>
                          <div className="text-gray-600 text-[9px]">{surah.numberOfAyahs} verses</div>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-emerald-500/20 text-center">
              <p className="text-gray-600 text-[10px]">Total Surahs: {surahs.length}</p>
            </div>
          </div>
        </div>
      )}

      {/* Main Quran Content */}
      <div ref={contentRef} className="flex-1 overflow-y-auto relative">
        {!selectedSurah ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-4">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 flex items-center justify-center mb-6 animate-pulse">
              <BookOpen className="w-16 h-16 text-emerald-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">The Holy Quran</h2>
            <p className="text-gray-400 max-w-md mb-6">
              Select a surah from above to start reading and listening
            </p>
            <button
              onClick={() => setShowSurahSelector(true)}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-medium flex items-center gap-2 hover:shadow-lg hover:shadow-emerald-500/25 transition-all"
            >
              <Grid3x3 className="w-4 h-4" />
              Browse Surahs
            </button>
          </div>
        ) : (
          <>
            {/* Surah Header */}
            <div className="sticky top-0 z-10 bg-gradient-to-b from-[#051410] to-[#051410]/95 backdrop-blur-md border-b border-emerald-500/20">
              <div className="text-center py-6 px-4">
                <div className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs mb-2">
                  {selectedSurah.revelationType} • {selectedSurah.numberOfAyahs} Verses
                </div>
                <h1 className="text-3xl font-bold text-white mb-1">{selectedSurah.englishName}</h1>
                <p className="text-gray-400 text-sm">{selectedSurah.name}</p>
              </div>
            </div>

            {/* Quran Text */}
            <div className="max-w-4xl mx-auto px-6 py-8">
              {selectedSurah.id !== 9 && (
                <div className="text-center mb-8 pb-6 border-b border-emerald-500/20">
                  <p 
                    className="text-emerald-400 font-arabic leading-loose"
                    style={{ fontSize: `${fontSize + 4}px`, fontFamily: "'UthmanicHafs', 'Amiri', 'Scheherazade', serif" }}
                  >
                    بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                  </p>
                  <span className="text-gray-500 text-xs">In the name of Allah, the Most Gracious, the Most Merciful</span>
                </div>
              )}

              <div 
                className="quran-text text-white leading-loose text-right"
                style={{ 
                  fontSize: `${fontSize}px`, 
                  lineHeight: '2.2',
                  fontFamily: "'UthmanicHafs', 'Amiri', 'Scheherazade', 'Noto Naskh Arabic', serif"
                }}
              >
                {renderContinuousAyahs()}
              </div>
            </div>
          </>
        )}
        
        {/* Scroll to Top Button */}
        {showScrollTop && selectedSurah && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 p-3 rounded-full bg-emerald-500 text-white shadow-lg hover:bg-emerald-600 transition-all duration-300 z-20"
            title="Scroll to top"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        )}
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        
        .quran-text {
          text-align: right;
          direction: rtl;
        }
        
        .quran-ayah-group {
          display: inline;
        }
        
        .ayah-text {
          display: inline;
        }
        
        .ayah-number-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 1.8em;
          height: 1.8em;
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(5, 150, 105, 0.25));
          border-radius: 50%;
          font-size: 0.7em;
          font-weight: bold;
          color: #10b981;
          transition: all 0.2s ease;
          cursor: pointer;
          margin: 0 2px;
          vertical-align: middle;
          position: relative;
        }
        
        .ayah-number-btn:hover {
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.3), rgba(5, 150, 105, 0.4));
          transform: scale(1.1);
          color: #34d399;
        }
        
        .ayah-number-btn.playing {
          background: linear-gradient(135deg, #10b981, #059669);
          color: white;
          animation: pulse 1s infinite;
        }
        
        @keyframes pulse {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4);
          }
          50% {
            box-shadow: 0 0 0 8px rgba(16, 185, 129, 0);
          }
        }
        
        ::-webkit-scrollbar {
          width: 6px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.3);
          border-radius: 10px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: rgba(16, 185, 129, 0.3);
          border-radius: 10px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(16, 185, 129, 0.5);
        }
      `}</style>
    </div>
  );
}

export default QuranPage;