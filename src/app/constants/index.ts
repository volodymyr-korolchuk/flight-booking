export const API_BASE_URL = `https://localhost:7071/api/flights`;
export const API_FILTER_ROUTE = `https://localhost:7071/api/flights/filter`;
export const USER_REQUESTED_PARAMS = [
  "originLocationCode",
  "destinationLocationCode",
  "adults",
  "departureDate",
] as const;

export const FLIGHT_CLASS_COLORS = {
  economy: "#81C784",
  premium_economy: "#FFDF61",
  business: "#B5A7FF",
  first: "#8DDBFF",
};

export const airlines = [
  "Air Baltic",
  "Air France",
  "United Airlines",
  "One Way",
];
