import React from 'react';

import { useLisiereStore } from '@/store-provider';
import { formatDateForFooter } from '@/utils';

export default function Footer() {
  const {
    exif,
    timestamp,
    cameraBrand,
    cameraModel,
    lensBrand,
    lensModel,
    selectedIcon,
  } = useLisiereStore((state) => state);
  const formattedTimestamp = formatDateForFooter(timestamp);
  return (
    <div
      className="flex h-1/5 w-full flex-row bg-slate-50 p-4"
      data-testid={'footer'}
    >
      {/* Left side */}
      <div className="flex flex-grow flex-col">
        <p
          className="text-left text-5xs font-medium text-gray-800 sm:text-2xs"
          data-testid={'footer_iso'}
        >
          {`ISO ${exif.iso} ${exif.focalLength}mm ${exif.fstop} ${exif.speed}s`}
        </p>
        <p
          className="text-left text-5xs font-extralight text-gray-800 sm:text-2xs"
          data-testid={'footer_timestamp'}
        >{`${formattedTimestamp}`}</p>
      </div>
      {/* Camera logo */}
      <div className="flex w-16 flex-row items-center justify-end sm:w-20 md:w-36">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="w-14 sm:w-16 md:w-20"
          src={selectedIcon}
          alt="camera logo"
        />
        {/* Vertical Separator */}
        <div className="ml-1 h-full w-px rounded bg-gray-300" />
      </div>
      {/* Right side */}
      <div className="flex flex-grow flex-row">
        <div className="flex flex-grow flex-col items-end">
          <p
            className="text-right text-5xs font-medium text-gray-800 sm:text-2xs"
            data-testid={'footer_camera'}
          >{`${cameraBrand} ${cameraModel}`}</p>
          <p
            className="max-w-32 text-right text-5xs font-extralight text-gray-800 sm:text-2xs"
            data-testid={'footer_lens'}
          >{`${lensBrand} ${lensModel}`}</p>
        </div>
      </div>
    </div>
  );
}
