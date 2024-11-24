import FlightBookingForm from "@/components/FlightBookingForm"
import React from 'react'
import Image from 'next/image';

const Search = () => {
  return (
    <div className="relative mx-auto flex h-[500px] max-w-[1440px] items-end justify-center rounded-md p-10">
      <Image 
        src="/assets/flight-bg.png"
        alt="Background"
        className="absolute inset-0 size-full object-cover"
        width={1400}
        height={500}
      />
      <div className="relative bg-white rounded-xl shadow-xl p-5">
        <FlightBookingForm />
      </div>
    </div>
  )
}

export default Search