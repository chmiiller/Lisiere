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
    <div className="bg-slate-50 h-14 p-3 flex flex-row">
        <div className='flex flex-col flex-grow'>
          <p className='text-gray-800 text-5xs m-0 p-0 font-medium'>
            {`ISO ${exif.iso} ${exif.focalLength}mm f${exif.fstop} ${exif.speed}s`}
          </p>
          <p className='text-gray-800 text-5xs m-0 p-0 font-extralight'>{`${formattedTimestamp}`}</p>
        </div>
        <div className='flex flex-row items-center justify-end w-20'>
          <img
            src={selectedIcon}          
            height={60}
            width={60}
            alt='camera logo'
          />
          <div className='bg-gray-300 h-full rounded w-px ml-1' />
        </div>
        <div className='flex flex-grow flex-col items-end'>
          <p className='text-gray-800 text-5xs font-medium m-0 p-0'>{`${cameraBrand} ${cameraModel}`}</p>
          <p className='text-gray-800 text-5xs font-extralight m-0 p-0'>{`${lensBrand} ${lensModel}`}</p>
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