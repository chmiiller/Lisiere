import Image from 'next/image';

export default function Home() {
  return (
    <div className=" w-96 items-center justify-items-center min-h-screen p-3 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Image
        src={'/sample.jpg'}
        alt='sample image'
        width={384}
        height={1}
      />
      <div className="bg-slate-50 h-14 p-3 w-full flex flex-row">
        <div className='flex flex-col flex-grow'>
          <p className='text-gray-800 text-5xs font-medium'>ISO1600 26mm f1.5 1/14s</p>
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
    </div>
  );
}
