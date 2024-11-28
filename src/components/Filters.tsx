"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import * as Slider from "@radix-ui/react-slider"; // Radix slider component
import { useSearchParams } from "next/navigation";
import {
  FlightsFilterRequestBuilder,
  FlightTimeRange,
  getFlightTimeRange,
} from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import toast from "react-hot-toast";

interface Props {
  flights?: FlightData[];
  config: FlightsFilterRequest;
  setConfig: React.Dispatch<React.SetStateAction<FlightsFilterRequest>>;
}

const Filters: React.FC<Props> = ({ config, setConfig }) => {
  const searchParams = useSearchParams();
  const builder = new FlightsFilterRequestBuilder();

  const [isDialogOpen, setDialogOpen] = useState(false);
  const [sortBy, setSortBy] = useState<string>(
    searchParams.get("SortBy") ?? "PriceAsc"
  );
  const [departureTime, setDepartureTime] = useState<FlightTimeRange>(
    FlightTimeRange.NoPreference
  );
  const [arrivalTime, setArrivalTime] = useState<FlightTimeRange>(
    FlightTimeRange.NoPreference
  );
  const [adults, setAdults] = useState<number>(
    config.flightSearchParams.adults
  );
  const [children, setChildren] = useState<number>(
    config.flightSearchParams.children ?? 0
  );
  const [infants, setInfants] = useState<number>(
    config.flightSearchParams.infants ?? 0
  );
  const [travelClass, setTravelClass] = useState<string>("ECONOMY");
  const [lowerPriceLimit] = useState(0);
  const [upperPriceLimit] = useState(10000);
  const [priceRange, setPriceRange] = useState<number[]>([
    lowerPriceLimit,
    upperPriceLimit,
  ]);

  const handleApplyFilters = () => {
    try {
      const config = builder
        .setSortBy(sortBy)
        .setAdults(adults.toString())
        .setChildren(children.toString())
        .setInfants(infants.toString())
        .setTravelClass(travelClass)
        .setMinPrice(priceRange[0].toString())
        .setMaxPrice(priceRange[1].toString())
        .setDepartureTimeRange(getFlightTimeRange(departureTime))
        .setArrivalTimeRange(getFlightTimeRange(arrivalTime))
        .setAirline()
        .build();

      console.log(config);

      setConfig(
        (prev) =>
          ({
            flightSearchParams: {
              ...prev.flightSearchParams,
              ...config.flightSearchParams,
            },
            filterCriteria: {
              ...prev.filterCriteria,
              ...config.filterCriteria,
            },
          } as FlightsFilterRequest)
      );
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setDialogOpen(false);
    }
  };

  useEffect(() => {
    const config = builder.setSortBy(sortBy).build();

    console.log(config);

    setConfig(
      (prev) =>
        ({
          flightSearchParams: {
            ...prev.flightSearchParams,
            ...config.flightSearchParams,
          },
          filterCriteria: {
            ...prev.filterCriteria,
            ...config.filterCriteria,
          },
        } as FlightsFilterRequest)
    );
  }, [sortBy]);

  return (
    <div className="flex justify-between items-end">
      {/* Filter Modal */}
      <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="primary" className="px-14">
            Filters
          </Button>
        </DialogTrigger>
        <DialogContent className="max-lg:max-w-[100vw] max-lg:max-h-[100vh]">
          <DialogHeader>
            <DialogTitle className="text-darkSeaGreen text-[24px]">
              Filters
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {/* Travel Class */}
            <div>
              <Label className="text-darkSeaGreen">Travel Class</Label>
              <Select
                onValueChange={(value) => setTravelClass(value)}
                defaultValue={travelClass}
              >
                <SelectTrigger className="w-full border border-[#E0E0E0] mt-2">
                  <SelectValue placeholder="Select travel class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="ECONOMY">Economy</SelectItem>
                    <SelectItem value="PREMIUM_ECONOMY">
                      Premium Economy
                    </SelectItem>
                    <SelectItem value="BUSINESS">Business</SelectItem>
                    <SelectItem value="FIRST">First</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Budget */}
            <div className="">
              <Label className="text-darkSeaGreen">Budget</Label>
              <div className="flex gap-4 items-center justify-between mt-2 mb-4">
                <Input
                  type="number"
                  className="border border-[#E0E0E0]"
                  value={priceRange[0]}
                  min={lowerPriceLimit}
                  onChange={(e) =>
                    setPriceRange([Number(e.target.value), priceRange[1]])
                  }
                />
                <span> - </span>
                <Input
                  type="number"
                  value={priceRange[1]}
                  className="border border-[#E0E0E0]"
                  max={upperPriceLimit}
                  onChange={(e) =>
                    setPriceRange([priceRange[0], Number(e.target.value)])
                  }
                />
              </div>
              <Slider.Root
                className="relative flex items-center select-none w-full h-5"
                value={priceRange}
                onValueChange={(value) => setPriceRange(value as number[])}
                min={lowerPriceLimit}
                max={upperPriceLimit}
                step={10}
              >
                <Slider.Track className="bg-gray-300 relative flex-grow h-1 rounded">
                  <Slider.Range className="absolute bg-darkSeaGreen h-full rounded" />
                </Slider.Track>
                <Slider.Thumb
                  className="block w-4 h-4 bg-white border border-gray-400 rounded-full shadow"
                  aria-label="Lower Thumb"
                />
                <Slider.Thumb
                  className="block w-4 h-4 bg-white border border-gray-400 rounded-full shadow"
                  aria-label="Upper Thumb"
                />
              </Slider.Root>
            </div>

            <h2 className="text-darkSeaGreen">Flight times</h2>
            <div className="grid grid-cols-2 gap-x-4 items-center place-content-center">
              {/* Departure */}
              <div>
                <div className="space-y-3">
                  <Label className="text-sm font-medium text-darkSeaGreen">
                    Departure
                  </Label>
                  <RadioGroup
                    className="space-y-2  opacity-80"
                    value={departureTime}
                    onValueChange={(value) => setDepartureTime(value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        id="departure-none"
                        value={FlightTimeRange.NoPreference}
                      />
                      <Label htmlFor="departure-none">No preference</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        id="departure-morning"
                        value={FlightTimeRange.Morning}
                      />
                      <Label htmlFor="departure-morning">
                        Morning (00:00 - 11:59)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        id="departure-afternoon"
                        value={FlightTimeRange.Afternoon}
                      />
                      <Label htmlFor="departure-afternoon">
                        Afternoon (12:00 - 17:59)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        id="departure-evening"
                        value={FlightTimeRange.Evening}
                      />
                      <Label htmlFor="departure-evening">
                        Evening (18:00 - 23:59)
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              {/* Arrival */}
              <div>
                <div className="space-y-3">
                  <Label className="text-sm font-medium text-darkSeaGreen">
                    Arrival
                  </Label>
                  <RadioGroup
                    className="space-y-2 opacity-80"
                    value={arrivalTime}
                    onValueChange={(value) => setArrivalTime(value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        id="arrival-none"
                        value={FlightTimeRange.NoPreference}
                      />
                      <Label htmlFor="arrival-none">No preference</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        id="arrival-morning"
                        value={FlightTimeRange.Morning}
                      />
                      <Label htmlFor="arrival-morning">
                        Morning (00:00 - 11:59)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        id="arrival-afternoon"
                        value={FlightTimeRange.Afternoon}
                      />
                      <Label htmlFor="arrival-afternoon">
                        Afternoon (12:00 - 17:59)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        id="arrival-evening"
                        value={FlightTimeRange.Evening}
                      />
                      <Label htmlFor="arrival-evening">
                        Evening (18:00 - 23:59)
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </div>

            {/* Passengers */}
            <div className="grid grid-cols-3 gap-4 overflow-hidden">
              <div>
                <Label className="text-darkSeaGreen">Adults</Label>
                <Input
                  type="number"
                  className="w-full"
                  value={adults}
                  onChange={(e) => setAdults(Number(e.target.value))}
                  min={1}
                />
              </div>
              <div>
                <Label className="text-darkSeaGreen">Children</Label>
                <Input
                  type="number"
                  className="w-full"
                  value={children}
                  onChange={(e) => setChildren(Number(e.target.value))}
                  min={0}
                />
              </div>
              <div>
                <Label className="text-darkSeaGreen">Infants</Label>
                <Input
                  type="number"
                  className="w-full"
                  value={infants}
                  onChange={(e) => setInfants(Number(e.target.value))}
                  min={0}
                />
              </div>
            </div>
          </div>

          {/* Apply Button */}
          <Button onClick={handleApplyFilters} className="w-full mt-4">
            Apply Filters
          </Button>
        </DialogContent>
      </Dialog>

      {/* Sort By */}
      <Select onValueChange={setSortBy} defaultValue={sortBy}>
        <SelectTrigger className="w-[120px] border-0 rounded-none focus:outline-none active:outline-none border-solid border-b-0 border-b-stone-950 drop-shadow-none shadow-none font-semibold text-[20px] opacity-80">Sort By</SelectTrigger>

        <SelectContent>
          <SelectGroup>
            <SelectItem value="PriceAsc">Price (Ascending)</SelectItem>
            <SelectItem value="PriceDesc">Price (Descending)</SelectItem>
            <SelectItem value="FlightDurationAsc">
              Duration (Ascending)
            </SelectItem>
            <SelectItem value="FlightDurationDesc">
              Duration (Descending)
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Filters;
