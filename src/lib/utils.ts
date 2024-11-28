import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export enum FlightTimeRange {
  NoPreference,
  Morning,
  Afternoon,
  Evening,
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export class FlightsFilterRequestBuilder {
  private flightSearchParams: Partial<FlightSearchParams> = {};
  private filterCriteria: Partial<FlightFilterCriteria> = {};

  setSortBy(sortBy?: string | null) {
    if (sortBy) this.flightSearchParams.SortBy = sortBy;
    return this;
  }

  setOriginLocationCode(origin?: string | null) {
    if (origin) this.flightSearchParams.originLocationCode = origin;
    return this;
  }

  setDestinationLocationCode(destination?: string | null) {
    if (destination)
      this.flightSearchParams.destinationLocationCode = destination;
    return this;
  }

  setDepartureDate(departureDate?: string | null) {
    if (departureDate) this.flightSearchParams.departureDate = departureDate;
    return this;
  }

  setReturnDate(returnDate?: string | null) {
    if (returnDate) this.flightSearchParams.returnDate = returnDate;
    return this;
  }

  setAdults(adults?: string | null) {
    if (adults) this.flightSearchParams.adults = Number(adults);
    return this;
  }

  setChildren(children?: string | null) {
    if (children) this.flightSearchParams.children = Number(children);
    return this;
  }

  setInfants(infants?: string | null) {
    if (infants) this.flightSearchParams.infants = Number(infants);
    return this;
  }

  setTravelClass(travelClass?: string | null) {
    if (travelClass) this.flightSearchParams.travelClass = travelClass;
    return this;
  }

  setMinPrice(minPrice?: string | null) {
    if (minPrice) this.filterCriteria.minPrice = Number(minPrice);
    return this;
  }

  setMaxPrice(maxPrice?: string | null) {
    if (maxPrice) this.filterCriteria.maxPrice = Number(maxPrice);
    return this;
  }

  setDepartureTimeRange(departureTimeRange?: TimeRange | null) {
    if (departureTimeRange) {
      this.filterCriteria.departureTimeRange = departureTimeRange;
    }
    return this;
  }

  setArrivalTimeRange(arrivalTimeRange?: TimeRange | null) {
    if (arrivalTimeRange)
      this.filterCriteria.arrivalTimeRange = arrivalTimeRange;
    return this;
  }

  setAirline(airline?: string | null) {
    if (airline) this.filterCriteria.airline = airline;
    return this;
  }

  build(): FlightsFilterRequest {
    // Ensure required fields are set
    // if (
    //   !this.flightSearchParams.originLocationCode ||
    //   !this.flightSearchParams.destinationLocationCode ||
    //   !this.flightSearchParams.departureDate
    // ) {
    //   throw new Error(
    //     "Origin, destination, and departure date are required fields!"
    //   );
    // }

    return {
      flightSearchParams: this.flightSearchParams as FlightSearchParams,
      filterCriteria: this.filterCriteria as FlightFilterCriteria,
    };
  }
}

// Function to build the request
export const buildFlightRequestBody = (searchParams: URLSearchParams) => {
  const builder = new FlightsFilterRequestBuilder();

  const requestBody = builder
    .setSortBy(searchParams.get("SortBy"))
    .setOriginLocationCode(searchParams.get("originLocationCode"))
    .setDestinationLocationCode(searchParams.get("destinationLocationCode"))
    .setDepartureDate(searchParams.get("departureDate"))
    .setReturnDate(searchParams.get("returnDate"))
    .setAdults(searchParams.get("adults"))
    .setChildren(searchParams.get("children"))
    .setInfants(searchParams.get("infants"))
    .setTravelClass(searchParams.get("travelClass"))
    // .setMinPrice(searchParams.get("minPrice"))
    // .setMaxPrice(searchParams.get("maxPrice"))
    // .setDepartureTimeRange(searchParams.get("departureTimeRange"))
    // .setArrivalTimeRange(searchParams.get("arrivalTimeRange"))
    // .setAirline(searchParams.get("airline"))
    .build();

  return requestBody;
};

export function getFlightTimeRange(range: FlightTimeRange): TimeRange {
  switch (range) {
    case FlightTimeRange.NoPreference:
      return { start: "00:00:00", end: "23:59:59" };
    case FlightTimeRange.Morning:
      return { start: "00:00:00", end: "11:59:59" };
    case FlightTimeRange.Afternoon:
      return { start: "12:00:00", end: "17:59:59" };
    case FlightTimeRange.Evening:
      return { start: "18:00:00", end: "23:59:59" };
  }
}
