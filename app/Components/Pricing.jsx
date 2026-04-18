import { PricingTable } from '@clerk/nextjs'
import React from 'react'

const Pricing = () => {
  return (
    <div className='mt-6' id='pricing'>
        <div className='flex items-center gap-2'>
     <span className='bg-purple-700 h-[1px] w-10 block '/>
     <h1 className='text-lg uppercase font-bold text-purple-600 font-playfair'> Pricing </h1>
        </div>
      <h1 className='text-5xl mt-4'> Simple,
        <span className='text-purple-600 font-italiano  text-5xl md:text-7xl'> Honest </span>
        <span className='ml-1'> Prcing </span>
      </h1>
   
   <div className='mt-6 '>
      <PricingTable checkoutProps={{
          appearance: {
            elements :{
              drawerRoot :{
                zIndex: 20000
              }
            }
          }
        }}
      />
   </div>
    </div>
  )
}

export default Pricing