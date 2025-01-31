import { useLisiereStore } from '@/store-provider';

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
  const formattedTimestamp = formatDate(timestamp);
  return (
    <div className="flex flex-row bg-slate-50 h-1/5 p-4 w-full">
      {/* Left side */}
      <div className='flex flex-col flex-grow'>
        <p className='text-gray-800 text-5xs sm:text-2xs font-medium text-left'>
          {`ISO ${exif.iso} ${exif.focalLength}mm ${exif.fstop} ${exif.speed}s`}
        </p>
        <p className='text-gray-800 text-5xs sm:text-2xs font-extralight text-left'>{`${formattedTimestamp}`}</p>
      </div>
      {/* Camera logo */}
      <div className='flex flex-row items-center justify-end w-16 sm:w-20 md:w-36'>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className='w-14 sm:w-16 md:w-20' src={selectedIcon} alt='camera logo' />
        {/* Vertical Separator */}
        <div className='bg-gray-300 h-full rounded w-px ml-1' />
      </div>
      {/* Right side */}
      <div className='flex flex-grow flex-row '>
        <div className='flex flex-grow flex-col items-end'>
          <p className='text-gray-800 text-5xs font-medium sm:text-2xs text-right'>{`${cameraBrand} ${cameraModel}`}</p>
          <p className='text-gray-800 text-5xs font-extralight sm:text-2xs text-right max-w-32'>{`${lensBrand} ${lensModel}`}</p>
        </div>
      </div>
      
    </div>
  );
}

function formatDate(date: Date) {
  if (!(date instanceof Date)) {
      return "Invalid Date";
  }

  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
}).replace(/(\d+)\s(\w+)\s(\d+)/, "$1 $2 $3");
}