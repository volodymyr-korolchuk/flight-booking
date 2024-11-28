"use client";

import React from "react";
import { usePathname } from "next/navigation"; // Hook to get the current path
import { HeaderPlaneSvg, UserSvg } from "./svgs";
import Link from "next/link";

const Header = () => {
  const pathname = usePathname();
  const renderUserIcon = pathname !== "/auth";

  return (
    <header className="w-full bg-darkSeaGreen p-3 flex justify-between drop-shadow-lg fixed rounded-b-lg top-0 z-[5]">
      <Link href="/search" className="w-fit flex items-center justify-center gap-x-2">
        <HeaderPlaneSvg />
        <p className="text-white">AirWay</p>
      </Link>
      {renderUserIcon && (
        <button className="cursor-pointer">
          <UserSvg />
        </button>
      )}
    </header>
  );
};

export default Header;
