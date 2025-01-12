'use client'

import Footer from '@/components/Footer';
import { useLisiereStore } from '@/store-provider';
import Image from 'next/image';

export default function Home() {
  const { setIso } = useLisiereStore((state) => state)
  return (
    <div className=" w-96 items-center justify-items-center min-h-screen p-3 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Image
        src={'/sample.jpg'}
        alt='sample image'
        width={384}
        height={1}
      />
      <Footer />
      {/* Form container */}
      <div className='border-l-rose-400 border w-full mt-4 p-1 flex flex-col'>
        <label htmlFor="iso" className='text-violet-50'>
          ISO:
        </label>
        <input
          className='text-gray-800'
          type="text"
          id="iso"
          name="iso"
          size={3}
          onChange={(e) => {
            setIso(parseInt(e.target.value))
          }}
        />
      </div>
    </div>
  );
}
