import { useLisiereStore } from '@/store-provider';
import Image from 'next/image';

export default function Footer() {
  const { exif } = useLisiereStore((state) => state)
  return (
    <div className="bg-slate-50 h-14 p-3 w-full flex flex-row">
        <div className='flex flex-col flex-grow'>
          <p className='text-gray-800 text-5xs font-medium'>{`${exif.iso} 26mm f1.5 1/14s`}</p>
          <p className='text-gray-800 text-5xs font-extralight'>28 Dec, 2024</p>
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
          <p className='text-gray-800 text-5xs font-medium'>Apple iPhone 14</p>
          <p className='text-gray-800 text-5xs font-extralight'>back dual wide camera 5.7mm f1.5</p>
        </div>
      </div>
  );
}