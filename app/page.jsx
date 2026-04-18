import { Button } from '@/components/ui/button'
import React from 'react'
import HeroSection from './Components/HeroSection'
import Features from './Components/Features'
import HowItWorks from './Components/HowItworks'
import Pricing from './Components/Pricing'
import Footer from './Components/Footer'
import Navbar from './Components/Navbar'

const page = () => {
  return (
    <div className='p-24'>
      <Navbar/>
     <HeroSection/>
     <Features/>
     <HowItWorks/>
     <Pricing/>
     <Footer/>
    </div>
  )
}

export default page