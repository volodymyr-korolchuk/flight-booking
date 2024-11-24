import React, { ReactNode } from "react";
import HashLoader from "react-spinners/HashLoader";

interface Props {
  children?: ReactNode | ReactNode[];
}

const TicketsSkeleton: React.FC<Props> = ({ children }) => {
  return (
    <div className="w-full h-full flex flex-col gap-10 items-center justify-center border border-solid border-black/20 rounded-lg p-10 bg-white relative">
      <h4 className="text-[40px]">😄 Searching the best fits for your</h4>
      <HashLoader color="#CDCDCD" />
      {children}
    </div>
  );
};

export default TicketsSkeleton;
