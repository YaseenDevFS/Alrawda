// app/main/page.js - نفس المحتوى القديم بتاع صفحة الرئيسية
import React from 'react'
import TopBar from '@/components/dashboard/TopBar'
import Main from '../../components/dashboard/dashboard-main/Main'

function MainPage() {
  return (
    <div className='flex flex-col h-screen bg-[#051410]'>
      <TopBar />
      <Main />
    </div>
  )
}

export default MainPage