declare global {
  interface BookingData {
    liftoffCityCode: string;
    destinationCityCode: string;
    liftoffCityName: string;
    destinationCityName: string;
    departureDate: Date | string;
    passengerCount: number | string;
  }

  interface FlightSegment {
    departure: {
      iataCode: string; // IATA code for the departure airport
      terminal: string | null; // Terminal at the departure airport (nullable)
      at: string; // Departure date and time in ISO 8601 format
    };
    arrival: {
      iataCode: string; // IATA code for the arrival airport
      terminal: string | null; // Terminal at the arrival airport (nullable)
      at: string; // Arrival date and time in ISO 8601 format
    };
    carrier: string; // Airline carrier name
    aircraft: string; // Aircraft type
  }

  interface FlightData {
    comfortClass: string; // Class of the flight (e.g., ECONOMY)
    price: number; // Price of the flight
    currency: string; // Currency for the price
    segments: FlightSegment[]; // Array of segments (a flight can have multiple segments)
    totalJourneyDuration: string; // Total journey duration (HH:mm:ss)
  }

  interface UserRequestedParams {
    originLocationCode?: string;
    destinationLocationCode?: string;
    adults?: string;
    children?: string;
    infants?: string;
    departureDate?: string;
  }

  export const enum SortBy {
    PriceAsc = "PriceAsc",
    PriceDesc = "PriceDesc",
    FlightsDurationAsc = "FlightsDurationAsc",
    FlightsDurationDesc = "FlightsDurationDesc",
  }

  interface FlightSearchParams {
    SortBy?: string;
    originLocationCode: string;
    destinationLocationCode: string;
    departureDate: string;
    returnDate?: string;
    adults: number;
    children?: number;
    infants?: number;
    travelClass?: string;
  }

  interface FlightFilterCriteria {
    minPrice?: number;
    maxPrice?: number;
    departureTimeRange?: TimeRange;
    arrivalTimeRange?: TimeRange;
    airline?: string;
  }

  interface FlightsFilterRequest {
    flightSearchParams: FlightSearchParams;
    filterCriteria?: FlightFilterCriteria;
  }

  interface TimeRange {
    start: string;
    end: string;
  }
}



export {};
