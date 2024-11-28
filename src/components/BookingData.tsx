import React from "react";
import { ArrowSvg } from "./svgs";

interface Props {
  params: URLSearchParams;
}

const BookingData: React.FC<Props> = ({ params }) => {
  return (
    <div className="w-full px-4 lg:px-10 py-4 lg:py-6 bg-[#EFFFF4] border border-solid border-black rounded-lg transition-all h-fit">
      <h4 className="text-[40px] text-[#2A4A2C] font-semibold mb-5">
        Your booking ✈️
      </h4>
      <div className="bg-[#F4F4F4] border border-solid border-black rounded-md p-4 flex gap-12">
        <div className="flex items-center gap-2 text-[#2A4A2C] font-semibold">
          {params.get("originLocationCode")}
          <ArrowSvg />
          {params.get("destinationLocationCode")}
        </div>

        <div className="flex items-center gap-2 text-[#2A4A2C] font-semibold">
          <p>Adults:</p>
          <p className="text-[#63b068]">{params.get("adults") || 0}</p>
        </div>

        <div className="flex items-center gap-2 text-[#2A4A2C] font-semibold">
          <p>Children:</p>
          <p className="text-[#63b068]">{params.get("children") || 0}</p>
        </div>

        <div className="flex items-center gap-2 text-[#2A4A2C] font-semibold">
          <p>Infants:</p>
          <p className="text-[#63b068]">{params.get("infants") || 0}</p>
        </div>

        <div className="flex items-center gap-2 text-[#2A4A2C] font-semibold">
          <p>Departure:</p>
          <p className="text-[#63b068]">
            {params.get("departureDate")
              ?.split("T")
              .map((x, i, a) => (i === a.length - 1 ? x.split(".").at(0) : x))
              .join(" ")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookingData;
