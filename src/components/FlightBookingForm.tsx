// FlightBookingForm.tsx
"use client"

import { useState } from 'react';
import DateSelectorPopup from './DateSelectorPopup';
import TravelDetailsPopup from './TravelDetailsPopup';
import LocationAutocomplete from './LocationAutocomplete';
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

// Types for the component states
type Dates = {
  departureDate: Date | null;
  returnDate: Date | null;
};

type TravelDetails = {
  adults: number;
  children: number;
  infants: number;
  travelClass?: string;
};

const FlightBookingForm: React.FC = () => {
  const [departureLocation, setDepartureLocation] = useState<string>('');
  const [destinationLocation, setDestinationLocation] = useState<string>('');
  const [dates, setDates] = useState<Dates | null>(null);
  const [travelDetails, setTravelDetails] = useState<TravelDetails | undefined>(undefined);
  const [isDatePopupOpen, setDatePopupOpen] = useState<boolean>(false);
  const [isDetailsPopupOpen, setDetailsPopupOpen] = useState<boolean>(false);

  const router = useRouter();

  const handleSubmit = () => {
    // Construct query parameters
    const params = new URLSearchParams({
      originLocationCode: departureLocation,
      destinationLocationCode: destinationLocation,
      departureDate: dates?.departureDate?.toISOString().split('T')[0] || '',
      ...(dates?.returnDate ? { returnDate: dates.returnDate.toISOString().split('T')[0] } : {}),
      adults: (travelDetails?.adults || 1).toString(),
      ...(travelDetails?.children ? { children: travelDetails.children.toString() } : {}),
      ...(travelDetails?.infants ? { infants: travelDetails.infants.toString() } : {}),
      ...(travelDetails?.travelClass ? { travelClass: travelDetails.travelClass } : {}),
      PageNumber: '1',
    });

    router.push(`/results?${params.toString()}`);
  };

  return (
    <div className="flex flex-col gap-5 justify-center">
      <div className="flex gap-4">
        <button onClick={() => setDetailsPopupOpen(true)} className="rounded-full shadow-md p-2">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_1_63)">
            <path d="M4 10C4 10.5304 4.21071 11.0391 4.58579 11.4142C4.96086 11.7893 5.46957 12 6 12C6.53043 12 7.03914 11.7893 7.41421 11.4142C7.78929 11.0391 8 10.5304 8 10C8 9.46957 7.78929 8.96086 7.41421 8.58579C7.03914 8.21071 6.53043 8 6 8C5.46957 8 4.96086 8.21071 4.58579 8.58579C4.21071 8.96086 4 9.46957 4 10Z" stroke="#81C784" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M6 4V8" stroke="#81C784" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M6 12V20" stroke="#81C784" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M10 16C10 16.5304 10.2107 17.0391 10.5858 17.4142C10.9609 17.7893 11.4696 18 12 18C12.5304 18 13.0391 17.7893 13.4142 17.4142C13.7893 17.0391 14 16.5304 14 16C14 15.4696 13.7893 14.9609 13.4142 14.5858C13.0391 14.2107 12.5304 14 12 14C11.4696 14 10.9609 14.2107 10.5858 14.5858C10.2107 14.9609 10 15.4696 10 16Z" stroke="#81C784" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12 4V14" stroke="#81C784" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12 18V20" stroke="#81C784" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M16 7C16 7.53043 16.2107 8.03914 16.5858 8.41421C16.9609 8.78929 17.4696 9 18 9C18.5304 9 19.0391 8.78929 19.4142 8.41421C19.7893 8.03914 20 7.53043 20 7C20 6.46957 19.7893 5.96086 19.4142 5.58579C19.0391 5.21071 18.5304 5 18 5C17.4696 5 16.9609 5.21071 16.5858 5.58579C16.2107 5.96086 16 6.46957 16 7Z" stroke="#81C784" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M18 4V5" stroke="#81C784" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M18 9V20" stroke="#81C784" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </g>
            <defs>
            <clipPath id="clip0_1_63">
            <rect width="24" height="24" fill="white"/>
            </clipPath>
            </defs>
          </svg>
        </button>
        <button onClick={() => setDatePopupOpen(true)} className="rounded-full shadow-md p-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_1_198)">
            <path d="M4 7C4 6.46957 4.21071 5.96086 4.58579 5.58579C4.96086 5.21071 5.46957 5 6 5H18C18.5304 5 19.0391 5.21071 19.4142 5.58579C19.7893 5.96086 20 6.46957 20 7V19C20 19.5304 19.7893 20.0391 19.4142 20.4142C19.0391 20.7893 18.5304 21 18 21H6C5.46957 21 4.96086 20.7893 4.58579 20.4142C4.21071 20.0391 4 19.5304 4 19V7Z" stroke="#81C784" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M16 3V7" stroke="#81C784" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M8 3V7" stroke="#81C784" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M4 11H20" stroke="#81C784" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M8 15H10V17H8V15Z" stroke="#81C784" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </g>
            <defs>
            <clipPath id="clip0_1_198">
            <rect width="24" height="24" fill="white"/>
            </clipPath>
            </defs>
          </svg>
        </button>
      </div>

      <div className="flex gap-4 items-center">
        <LocationAutocomplete label="From" onLocationSelect={setDepartureLocation} />

        <div>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_1_33)">
            <path d="M16 3L20 7L16 11" stroke="#81C784" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M10 7H20" stroke="#81C784" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M8 13L4 17L8 21" stroke="#81C784" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M4 17H13" stroke="#81C784" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </g>
            <defs>
            <clipPath id="clip0_1_33">
            <rect width="24" height="24" fill="white"/>
            </clipPath>
            </defs>
          </svg>
        </div>

        <LocationAutocomplete label="Destination" onLocationSelect={setDestinationLocation} />
        
        <Button type="button" onClick={handleSubmit} variant="primary" className="min-w-[180px]">
          Search
        </Button>

        <DateSelectorPopup
          isOpen={isDatePopupOpen}
          onClose={() => setDatePopupOpen(false)}
          onSelectDates={setDates}
        />

        <TravelDetailsPopup
          isOpen={isDetailsPopupOpen}
          onClose={() => setDetailsPopupOpen(false)}
          onSelectDetails={setTravelDetails}
        />
      </div>
    </div>
  );
};

export default FlightBookingForm;
