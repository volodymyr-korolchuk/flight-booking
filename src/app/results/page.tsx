"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";

import Ticket from "@/components/Ticket";
import Filters from "@/components/Filters";
import NoResults from "@/components/NoResults";
import BookingData from "@/components/BookingData";
import TicketsSkeleton from "@/components/TicketsSkeleton";
import { bgPattern } from "@/assets/images";
import { API_BASE_URL, USER_REQUESTED_PARAMS } from "../constants";
import BottomPagination from "@/components/Pagination";

export default function Results() {
  const [flights, setFlights] = useState<FlightData[]>([]);
  const [pagesCount, setPagesCount] = useState(0);
  const [isFetching, setFetching] = useState(true);

  const searchParams = useSearchParams();
  const bookingParams: UserRequestedParams = USER_REQUESTED_PARAMS.reduce(
    (acc, key) => {
      const value = searchParams.get(key);
      if (value !== null) {
        acc[key] = value;
      }
      return acc;
    },
    {} as UserRequestedParams
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        setFetching(true);
        const response = await fetch(`${API_BASE_URL}?${searchParams}`);
        if (!response.ok) {
          throw new Error("Failed to fetch flights.");
        }
        const data = await response.json();
        setFlights(data);

        const pagesCount = response.headers.get("pagination");
        if (pagesCount) {
          setPagesCount(JSON.parse(pagesCount)["totalPages"]);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setFetching(false);
      }
    };

    fetchData();
  }, [searchParams]);

  return (
    <section className="h-full bg-white relative mt-[128px]">
      <Image
        src={bgPattern.src}
        className="blur-sm absolute inset-0 w-full h-full object-cover"
        width={1200}
        height={1200}
        alt="Background Pattern"
      />

      <div className="lg:px-28 px-4 md:px-8 w-full pb-4 flex flex-col gap-y-24">
        <BookingData params={bookingParams} />

        {flights && flights.length > 0 && <Filters />}
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
