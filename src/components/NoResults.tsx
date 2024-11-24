import { useRouter } from "next/navigation";
import React, { ReactNode } from "react";

interface Props {
  children?: ReactNode | ReactNode[];
}

const NoResults: React.FC<Props> = ({ children }) => {
  const router = useRouter();
  return (
    <div className="w-full h-full flex flex-col gap-10 items-center justify-center border border-solid border-black/20 rounded-lg p-10 bg-white relative">
      <h4 className="text-[30px]">
        We couldn't find any results for this request... 🤔
      </h4>
      <button onClick={() => router.push("/")} className="bg-[#DCE3FF] hover:saturate-200 px-4 py-2 border border-solid border-black/50 rounded-md">
        Back to Search
      </button>
      {children}
    </div>
  );
};

export default NoResults;
