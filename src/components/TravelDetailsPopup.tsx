// TravelDetailsPopup.tsx
"use client"

import { useState } from 'react';
import { Button } from "./ui/button";

type TravelDetailsPopupProps = {
  isOpen: boolean;
  onClose: () => void;
  onSelectDetails: (details: { adults: number; children: number; infants: number; travelClass: string | undefined }) => void;
};

const TravelDetailsPopup: React.FC<TravelDetailsPopupProps> = ({ isOpen, onClose, onSelectDetails }) => {
  const [adults, setAdults] = useState<number>(1);
  const [children, setChildren] = useState<number>(0);
  const [infants, setInfants] = useState<number>(0);
  const [travelClass, setTravelClass] = useState<string | undefined>(undefined);

  const handleApply = () => {
    onSelectDetails({ adults, children, infants, travelClass });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed z-10 inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[430px]">
        <h2 className="text-center text-base leading-5 font-medium text-darkSeaGreen mb-6">Travel Details</h2>

        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium leading-4 text-darkSeaGreen">Travel class</label>
          <select
            value={travelClass}
            onChange={(e) => setTravelClass(e.target.value)}
            className="w-full border border-solid border-chineseWhite rounded-md px-2 py-4 text-sm leading-4 font-medium text-raisinBlack"
          >
            <option value="">Any</option>
            <option value="ECONOMY">Economy</option>
            <option value="PREMIUM_ECONOMY">Premium Economy</option>
            <option value="BUSINESS">Business</option>
            <option value="FIRST">First Class</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium leading-4 text-darkSeaGreen">Adults</label>
          <input
            type="number"
            value={adults}
            onChange={(e) => setAdults(parseInt(e.target.value))}
            min="1"
            className="w-full border border-solid border-chineseWhite rounded-md px-2 py-4 text-sm leading-4 font-medium text-raisinBlack"
          />
        </div>

        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium leading-4 text-darkSeaGreen">Children</label>
          <input
            type="number"
            value={children}
            onChange={(e) => setChildren(parseInt(e.target.value))}
            min="0"
            className="w-full border border-solid border-chineseWhite rounded-md px-2 py-4 text-sm leading-4 font-medium text-raisinBlack"
          />
        </div>

        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium leading-4 text-darkSeaGreen">Infants</label>
          <input
            type="number"
            value={infants}
            onChange={(e) => setInfants(parseInt(e.target.value))}
            min="0"
            className="w-full border border-solid border-chineseWhite rounded-md px-2 py-4 text-sm leading-4 font-medium text-raisinBlack"
          />
        </div>

        <Button type="button" onClick={handleApply} variant="primary" className="w-full">
          Apply
        </Button>
      </div>
    </div>
  );
};

export default TravelDetailsPopup;
