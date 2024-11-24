// LocationAutocomplete.tsx
import React, { useState } from 'react';
import Autosuggest, { SuggestionsFetchRequestedParams, ChangeEvent } from 'react-autosuggest';

// Define the types for the location data
type Location = {
  code: string;
  name: string;
};

type LocationAutocompleteProps = {
  label: string;
  onLocationSelect: (code: string) => void;
};

// Example list of locations
const locations: Location[] = [
  { code: 'JFK', name: 'John F. Kennedy International Airport, New York' },
  { code: 'LON', name: 'London Heathrow Airport' },
  { code: 'LAX', name: 'Los Angeles International Airport' },
  { code: 'CDG', name: 'Charles de Gaulle Airport, Paris' },
  { code: 'DXB', name: 'Dubai International Airport' },
  { code: 'SIN', name: 'Singapore Changi Airport' },
  // Add more locations as needed
];

// Helper function to get suggestions based on user input
const getSuggestions = (value: string): Location[] => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  // Return filtered locations based on the input value
  return inputLength === 0
    ? []
    : locations.filter((location) =>
        location.name.toLowerCase().includes(inputValue)
      );
};

// Helper function to get the name of the location as a suggestion value
const getSuggestionValue = (suggestion: Location): string => suggestion.name;

// Component to render each suggestion item
const renderSuggestion = (suggestion: Location) => (
  <div>{suggestion.name} ({suggestion.code})</div>
);

const LocationAutocomplete: React.FC<LocationAutocompleteProps> = ({ label, onLocationSelect }) => {
  const [value, setValue] = useState<string>('');
  const [suggestions, setSuggestions] = useState<Location[]>([]);

  // Called when suggestions need to be updated
  const onSuggestionsFetchRequested = ({ value }: SuggestionsFetchRequestedParams) => {
    setSuggestions(getSuggestions(value));
  };

  // Called when suggestions should be cleared
  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  // Called when a suggestion is selected
  const onSuggestionSelected = (
    event: React.FormEvent,
    { suggestion }: { suggestion: Location }
  ) => {
    setValue(suggestion.name);
    onLocationSelect(suggestion.code); // Pass the code to the parent component
  };

  // Properly typed onChange event handler
  const inputProps = {
    placeholder: `Enter ${label} Location`,
    value,
    onChange: (_: React.FormEvent<HTMLElement>, { newValue }: ChangeEvent) => {
      setValue(newValue);
    },
  };

  return (
    <div className="mb-4 relative">
      <label className="mb-1 block text-sm font-medium leading-4 text-darkSeaGreen">{label}</label>
      <div className="relative">
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
          onSuggestionSelected={onSuggestionSelected}
          theme={{
            input: 'w-[180px] border border-solid border-chineseWhite rounded-md pl-2 pr-7 py-4 text-sm leading-4 text-raisinBlack font-medium',
            suggestionsContainer: 'absolute left-0 right-0 top-full border border-solid border-chineseWhite rounded-sm bg-white max-h-[200px] overflow-y-auto [scrollbar-width:thin] empty:hidden',
            suggestion: 'px-2 py-4 text-sm leading-4 text-raisinBlack',
            suggestionHighlighted: 'bg-darkSeaGreen text-white',
          }}
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_1_316)">
            <path d="M2.25 7.5C2.25 8.18944 2.3858 8.87213 2.64963 9.50909C2.91347 10.146 3.30018 10.7248 3.78769 11.2123C4.2752 11.6998 4.85395 12.0865 5.49091 12.3504C6.12787 12.6142 6.81056 12.75 7.5 12.75C8.18944 12.75 8.87213 12.6142 9.50909 12.3504C10.146 12.0865 10.7248 11.6998 11.2123 11.2123C11.6998 10.7248 12.0865 10.146 12.3504 9.50909C12.6142 8.87213 12.75 8.18944 12.75 7.5C12.75 6.81056 12.6142 6.12787 12.3504 5.49091C12.0865 4.85395 11.6998 4.2752 11.2123 3.78769C10.7248 3.30018 10.146 2.91347 9.50909 2.64963C8.87213 2.3858 8.18944 2.25 7.5 2.25C6.81056 2.25 6.12787 2.3858 5.49091 2.64963C4.85395 2.91347 4.2752 3.30018 3.78769 3.78769C3.30018 4.2752 2.91347 4.85395 2.64963 5.49091C2.3858 6.12787 2.25 6.81056 2.25 7.5Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M15.75 15.75L11.25 11.25" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </g>
            <defs>
            <clipPath id="clip0_1_316">
            <rect width="18" height="18" fill="white"/>
            </clipPath>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default LocationAutocomplete;