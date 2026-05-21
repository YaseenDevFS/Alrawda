import React from 'react'
import Hero from './Hero'
import PrayerTimesSection from './PrayerTimesSection'
import Ayah from './Ayah'
import FromCommunity from './FromCommunity'
import '../../../app/globals.css';
function Main() {
  return (
    <div className='pr-2 pl-2 md:pr-8 md:pl-8 lg:pr-8 lg:pl-8'>
      <Hero />
      <PrayerTimesSection />
      <Ayah />
      <FromCommunity />
    </div>
  )
}

export default Main