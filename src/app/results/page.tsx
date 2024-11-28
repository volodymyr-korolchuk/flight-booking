"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

import toast from "react-hot-toast";

import Ticket from "@/components/Ticket";
import Filters from "@/components/Filters";
import NoResults from "@/components/NoResults";
import BookingData from "@/components/BookingData";
import TicketsSkeleton from "@/components/TicketsSkeleton";
import BottomPagination from "@/components/Pagination";

import { API_FILTER_ROUTE } from "../constants";
import { bgPattern } from "@/assets/images";
import { buildFlightRequestBody } from "@/lib/utils";

export default function Results() {
  const searchParams = useSearchParams();

  const [flights, setFlights] = useState<FlightData[]>([]);
  const [pagesCount, setPagesCount] = useState(0);
  const [isFetching, setFetching] = useState(true);
  const [config, setConfig] = useState<FlightsFilterRequest>(
    buildFlightRequestBody(searchParams)
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        setFetching(true);

        console.log(config);

        const response = await fetch(`${API_FILTER_ROUTE}`, {
          method: "POST",
          body: JSON.stringify(config),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          const data = await response.text();
          console.log(data);

          throw new Error(data);
        }
        const data = await response.json();
        setFlights(data);

        const pagesCount = response.headers.get("pagination");
        if (pagesCount) {
          setPagesCount(JSON.parse(pagesCount)["totalPages"]);
        }
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        }
      } finally {
        setFetching(false);
      }
    };

    fetchData();
  }, [config]);

  return (
    <section className="h-full bg-white relative mt-[128px]">
      <Image
        src={bgPattern.src}
        className="blur-sm absolute inset-0 w-full h-full object-cover pointer-events-none"
        width={1200}
        height={1200}
        alt="Background Pattern"
      />

      <div className="lg:px-28 px-4 md:px-8 w-full pb-4 flex flex-col gap-y-24">
        <BookingData params={searchParams} />
        <Filters flights={flights} setConfig={setConfig} />
      </div>

      <div className="lg:px-28 px-4 md:px-8 w-full grid grid-cols-1 gap-y-8 pb-[128px]">
        {isFetching ? (
          <TicketsSkeleton />
        ) : flights && flights?.length > 0 ? (
          flights.map((entry: FlightData, i) => (
            <Ticket key={i} flight={entry} />
          ))
        ) : (
          <NoResults />
        )}

        <BottomPagination pagesCount={pagesCount} />
      </div>
    </section>
  );
}
