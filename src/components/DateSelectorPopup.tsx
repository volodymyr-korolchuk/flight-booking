import { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "./ui/button";

type DateSelectorPopupProps = {
  isOpen: boolean;
  onClose: () => void;
  onSelectDates: (dates: { departureDate: Date | undefined; returnDate: Date | undefined }) => void;
};

const DateSelectorPopup: React.FC<DateSelectorPopupProps> = ({ isOpen, onClose, onSelectDates }) => {
  const [departureDate, setDepartureDate] = useState<Date | undefined>(undefined);
  const [returnDate, setReturnDate] = useState<Date | undefined>(undefined);
  const [isOneWay, setIsOneWay] = useState<boolean>(false);

  const handleApply = () => {
    onSelectDates({ departureDate, returnDate: isOneWay ? undefined : returnDate });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed z-10 inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[430px]">
        <h2 className="text-center text-base leading-5 font-medium text-darkSeaGreen mb-6">Select Travel Dates</h2>

        <label className="mb-4 flex gap-2 items-center">
          <div className="relative leading-[0]">
            <input
              type="checkbox"
              checked={isOneWay}
              onChange={(e) => setIsOneWay(e.target.checked)}
              className="appearance-none size-4 border border-chineseWhite rounded-sm bg-white checked:bg-darkSeaGreen checked:border-darkSeaGreen focus:outline-none focus:ring-0 peer"
            />
            <svg className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity duration-300" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_1_187)">
              <path d="M2.5 6L5 8.5L10 3.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </g>
              <defs>
              <clipPath id="clip0_1_187">
              <rect width="12" height="12" fill="white"/>
              </clipPath>
              </defs>
            </svg>
          </div>
          <span className="block text-sm font-medium leading-4 text-darkSeaGreen">One Way</span>
        </label>


        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <label className="block mb-1 text-sm font-medium leading-4 text-darkSeaGreen">Departure Date</label>
            <DatePicker
              selected={departureDate}
              onChange={(date) => setDepartureDate(date || undefined)}  // Update null to undefined
              dateFormat="yyyy-MM-dd"
              className="
                  border border-soild border-chineseWhite rounded-md px-2 py-4 w-full 
                  focus:outline-none focus:ring-2 focus:ring-darkSeaGreen text-sm leading-4 font-medium text-raisinBlack
                "
              wrapperClassName="w-full"
              placeholderText="Select a date"
            />
          </div>

          {!isOneWay && (
            <div className="flex-1">
              <label className="block mb-1 text-sm font-medium leading-4 text-darkSeaGreen">Return Date</label>
              <DatePicker
                selected={returnDate}
                onChange={(date) => setReturnDate(date || undefined)} // Update null to undefined
                dateFormat="yyyy-MM-dd"
                minDate={departureDate}
                className="
                    border border-soild border-chineseWhite rounded-md px-2 py-4 w-full 
                    focus:outline-none focus:ring-2 focus:ring-darkSeaGreen text-sm leading-4 font-medium text-raisinBlack
                  "
                wrapperClassName="w-full"
                placeholderText="Select a date"
              />
            </div>
          )}
        </div>

        <Button type="button" onClick={handleApply} variant="primary" className="w-full">
          Apply
        </Button>
      </div>
    </div>
  );
};

export default DateSelectorPopup;