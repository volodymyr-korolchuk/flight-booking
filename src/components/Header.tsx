"use client";

import React from "react";
import { usePathname } from "next/navigation"; // Hook to get the current path

const PlaneSvg = () => (
  <>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="42"
      height="40"
      viewBox="0 0 42 40"
      fill="none"
    >
      <g clip-path="url(#clip0_4_78)">
        <path
          d="M25.2521 17.0967L33.4909 14.94C33.9267 14.817 34.3832 14.7802 34.8337 14.8317C35.2842 14.8831 35.7196 15.0219 36.1146 15.2397C36.5096 15.4576 36.8561 15.7502 37.134 16.1005C37.4118 16.4508 37.6154 16.8517 37.7328 17.2798C37.8502 17.7079 37.879 18.1545 37.8176 18.5936C37.7562 19.0327 37.6058 19.4554 37.3753 19.8371C37.1447 20.2187 36.8385 20.5516 36.4747 20.8162C36.1109 21.0809 35.6967 21.272 35.2564 21.3783L10.5417 27.85L2.95105 19.4833L7.89263 18.19L12.0717 20.5467L17.0133 19.2533L10.6287 8.84667L15.5719 7.55167L25.2521 17.0967Z"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M5.3988 35H36.1024"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_4_78">
          <rect
            width="40.9382"
            height="40"
            fill="white"
            transform="translate(0.281494)"
          />
        </clipPath>
      </defs>
    </svg>
  </>
);

const UserSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
  >
    <circle cx="20" cy="20" r="20" fill="white" />
    <g clip-path="url(#clip0_49_2)">
      <path
        d="M16.0471 14C16.0471 15.0609 16.4784 16.0783 17.2462 16.8284C18.0139 17.5786 19.0552 18 20.1409 18C21.2267 18 22.268 17.5786 23.0357 16.8284C23.8034 16.0783 24.2348 15.0609 24.2348 14C24.2348 12.9391 23.8034 11.9217 23.0357 11.1716C22.268 10.4214 21.2267 10 20.1409 10C19.0552 10 18.0139 10.4214 17.2462 11.1716C16.4784 11.9217 16.0471 12.9391 16.0471 14Z"
        stroke="#81C784"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M14 28V26C14 24.9391 14.4313 23.9217 15.1991 23.1716C15.9668 22.4214 17.0081 22 18.0938 22H22.1876C23.2734 22 24.3147 22.4214 25.0824 23.1716C25.8501 23.9217 26.2815 24.9391 26.2815 26V28"
        stroke="#81C784"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_49_2">
        <rect
          width="24.5629"
          height="24"
          fill="white"
          transform="translate(7.92114 7)"
        />
      </clipPath>
    </defs>
  </svg>
);

const Header = () => {
  const pathname = usePathname();
  const renderUserIcon = pathname !== "/auth";

  return (
    <header className="w-full bg-darkSeaGreen p-3 flex justify-between">
      <div className="w-fit flex items-center justify-center gap-x-2">
        <PlaneSvg />
        <p className="text-white">AirWay</p>
      </div>
      {renderUserIcon && (
        <button className="cursor-pointer">
          <UserSvg />
        </button>
      )}
    </header>
  );
};

export default Header;
