// frontend/src/app/adhkar/page.jsx
'use client';

import React, { useState, useEffect } from 'react';
import { 
  Sun, Moon, Bed, Home, ChevronLeft, 
  RefreshCw, BookOpen, Heart, Award, Clock, 
  CheckCircle, Circle, Star, TrendingUp, Users,
  Search, Filter, X, Volume2, Share2, Bookmark,
  Check, Sparkles, Play, Layers, Calendar, AlarmClock,
  Utensils, Car, MapPin, ShoppingBag, Briefcase, Coffee
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import TopBar from '@/components/dashboard/TopBar';
import Navigation from '@/components/Navigation';

function AdhkarPage() {
  const router = useRouter();
  
  const [screen, setScreen] = useState('selection');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [adhkar, setAdhkar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [counts, setCounts] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [showFavorites, setShowFavorites] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [viewMode, setViewMode] = useState('grid');

  useEffect(() => {
    const data = getExpandedMockData();
    setAdhkar(data);
    initializeCounts(data);
    setLoading(false);
  }, []);

  const initializeCounts = (data) => {
    const initialCounts = {};
    data.forEach(category => {
      const items = category.items || [];
      items.forEach(item => {
        initialCounts[item.id] = 0;
      });
    });
    setCounts(initialCounts);
  };

  const getExpandedMockData = () => {
    return [
      {
        id: 1,
        name: "Morning Adhkar",
        category: "morning",
        icon: "🌅",
        color: "from-amber-500/20 to-orange-600/20",
        items: [
          { id: 1, text: "أَعُوذُ بِاللهِ مِنْ الشَّيْطَانِ الرَّجِيمِ\nاللّهُ لاَ إِلَـهَ إِلاَّ هُوَ الْحَيُّ الْقَيُّومُ لاَ تَأْخُذُهُ سِنَةٌ وَلاَ نَوْمٌ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الأَرْضِ مَن ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلاَّ بِإِذْنِهِ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ وَلاَ يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلاَّ بِمَا شَاء وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالأَرْضَ وَلاَ يَؤُودُهُ حِفْظُهُمَا وَهُوَ الْعَلِيُّ الْعَظِيمُ", count: 1, reference: "Ayatul Kursi - Al-Baqarah 255" },
          { id: 2, text: "بِسْمِ اللهِ الرَّحْمنِ الرَّحِيم\nقُلْ هُوَ ٱللَّهُ أَحَدٌ، ٱللَّهُ ٱلصَّمَدُ، لَمْ يَلِدْ وَلَمْ يُولَدْ، وَلَمْ يَكُن لَّهُۥ كُفُوًا أَحَدٌۢ", count: 3, reference: "Surah Al-Ikhlas" },
          { id: 3, text: "بِسْمِ اللهِ الرَّحْمنِ الرَّحِيم\nقُلْ أَعُوذُ بِرَبِّ ٱلْفَلَقِ، مِن شَرِّ مَا خَلَقَ، وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ، وَمِن شَرِّ ٱلنَّفَّٰثَٰتِ فِى ٱلْعُقَدِ، وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ", count: 3, reference: "Surah Al-Falaq" },
          { id: 4, text: "بِسْمِ اللهِ الرَّحْمنِ الرَّحِيم\nقُلْ أَعُوذُ بِرَبِّ ٱلنَّاسِ، مَلِكِ ٱلنَّاسِ، إِلَٰهِ ٱلنَّاسِ، مِن شَرِّ ٱلْوَسْوَاسِ ٱلْخَنَّاسِ، ٱلَّذِى يُوَسْوِسُ فِى صُدُورِ ٱلنَّاسِ، مِنَ ٱلْجِنَّةِ وَٱلنَّاسِ", count: 3, reference: "Surah An-Nas" },
          { id: 5, text: "أَصْـبَحْنا وَأَصْـبَحَ المُـلْكُ لله وَالحَمدُ لله ، لا إلهَ إلاّ اللّهُ وَحدَهُ لا شَريكَ لهُ، لهُ المُـلكُ ولهُ الحَمْـد، وهُوَ على كلّ شَيءٍ قدير ، رَبِّ أسْـأَلُـكَ خَـيرَ ما في هـذا اليوم وَخَـيرَ ما بَعْـدَه ، وَأَعـوذُ بِكَ مِنْ شَـرِّ ما في هـذا اليوم وَشَرِّ ما بَعْـدَه، رَبِّ أَعـوذُبِكَ مِنَ الْكَسَـلِ وَسـوءِ الْكِـبَر ، رَبِّ أَعـوذُ بِكَ مِنْ عَـذابٍ في النّـارِ وَعَـذابٍ في القَـبْر", count: 1, reference: "Morning Dhikr" },
          { id: 6, text: "اللّهـمَّ أَنْتَ رَبِّـي لا إلهَ إلاّ أَنْتَ ، خَلَقْتَنـي وَأَنا عَبْـدُك ، وَأَنا عَلـى عَهْـدِكَ وَوَعْـدِكَ ما اسْتَـطَعْـت ، أَعـوذُبِكَ مِنْ شَـرِّ ما صَنَـعْت ، أَبـوءُ لَـكَ بِنِعْـمَتِـكَ عَلَـيَّ وَأَبـوءُ بِذَنْـبي فَاغْفـِرْ لي فَإِنَّـهُ لا يَغْـفِرُ الذُّنـوبَ إِلاّ أَنْتَ", count: 1, reference: "Sayyidul Istighfar" },
          { id: 7, text: "رَضيـتُ بِاللهِ رَبَّـاً وَبِالإسْلامِ ديـناً وَبِمُحَـمَّدٍ صلى الله عليه وسلم نَبِيّـاً", count: 3, reference: "Morning Dhikr" },
          { id: 8, text: "اللّهُـمَّ إِنِّـي أَصْبَـحْتُ أُشْـهِدُك ، وَأُشْـهِدُ حَمَلَـةَ عَـرْشِـك ، وَمَلَائِكَتَكَ ، وَجَمـيعَ خَلْـقِك ، أَنَّـكَ أَنْـتَ اللهُ لا إلهَ إلاّ أَنْـتَ وَحْـدَكَ لا شَريكَ لَـك ، وَأَنَّ مُحَمّـداً عَبْـدُكَ وَرَسـولُـك", count: 4, reference: "Morning Dhikr" },
          { id: 9, text: "اللّهُـمَّ ما أَصْبَـحَ بي مِـنْ نِعْـمَةٍ أَو بِأَحَـدٍ مِـنْ خَلْـقِك ، فَمِـنْكَ وَحْـدَكَ لا شريكَ لَـك ، فَلَـكَ الْحَمْـدُ وَلَـكَ الشُّكْـر", count: 1, reference: "Morning Dhikr" },
          { id: 10, text: "حَسْبِـيَ اللّهُ لا إلهَ إلاّ هُوَ عَلَـيهِ تَوَكَّـلتُ وَهُوَ رَبُّ العَرْشِ العَظـيم", count: 7, reference: "Morning Dhikr" },
          { id: 11, text: "بِسـمِ اللهِ الذي لا يَضُـرُّ مَعَ اسمِـهِ شَيءٌ في الأرْضِ وَلا في السّمـاءِ وَهـوَ السّمـيعُ العَلـيم", count: 3, reference: "Morning Dhikr" },
          { id: 12, text: "اللّهُـمَّ بِكَ أَصْـبَحْنا وَبِكَ أَمْسَـينا ، وَبِكَ نَحْـيا وَبِكَ نَمُـوتُ وَإِلَـيْكَ النُّـشُور", count: 1, reference: "Morning Dhikr" },
          { id: 13, text: "أَصْبَـحْـنا عَلَى فِطْرَةِ الإسْلاَمِ، وَعَلَى كَلِمَةِ الإِخْلاَصِ، وَعَلَى دِينِ نَبِيِّنَا مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، وَعَلَى مِلَّةِ أَبِينَا إبْرَاهِيمَ حَنِيفاً مُسْلِماً وَمَا كَانَ مِنَ المُشْرِكِينَ", count: 1, reference: "Morning Dhikr" },
          { id: 14, text: "سُبْحـانَ اللهِ وَبِحَمْـدِهِ عَدَدَ خَلْـقِه ، وَرِضـا نَفْسِـه ، وَزِنَـةَ عَـرْشِـه ، وَمِـدادَ كَلِمـاتِـه", count: 3, reference: "Morning Dhikr" },
          { id: 15, text: "اللّهُـمَّ عافِـني في بَدَنـي ، اللّهُـمَّ عافِـني في سَمْـعي ، اللّهُـمَّ عافِـني في بَصَـري ، لا إلهَ إلاّ أَنْـتَ", count: 3, reference: "Morning Dhikr" },
          { id: 16, text: "اللّهُـمَّ إِنّـي أَعـوذُ بِكَ مِنَ الْكُـفر ، وَالفَـقْر ، وَأَعـوذُ بِكَ مِنْ عَذابِ القَـبْر ، لا إلهَ إلاّ أَنْـتَ", count: 3, reference: "Morning Dhikr" },
          { id: 17, text: "اللّهُـمَّ إِنِّـي أسْـأَلُـكَ العَـفْوَ وَالعـافِـيةَ في الدُّنْـيا وَالآخِـرَة ، اللّهُـمَّ إِنِّـي أسْـأَلُـكَ العَـفْوَ وَالعـافِـيةَ في ديني وَدُنْـيايَ وَأهْـلي وَمالـي ، اللّهُـمَّ اسْتُـرْ عـوْراتي وَآمِـنْ رَوْعاتـي ، اللّهُـمَّ احْفَظْـني مِن بَـينِ يَدَيَّ وَمِن خَلْفـي وَعَن يَمـيني وَعَن شِمـالي ، وَمِن فَوْقـي ، وَأَعـوذُ بِعَظَمَـتِكَ أَن أُغْـتالَ مِن تَحْتـي", count: 1, reference: "Morning Dhikr" },
          { id: 18, text: "يَا حَيُّ يَا قيُّومُ بِرَحْمَتِكَ أسْتَغِيثُ أصْلِحْ لِي شَأنِي كُلَّهُ وَلاَ تَكِلْنِي إلَى نَفْسِي طَـرْفَةَ عَيْنٍ", count: 3, reference: "Morning Dhikr" },
          { id: 19, text: "أَصْبَـحْـنا وَأَصْبَـحْ المُـلكُ للهِ رَبِّ العـالَمـين ، اللّهُـمَّ إِنِّـي أسْـأَلُـكَ خَـيْرَ هـذا الـيَوْم ، فَـتْحَهُ ، وَنَصْـرَهُ ، وَنـورَهُ وَبَـرَكَتَـهُ ، وَهُـداهُ ، وَأَعـوذُ بِـكَ مِـنْ شَـرِّ ما فـيهِ وَشَـرِّ ما بَعْـدَه", count: 1, reference: "Morning Dhikr" },
          { id: 20, text: "اللّهُـمَّ عالِـمَ الغَـيْبِ وَالشّـهادَةِ فاطِـرَ السّماواتِ وَالأرْضِ رَبَّ كـلِّ شَـيءٍ وَمَليـكَه ، أَشْهَـدُ أَنْ لا إِلـهَ إِلاّ أَنْت ، أَعـوذُ بِكَ مِن شَـرِّ نَفْسـي وَمِن شَـرِّ الشَّيْـطانِ وَشِرْكِهِ ، وَأَنْ أَقْتَـرِفَ عَلـى نَفْسـي سوءاً أَوْ أَجُـرَّهُ إِلـى مُسْـلِم", count: 1, reference: "Morning Dhikr" },
          { id: 21, text: "أَعـوذُ بِكَلِمـاتِ اللّهِ التّـامّـاتِ مِنْ شَـرِّ ما خَلَـق", count: 3, reference: "Morning Dhikr" },
          { id: 22, text: "اللَّهُمَّ صَلِّ وَسَلِّمْ وَبَارِكْ على نَبِيِّنَا مُحمَّد", count: 10, reference: "Blessings upon the Prophet" },
          { id: 23, text: "اللَّهُمَّ إِنَّا نَعُوذُ بِكَ مِنْ أَنْ نُشْرِكَ بِكَ شَيْئًا نَعْلَمُهُ ، وَنَسْتَغْفِرُكَ لِمَا لَا نَعْلَمُهُ", count: 3, reference: "Morning Dhikr" },
          { id: 24, text: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ الْهَمِّ وَالْحَزَنِ، وَأَعُوذُ بِكَ مِنْ الْعَجْزِ وَالْكَسَلِ، وَأَعُوذُ بِكَ مِنْ الْجُبْنِ وَالْبُخْلِ، وَأَعُوذُ بِكَ مِنْ غَلَبَةِ الدَّيْنِ، وَقَهْرِ الرِّجَالِ", count: 3, reference: "Morning Dhikr" },
          { id: 25, text: "أسْتَغْفِرُ اللهَ العَظِيمَ الَّذِي لاَ إلَهَ إلاَّ هُوَ، الحَيُّ القَيُّومُ، وَأتُوبُ إلَيهِ", count: 3, reference: "Morning Dhikr" },
          { id: 26, text: "يَا رَبِّ , لَكَ الْحَمْدُ كَمَا يَنْبَغِي لِجَلَالِ وَجْهِكَ , وَلِعَظِيمِ سُلْطَانِكَ", count: 3, reference: "Morning Dhikr" },
          { id: 27, text: "اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا، وَرِزْقًا طَيِّبًا، وَعَمَلًا مُتَقَبَّلًا", count: 1, reference: "Morning Dhikr" },
          { id: 28, text: "اللَّهُمَّ أَنْتَ رَبِّي لا إِلَهَ إِلا أَنْتَ ، عَلَيْكَ تَوَكَّلْتُ ، وَأَنْتَ رَبُّ الْعَرْشِ الْعَظِيمِ , مَا شَاءَ اللَّهُ كَانَ ، وَمَا لَمْ يَشَأْ لَمْ يَكُنْ ، وَلا حَوْلَ وَلا قُوَّةَ إِلا بِاللَّهِ الْعَلِيِّ الْعَظِيمِ , أَعْلَمُ أَنَّ اللَّهَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ ، وَأَنَّ اللَّهَ قَدْ أَحَاطَ بِكُلِّ شَيْءٍ عِلْمًا , اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ شَرِّ نَفْسِي ، وَمِنْ شَرِّ كُلِّ دَابَّةٍ أَنْتَ آخِذٌ بِنَاصِيَتِهَا ، إِنَّ رَبِّي عَلَى صِرَاطٍ مُسْتَقِيمٍ", count: 1, reference: "Morning Dhikr" },
          { id: 29, text: "لَا إلَه إلّا اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءِ قَدِيرِ", count: 100, reference: "Tasbeeh" },
          { id: 30, text: "سُبْحـانَ اللهِ وَبِحَمْـدِهِ", count: 100, reference: "Tasbeeh" },
          { id: 31, text: "أسْتَغْفِرُ اللهَ وَأتُوبُ إلَيْهِ", count: 100, reference: "Istighfar" }
        ]
      },
      {
        id: 2,
        name: "Evening Adhkar",
        category: "evening",
        icon: "🌙",
        color: "from-indigo-500/20 to-purple-600/20",
        items: [
          { id: 32, text: "أَعُوذُ بِاللهِ مِنْ الشَّيْطَانِ الرَّجِيمِ\nاللّهُ لاَ إِلَـهَ إِلاَّ هُوَ الْحَيُّ الْقَيُّومُ لاَ تَأْخُذُهُ سِنَةٌ وَلاَ نَوْمٌ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الأَرْضِ مَن ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلاَّ بِإِذْنِهِ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ وَلاَ يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلاَّ بِمَا شَاء وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالأَرْضَ وَلاَ يَؤُودُهُ حِفْظُهُمَا وَهُوَ الْعَلِيُّ الْعَظِيمُ", count: 1, reference: "Ayatul Kursi" },
          { id: 33, text: "أَعُوذُ بِاللهِ مِنْ الشَّيْطَانِ الرَّجِيمِ\nآمَنَ الرَّسُولُ بِمَا أُنْزِلَ إِلَيْهِ مِنْ رَبِّهِ وَالْمُؤْمِنُونَ ۚ كُلٌّ آمَنَ بِاللَّهِ وَمَلَائِكَتِهِ وَكُتُبِهِ وَرُسُلِهِ لَا نُفَرِّقُ بَيْنَ أَحَدٍ مِنْ رُسُلِهِ ۚ وَقَالُوا سَمِعْنَا وَأَطَعْنَا ۖ غُفْرَانَكَ رَبَّنَا وَإِلَيْكَ الْمَصِيرُ. لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا لَهَا مَا كَسَبَتْ وَعَلَيْهَا مَا اكْتَسَبَتْ رَبَّنَا لَا تُؤَاخِذْنَا إِنْ نَّسِينَآ أَوْ أَخْطَأْنَا رَبَّنَا وَلَا تَحْمِلْ عَلَيْنَا إِصْرًا كَمَا حَمَلْتَهُ عَلَى الَّذِينَ مِنْ قَبْلِنَا رَبَّنَا وَلَا تُحَمِّلْنَا مَا لَا طَاقَةَ لَنَا بِهِ وَاعْفُ عَنَّا وَاغْفِرْ لَنَا وَارْحَمْنَا أَنْتَ مَوْلَانَا فَانْصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ", count: 1, reference: "Last two verses of Surah Al-Baqarah" },
          { id: 34, text: "بِسْمِ اللهِ الرَّحْمنِ الرَّحِيم\nقُلْ هُوَ ٱللَّهُ أَحَدٌ، ٱللَّهُ ٱلصَّمَدُ، لَمْ يَلِدْ وَلَمْ يُولَدْ، وَلَمْ يَكُن لَّهُۥ كُفُوًا أَحَدٌۢ", count: 3, reference: "Surah Al-Ikhlas" },
          { id: 35, text: "بِسْمِ اللهِ الرَّحْمنِ الرَّحِيم\nقُلْ أَعُوذُ بِرَبِّ ٱلْفَلَقِ، مِن شَرِّ مَا خَلَقَ، وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ، وَمِن شَرِّ ٱلنَّفَّٰثَٰتِ فِى ٱلْعُقَدِ، وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ", count: 3, reference: "Surah Al-Falaq" },
          { id: 36, text: "بِسْمِ اللهِ الرَّحْمنِ الرَّحِيم\nقُلْ أَعُوذُ بِرَبِّ ٱلنَّاسِ، مَلِكِ ٱلنَّاسِ، إِلَٰهِ ٱلنَّاسِ، مِن شَرِّ ٱلْوَسْوَاسِ ٱلْخَنَّاسِ، ٱلَّذِى يُوَسْوِسُ فِى صُدُورِ ٱلنَّاسِ، مِنَ ٱلْجِنَّةِ وَٱلنَّاسِ", count: 3, reference: "Surah An-Nas" },
          { id: 37, text: "أَمْسَيْـنا وَأَمْسـى المـلكُ لله وَالحَمدُ لله ، لا إلهَ إلاّ اللّهُ وَحدَهُ لا شَريكَ لهُ، لهُ المُـلكُ ولهُ الحَمْـد، وهُوَ على كلّ شَيءٍ قدير ، رَبِّ أسْـأَلُـكَ خَـيرَ ما في هـذهِ اللَّـيْلَةِ وَخَـيرَ ما بَعْـدَهـا ، وَأَعـوذُ بِكَ مِنْ شَـرِّ ما في هـذهِ اللَّـيْلةِ وَشَرِّ ما بَعْـدَهـا ، رَبِّ أَعـوذُبِكَ مِنَ الْكَسَـلِ وَسـوءِ الْكِـبَر ، رَبِّ أَعـوذُ بِكَ مِنْ عَـذابٍ في النّـارِ وَعَـذابٍ في القَـبْر", count: 1, reference: "Evening Dhikr" },
          { id: 38, text: "اللّهـمَّ أَنْتَ رَبِّـي لا إلهَ إلاّ أَنْتَ ، خَلَقْتَنـي وَأَنا عَبْـدُك ، وَأَنا عَلـى عَهْـدِكَ وَوَعْـدِكَ ما اسْتَـطَعْـت ، أَعـوذُبِكَ مِنْ شَـرِّ ما صَنَـعْت ، أَبـوءُ لَـكَ بِنِعْـمَتِـكَ عَلَـيَّ وَأَبـوءُ بِذَنْـبي فَاغْفـِرْ لي فَإِنَّـهُ لا يَغْـفِرُ الذُّنـوبَ إِلاّ أَنْتَ", count: 1, reference: "Sayyidul Istighfar" },
          { id: 39, text: "رَضيـتُ بِاللهِ رَبَّـاً وَبِالإسْلامِ ديـناً وَبِمُحَـمَّدٍ صلى الله عليه وسلم نَبِيّـاً", count: 3, reference: "Evening Dhikr" },
          { id: 40, text: "اللّهُـمَّ إِنِّـي أمسيتُ أُشْـهِدُك ، وَأُشْـهِدُ حَمَلَـةَ عَـرْشِـك ، وَمَلَائِكَتَكَ ، وَجَمـيعَ خَلْـقِك ، أَنَّـكَ أَنْـتَ اللهُ لا إلهَ إلاّ أَنْـتَ وَحْـدَكَ لا شَريكَ لَـك ، وَأَنَّ مُحَمّـداً عَبْـدُكَ وَرَسـولُـك", count: 4, reference: "Evening Dhikr" },
          { id: 41, text: "اللّهُـمَّ ما أَمسى بي مِـنْ نِعْـمَةٍ أَو بِأَحَـدٍ مِـنْ خَلْـقِك ، فَمِـنْكَ وَحْـدَكَ لا شريكَ لَـك ، فَلَـكَ الْحَمْـدُ وَلَـكَ الشُّكْـر", count: 1, reference: "Evening Dhikr" },
          { id: 42, text: "حَسْبِـيَ اللّهُ لا إلهَ إلاّ هُوَ عَلَـيهِ تَوَكَّـلتُ وَهُوَ رَبُّ العَرْشِ العَظـيم", count: 7, reference: "Evening Dhikr" },
          { id: 43, text: "بِسـمِ اللهِ الذي لا يَضُـرُّ مَعَ اسمِـهِ شَيءٌ في الأرْضِ وَلا في السّمـاءِ وَهـوَ السّمـيعُ العَلـيم", count: 3, reference: "Evening Dhikr" },
          { id: 44, text: "اللّهُـمَّ بِكَ أَمْسَـينا وَبِكَ أَصْـبَحْنا، وَبِكَ نَحْـيا وَبِكَ نَمُـوتُ وَإِلَـيْكَ الْمَصِيرُ", count: 1, reference: "Evening Dhikr" },
          { id: 45, text: "أَمْسَيْنَا عَلَى فِطْرَةِ الإسْلاَمِ، وَعَلَى كَلِمَةِ الإِخْلاَصِ، وَعَلَى دِينِ نَبِيِّنَا مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، وَعَلَى مِلَّةِ أَبِينَا إبْرَاهِيمَ حَنِيفاً مُسْلِماً وَمَا كَانَ مِنَ المُشْرِكِينَ", count: 1, reference: "Evening Dhikr" },
          { id: 46, text: "سُبْحـانَ اللهِ وَبِحَمْـدِهِ عَدَدَ خَلْـقِه ، وَرِضـا نَفْسِـه ، وَزِنَـةَ عَـرْشِـه ، وَمِـدادَ كَلِمـاتِـه", count: 3, reference: "Evening Dhikr" }
        ]
      },
      {
        id: 3,
        name: "Sleeping Adhkar",
        category: "sleep",
        icon: "😴",
        color: "from-blue-500/20 to-cyan-600/20",
        items: [
          { id: 100, text: "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا", count: 1, reference: "Narrated by Bukhari" },
          { id: 101, text: "اللَّهُمَّ قِنِي عَذَابَكَ يَوْمَ تَبْعَثُ عِبَادَكَ", count: 3, reference: "Narrated by Abu Dawood" },
          { id: 102, text: "اللَّهُمَّ بِاسْمِكَ أَمُوتُ وَأَحْيَا", count: 1, reference: "Narrated by Bukhari" },
          { id: 103, text: "بِاسْمِكَ رَبِّي وَضَعْتُ جَنْبِي وَبِكَ أَرْفَعُهُ إِنْ أَمْسَكْتَ نَفْسِي فَارْحَمْهَا وَإِنْ أَرْسَلْتَهَا فَاحْفَظْهَا بِمَا تَحْفَظُ بِهِ عِبَادَكَ الصَّالِحِينَ", count: 1, reference: "Narrated by Bukhari" }
        ]
      }
    ];
  };

  const categoriesList = [
    { id: 'morning', name: 'Morning Adhkar', icon: <Sun className="w-7 h-7" />, description: 'Morning remembrances for protection', count: 31 },
    { id: 'evening', name: 'Evening Adhkar', icon: <Moon className="w-7 h-7" />, description: 'Evening remembrances for protection', count: 15 },
    { id: 'sleep', name: 'Sleeping Adhkar', icon: <Bed className="w-7 h-7" />, description: 'Remembrances before sleep', count: 4 },
    { id: 'prayer', name: 'Post-Prayer Adhkar', icon: <Home className="w-7 h-7" />, description: 'Remembrances after prayers', count: 5 },
    { id: 'general', name: 'Various Supplications', icon: <BookOpen className="w-7 h-7" />, description: 'Various supplications and remembrances', count: 7 },
    { id: 'wakeup', name: 'Waking Up Adhkar', icon: <Sparkles className="w-7 h-7" />, description: 'Remembrances upon waking up', count: 3 },
    { id: 'home', name: 'Entering Home', icon: <Home className="w-7 h-7" />, description: 'Remembrances upon entering home', count: 2 },
    { id: 'leaving', name: 'Leaving Home', icon: <MapPin className="w-7 h-7" />, description: 'Remembrances upon leaving home', count: 2 },
    { id: 'food', name: 'Mealtime', icon: <Utensils className="w-7 h-7" />, description: 'Remembrances before and after eating', count: 4 },
    { id: 'istighfar', name: 'Istighfar', icon: <Heart className="w-7 h-7" />, description: 'Seeking forgiveness', count: 3 },
    { id: 'salat', name: 'Blessings upon Prophet', icon: <Star className="w-7 h-7" />, description: 'Peace and blessings upon the Prophet', count: 3 },
    { id: 'travel', name: 'Travel & Riding', icon: <Car className="w-7 h-7" />, description: 'Remembrances for travel', count: 2 }
  ];

  const toggleCategory = (categoryId) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const selectAllCategories = () => {
    if (selectedCategories.length === categoriesList.length) {
      setSelectedCategories([]);
    } else {
      setSelectedCategories(categoriesList.map(cat => cat.id));
    }
  };

  const startReading = () => {
    if (selectedCategories.length === 0) {
      alert('Please select the type of Adhkar you want to read');
      return;
    }
    setScreen('reading');
  };

  const incrementCount = (itemId, maxCount) => {
    setCounts(prev => {
      const current = prev[itemId] || 0;
      if (current < maxCount) {
        return { ...prev, [itemId]: current + 1 };
      }
      return prev;
    });
  };

  const resetCount = (itemId) => {
    setCounts(prev => ({ ...prev, [itemId]: 0 }));
  };

  const resetAllCounts = () => {
    const newCounts = {};
    Object.keys(counts).forEach(key => {
      newCounts[key] = 0;
    });
    setCounts(newCounts);
  };

  const toggleFavorite = (itemId) => {
    setFavorites(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  // Selection Screen
  if (screen === 'selection') {
    return (
      <div className="h-screen bg-[#051410] overflow-y-auto">
        {/* Header for navigation to main page */}
        <div className="sticky top-0 z-50 bg-[#051410]/95 backdrop-blur-md border-b border-emerald-500/20 px-5 py-3">
          <div className="max-w-4xl mx-auto flex justify-between items-center">
            <button 
              onClick={() => router.push('/main')}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 transition-all duration-300 group"
            >
              <ChevronLeft className="w-5 h-5 text-emerald-400 group-hover:-translate-x-1 transition-transform" />
              <span className="text-emerald-400 font-medium">Home</span>
            </button>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
                <span className="text-white text-sm font-bold">Dh</span>
              </div>
              <h1 className="text-white font-bold text-lg">Adhkar</h1>
            </div>
            <div className="w-20"></div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-white font-semibold text-lg">Select Adhkar Type</h2>
            <button 
              onClick={selectAllCategories}
              className="text-emerald-400 text-sm px-4 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 transition-colors"
            >
              {selectedCategories.length === categoriesList.length ? 'Deselect All' : 'Select All'}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {categoriesList.map((category) => (
              <div
                key={category.id}
                onClick={() => toggleCategory(category.id)}
                className={`group relative overflow-hidden rounded-2xl border-2 transition-all duration-300 cursor-pointer ${
                  selectedCategories.includes(category.id)
                    ? 'border-emerald-400 bg-gradient-to-br from-emerald-600/20 to-emerald-800/20'
                    : 'border-emerald-500/30 bg-gradient-to-br from-black/90 to-black/50 hover:border-emerald-400/50'
                }`}
              >
                <div className="relative p-5">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 flex items-center justify-center">
                      {category.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-white font-semibold text-base">{category.name}</h3>
                        {selectedCategories.includes(category.id) && (
                          <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </div>
                      <p className="text-gray-400 text-sm mb-3">{category.description}</p>
                      <div className="flex items-center gap-4 text-xs">
                        <span className="text-emerald-400">📖 {category.count} Dhikr</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {selectedCategories.length > 0 && (
            <div className="mt-8 p-5 rounded-xl bg-gradient-to-r from-emerald-500/10 to-emerald-600/10 border border-emerald-500/30">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <Check className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-white text-base font-medium">Selected</p>
                    <p className="text-gray-400 text-sm">
                      {selectedCategories.length} of {categoriesList.length} types
                    </p>
                  </div>
                </div>
                <button
                  onClick={startReading}
                  className="px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-base font-medium hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 flex items-center gap-2"
                >
                  <Play className="w-5 h-5" />
                  Start Reading
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="h-screen bg-[#051410] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading Adhkar...</p>
        </div>
      </div>
    );
  }

  const filteredAdhkar = adhkar.filter(category => 
    selectedCategories.includes(category.category)
  );

  const getFilteredItems = (items) => {
    if (showFavorites) {
      return items.filter(item => favorites.includes(item.id));
    }
    if (searchTerm) {
      return items.filter(item => 
        item.text?.includes(searchTerm) || 
        item.reference?.includes(searchTerm)
      );
    }
    return items;
  };

  const totalDhikrCount = Object.values(counts).length;
  const completedCount = Object.values(counts).filter(v => v > 0).length;

  return (
    <div className="h-screen bg-[#051410] overflow-hidden">
      {/* Reading Screen Header */}
      <div className="sticky top-0 z-50 bg-[#051410]/95 backdrop-blur-md border-b border-emerald-500/20 px-5 py-3">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setScreen('selection')}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-gray-400" />
            </button>
            <button 
              onClick={() => router.push('/main')}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 transition-all duration-300"
            >
              <Home className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-400 text-sm">Home</span>
            </button>
          </div>

          <div className="flex items-center gap-3">

            <button 
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              className="p-2 rounded-lg bg-gray-800/50 text-gray-400 hover:text-white transition-colors text-lg"
            >
              {viewMode === 'grid' ? '☷' : '⊞'}
            </button>
          </div>
        </div>
      </div>

      <div className="h-[calc(100vh-64px)] overflow-y-auto">
        <div className="max-w-7xl mx-auto px-4 py-6">
          
          {/* Progress Bar */}
          <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-emerald-500/10 to-emerald-600/10 border border-emerald-500/30">
            <div className="flex justify-between text-sm text-gray-400 mb-2">
              <span>Reading Progress</span>
              <span>{completedCount} / {totalDhikrCount} Dhikr</span>
            </div>
            <div className="h-2 rounded-full bg-gray-700 overflow-hidden">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-300"
                style={{ width: totalDhikrCount > 0 ? `${(completedCount / totalDhikrCount) * 100}%` : '0%' }}
              ></div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search for Dhikr or reference..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-5 py-3 pr-12 rounded-xl bg-black/50 border border-emerald-500/30 text-white text-base placeholder:text-gray-500 focus:outline-none focus:border-emerald-400"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="absolute left-4 top-1/2 -translate-y-1/2"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            )}
          </div>

          {/* Favorites Toggle */}
          <div className="flex justify-between items-center mb-5">
            <button
              onClick={() => setShowFavorites(!showFavorites)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-colors ${
                showFavorites 
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  : 'bg-black/50 text-gray-400 border border-emerald-500/20'
              }`}
            >
              <Star className="w-4 h-4" />
              {showFavorites ? 'Favorites' : 'Show Favorites'}
            </button>
            <div className="text-sm text-gray-500">
              <Users className="w-4 h-4 inline ml-1" />
              {totalDhikrCount} Dhikr
            </div>
          </div>

          {/* Adhkar List */}
          {filteredAdhkar.map((category) => {
            const items = category.items || [];
            const filteredItems = getFilteredItems(items);
            
            if (filteredItems.length === 0) return null;
            
            return (
              <div key={category.id} className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-2xl">{category.icon}</div>
                  <div>
                    <h2 className="text-white font-semibold text-lg">{category.name}</h2>
                  </div>
                </div>
                
                <div className={viewMode === 'grid' 
                  ? "grid grid-cols-1 md:grid-cols-2 gap-5" 
                  : "space-y-4"
                }>
                  {filteredItems.map((item, idx) => (
                    <div
                      key={item.id || idx}
                      className="group relative overflow-hidden bg-gradient-to-br from-black/90 via-emerald-950/30 to-black/90 backdrop-blur-sm rounded-xl border border-emerald-500/30 hover:border-emerald-400/50 transition-all duration-500"
                    >
                      <div className="relative p-5">
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <div className="flex-1">
                            <p className="text-gray-200 text-base leading-relaxed whitespace-pre-line font-arabic">
                              {item.text}
                            </p>
                            <div className="flex items-center gap-3 mt-3">
                              <span className="text-emerald-400 text-xs px-2 py-1 rounded-full bg-emerald-500/10">
                                {item.reference || 'Dhikr'}
                              </span>
                              <span className="text-amber-400 text-xs px-2 py-1 rounded-full bg-amber-500/10">
                                Count: {item.count || 1}
                              </span>
                            </div>
                          </div>
                          <button 
                            onClick={() => toggleFavorite(item.id)}
                          >
                            <Star className={`w-5 h-5 transition-colors ${
                              favorites.includes(item.id)
                                ? 'text-amber-400 fill-amber-400'
                                : 'text-gray-500 hover:text-amber-400'
                            }`} />
                          </button>
                        </div>
                        
                        <div className="flex items-center justify-between pt-3 border-t border-emerald-500/20">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => incrementCount(item.id, item.count || 1)}
                              className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 transition-colors flex items-center justify-center"
                            >
                              <span className="text-xl font-bold">+</span>
                            </button>
                            <div className="text-center">
                              <div className="text-white text-2xl font-bold">
                                {counts[item.id] || 0}
                              </div>
                              <div className="text-gray-500 text-xs">
                                / {item.count || 1}
                              </div>
                            </div>
                            <button
                              onClick={() => resetCount(item.id)}
                              className="w-9 h-9 rounded-lg bg-gray-500/20 text-gray-400 hover:bg-gray-500/30 transition-colors flex items-center justify-center"
                            >
                              <RefreshCw className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        
                        <div className="mt-3">
                          <div className="h-1.5 rounded-full bg-gray-700 overflow-hidden">
                            <div 
                              className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-300"
                              style={{ width: `${((counts[item.id] || 0) / (item.count || 1)) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
          
          {/* Stats Cards */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-emerald-600/20 to-emerald-800/20 rounded-xl p-4 text-center border border-emerald-500/30">
              <div className="text-2xl font-bold text-emerald-400">{completedCount}</div>
              <div className="text-gray-400 text-sm mt-1">Completed</div>
            </div>
            <div className="bg-gradient-to-br from-amber-600/20 to-amber-800/20 rounded-xl p-4 text-center border border-amber-500/30">
              <div className="text-2xl font-bold text-amber-400">{favorites.length}</div>
              <div className="text-gray-400 text-sm mt-1">Favorites</div>
            </div>
            <div className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 rounded-xl p-4 text-center border border-blue-500/30">
              <div className="text-2xl font-bold text-blue-400">
                {Object.values(counts).reduce((a, b) => a + b, 0)}
              </div>
              <div className="text-gray-400 text-sm mt-1">Total Tasbeeh</div>
            </div>
            <div className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 rounded-xl p-4 text-center border border-purple-500/30">
              <div className="text-2xl font-bold text-purple-400">{selectedCategories.length}</div>
              <div className="text-gray-400 text-sm mt-1">Categories</div>
            </div>
          </div>
          
          {/* Finish Button */}
          <div className="mt-6 text-center pb-8">
            <button
              onClick={() => {
                if (confirm('Have you finished reading all the Adhkar?')) {
                  setScreen('selection');
                }
              }}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-base font-medium hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300"
            >
              Finish Reading & Return
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdhkarPage;