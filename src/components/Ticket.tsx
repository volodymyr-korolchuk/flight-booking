"use client";

import { ticketFiller } from "@/assets/images";
import Image from "next/image";
import React from "react";
import { ArrivalSvg, DepartureSvg, DetailsSvg, PlaneSvg } from "./svgs";

interface Props {
  flight: FlightData;
}

const TicketFiller = () => (
  <span className="flex-grow">
    <Image
      src={ticketFiller.src}
      width={200}
      height={100}
      className="w-full object-none"
      alt="filler"
    />
  </span>
);

const Ticket: React.FC<Props> = ({ flight }) => {
  const segments = flight.segments.map((segment) => segment);
  const locations = segments
    .map((segment, i, array) => {
      switch (i) {
        case array.length - 1:
          return [segment.departure, segment.arrival];
        default:
          return [segment.departure];
      }
    })
    .flat();

  const carriers = new Set(segments.map((segment) => segment.carrier));

  return (
    <div className="flex flex-col border border-solid border-black overflow-clip rounded-lg w-full relative drop-shadow-lg">
      <div className="flex flex-col">
        <div className="grid grid-cols-2">
          <div className="flex gap-2 items-center justify-between px-6 py-6 bg-[#EFFFF4] md:border-r border-solid border-black">
            {locations.map((location, i) => (
              <>
                {i > 0 && (
                  <div className="flex-grow flex items-center justify-center">
                    <TicketFiller />
                    <PlaneSvg />
                    <TicketFiller />
                  </div>
                )}

                {i === locations.length - 1 && <ArrivalSvg />}
                <div key={i}>
                  <p className="">
                    {location.at.split("T").at(-1)?.slice(0, 5)}
                  </p>
                  <p className="">{location.iataCode}</p>
                </div>
                {i === 0 && <DepartureSvg />}
              </>
            ))}
          </div>

          <div className="p-6 flex items-center bg-darkSeaGreen/80">
            <h4 className="font-semibold text-[18px]">{flight.comfortClass}</h4>
          </div>
        </div>

        <div className="grid grid-cols-2 bg-white border-t border-solid border-black min-h-40">
          <div className="flex flex-col  border-solid border-black px-6 py-6 justify-between">
            <div>
              <span>
                <p className="inline font-semibold">Duration:</p>{" "}
                {flight.totalJourneyDuration}
              </span>
              <span className="flex gap-1 mt-2">
                <p className="inline font-semibold">Airlines:</p>{" "}
                {carriers.values().toArray().join(", ")}
              </span>
            </div>

            <button className="flex items-baseline gap-1 w-fit">
              <DetailsSvg />
              <p className="my-auto text-[#379E3C] text-[16px] font-semibold">
                See details
              </p>
            </button>
          </div>

          <div className="flex items-end justify-end px-6 py-6">
            <button className="bg-[#DCE3FF] hover:saturate-200 px-4 py-2 border border-solid border-black/50 rounded-md">
              Book Flight
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ticket;
