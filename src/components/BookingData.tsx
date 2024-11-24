import React from "react";
import { ArrowSvg } from "./svgs";

interface Props {
  params: UserRequestedParams;
}

const BookingData: React.FC<Props> = ({ params }) => {
  return (
    <div className="w-full px-4 lg:px-10 py-4 lg:py-6 bg-[#EFFFF4] border border-solid border-black rounded-lg transition-all h-fit">
      <h4 className="text-[40px] text-[#2A4A2C] font-semibold mb-5">
        Your booking ✈️
      </h4>
      <div className="bg-[#F4F4F4] border border-solid border-black rounded-md p-4 flex gap-12">
        <div className="flex items-center gap-2 text-[#2A4A2C] font-semibold">
          {params.originLocationCode}
          <ArrowSvg />
          {params.destinationLocationCode}
        </div>

        <div className="flex items-center gap-2 text-[#2A4A2C] font-semibold">
          <p>Passengers:</p>
          <p className="text-[#63b068]">{params.adults}</p>
        </div>

        <div className="flex items-center gap-2 text-[#2A4A2C] font-semibold">
          <p>Departure:</p>
          <p className="text-[#63b068]">{params.departureDate}</p>
        </div>
      </div>
    </div>
  );
};

export default BookingData;
