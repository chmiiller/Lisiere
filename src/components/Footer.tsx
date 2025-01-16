import { useLisiereStore } from '@/store-provider';
import Image from 'next/image';

export default function Footer() {
  const {
    exif,
    timestamp,
    cameraModel,
    lensBrand,
    lensModel,
  } = useLisiereStore((state) => state);
  const formattedTimestamp = formatDate(timestamp);
  return (
    <div className="bg-slate-50 h-14 p-3 w-full flex flex-row">
        <div className='flex flex-col flex-grow'>
          <p className='text-gray-800 text-5xs font-medium'>
            {`${exif.iso} ${exif.focalLength}mm f${exif.fstop} ${exif.speed}s`}
          </p>
          <p className='text-gray-800 text-5xs font-extralight'>{`${formattedTimestamp}`}</p>
        </div>
        <div className='flex flex-row items-center justify-end w-20'>
          <Image
            src={'/logo/sony.svg'}
            width={60}
            height={60}
            alt='sony logo'
          />
          <div className='bg-gray-300 h-full rounded w-px ml-1' />
        </div>
        <div className='flex flex-grow flex-col items-end'>
          <p className='text-gray-800 text-5xs font-medium'>{`Sony ${cameraModel}`}</p>
          <p className='text-gray-800 text-5xs font-extralight'>{`${lensBrand} ${lensModel}`}</p>
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