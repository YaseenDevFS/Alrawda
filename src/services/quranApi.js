// frontend/src/services/quranApi.js
const QURAN_API_BASE = 'https://api.alquran.cloud/v1';

// جلب جميع سور القرآن
export const fetchAllSurahs = async () => {
  try {
    const response = await fetch(`${QURAN_API_BASE}/surah`);
    const data = await response.json();
    if (data.code === 200) {
      return data.data;
    }
    throw new Error('Failed to fetch surahs');
  } catch (error) {
    console.error('Error fetching surahs:', error);
    return getLocalSurahs();
  }
};

// جلب سورة محددة
export const fetchSurahById = async (surahId, edition = 'ar.alafasy') => {
  try {
    const response = await fetch(`${QURAN_API_BASE}/surah/${surahId}/${edition}`);
    const data = await response.json();
    if (data.code === 200) {
      return data.data;
    }
    throw new Error('Failed to fetch surah');
  } catch (error) {
    console.error(`Error fetching surah ${surahId}:`, error);
    return null;
  }
};

// جلب آية محددة
export const fetchAyahById = async (surahId, ayahNumber, edition = 'ar.alafasy') => {
  try {
    const response = await fetch(`${QURAN_API_BASE}/ayah/${surahId}:${ayahNumber}/${edition}`);
    const data = await response.json();
    if (data.code === 200) {
      return data.data;
    }
    throw new Error('Failed to fetch ayah');
  } catch (error) {
    console.error(`Error fetching ayah ${surahId}:${ayahNumber}:`, error);
    return null;
  }
};

// جلب التفسير (من API آخر)
export const fetchTafsir = async (surahId, ayahNumber) => {
  try {
    // استخدام API التفسير من quran-tafsir
    const response = await fetch(`https://quran-tafsir-api.vercel.app/api/tafsir/${surahId}/${ayahNumber}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching tafsir:', error);
    return null;
  }
};

// بيانات محلية احتياطية للسور
const getLocalSurahs = () => {
  return [
    { number: 1, name: "الفاتحة", englishName: "Al-Fatiha", englishNameTranslation: "The Opener", numberOfAyahs: 7, revelationType: "Meccan" },
    { number: 2, name: "البقرة", englishName: "Al-Baqarah", englishNameTranslation: "The Cow", numberOfAyahs: 286, revelationType: "Medinan" },
    { number: 3, name: "آل عمران", englishName: "Aal-Imran", englishNameTranslation: "The Family of Imran", numberOfAyahs: 200, revelationType: "Medinan" },
    { number: 4, name: "النساء", englishName: "An-Nisa", englishNameTranslation: "The Women", numberOfAyahs: 176, revelationType: "Medinan" },
    { number: 5, name: "المائدة", englishName: "Al-Ma'idah", englishNameTranslation: "The Table Spread", numberOfAyahs: 120, revelationType: "Medinan" },
    { number: 6, name: "الأنعام", englishName: "Al-An'am", englishNameTranslation: "The Cattle", numberOfAyahs: 165, revelationType: "Meccan" },
    { number: 7, name: "الأعراف", englishName: "Al-A'raf", englishNameTranslation: "The Heights", numberOfAyahs: 206, revelationType: "Meccan" },
    { number: 8, name: "الأنفال", englishName: "Al-Anfal", englishNameTranslation: "The Spoils of War", numberOfAyahs: 75, revelationType: "Medinan" },
    { number: 9, name: "التوبة", englishName: "At-Tawbah", englishNameTranslation: "The Repentance", numberOfAyahs: 129, revelationType: "Medinan" },
    { number: 10, name: "يونس", englishName: "Yunus", englishNameTranslation: "Jonah", numberOfAyahs: 109, revelationType: "Meccan" },
    // ... باقي السور
  ];
};