"use client";

import React, { useEffect, useState } from "react";
import { bgPattern } from "@/assets/images";
import Image from "next/image";
import Ticket from "@/components/Ticket";
import BookingData from "@/components/BookingData";
import { useSearchParams } from "next/navigation";
import { API_BASE_URL, USER_REQUESTED_PARAMS } from "../constants";
import TicketsSkeleton from "@/components/TicketsSkeleton";
import NoResults from "@/components/NoResults";

export default function Results() {
  const [flights, setFlights] = useState<FlightData[]>([]);
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
      <div className="lg:px-28 px-4 md:px-8 w-full grid grid-cols-1 gap-y-8 pb-[128px]">
        <BookingData params={bookingParams} />

        {isFetching ? (
          <TicketsSkeleton />
        ) : flights && flights?.length > 0 ? (
          flights.map((entry: FlightData, i) => (
            <Ticket key={i} flight={entry} />
          ))
        ) : (
          <NoResults />
        )}
      </div>
    </section>
  );
}
