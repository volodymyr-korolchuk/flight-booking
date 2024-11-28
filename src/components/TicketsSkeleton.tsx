import React, { ReactNode } from "react";
import Loader from "react-spinners/SyncLoader";

interface Props {
  children?: ReactNode | ReactNode[];
}

const TicketsSkeleton: React.FC<Props> = ({ children }) => {
  return (
    <div className="w-full h-full flex flex-col gap-10 items-center justify-center border-black/20 rounded-lg p-10 bg-white relative">
      <h4 className="text-[40px]">😄 Searching the best fits for your</h4>
      <Loader color="#81C784" />
      {children}
    </div>
  );
};

export default TicketsSkeleton;
