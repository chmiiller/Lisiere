'use client'

import DatePicker from '@/components/DatePicker';
import Footer from '@/components/Footer';
import { useLisiereStore } from '@/store-provider';
import Image from 'next/image';

export default function Home() {
  const { setIso,
    setFocalLength,
    setFstop,
    setSpeed,
    setTimestamp,
    setCameraModel,
    setLensBrand,
    setLensModel,
  } = useLisiereStore((state) => state);

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
        <label htmlFor="iso" className='text-violet-50'>ISO:</label>
        <select
          value={50}
          onChange={e => setIso(parseInt(e.target.value))}
        >
          <option value="50">ISO 50</option>
          <option value="100">ISO 100</option>
          <option value="150">ISO 150</option>
          <option value="200">ISO 200</option>
          <option value="400">ISO 400</option>
          <option value="800">ISO 800</option>
          <option value="1600">ISO 1600</option>
          <option value="3200">ISO 3200</option>
          <option value="6400">ISO 6400</option>
          <option value="12800">ISO 12800</option>
          <option value="25600">ISO 25600</option>
          <option value="51200">ISO 51200</option>
          <option value="102400">ISO 102400</option>
        </select>
        <label htmlFor="focalLength" className='text-violet-50'>Focal Length:</label>
        <input
          id={"focalLength"}
          name={"focal length"}
          type='text'
          maxLength={5}
          onChange={(e) => {
            if(parseInt(e.currentTarget.value)){
              setFocalLength(parseInt(e.currentTarget.value));
            }
          }}
        />
        <label htmlFor="fstop" className='text-violet-50'>f-stop:</label>
        <input
          id={"fstop"}
          name={"fstop"}
          type='text'
          maxLength={4}
          onChange={(e) => {
            if(parseInt(e.currentTarget.value)){
              setFstop(parseInt(e.currentTarget.value));
            }
          }}
        />
        <label htmlFor="speed" className='text-violet-50'>Shutter speed:</label>
        <input
          id={"speed"}
          name={"speed"}
          type='text'
          onChange={(e) => {
            setSpeed(e.currentTarget.value);
          }}
        />
        <DatePicker
          initialDate=""
          onDateChange={(selectedDate: string) => {
            setTimestamp(new Date(selectedDate));
          }}
        />
        <label htmlFor="camera" className='text-violet-50'>Camera model:</label>
        <input
          id={"camera"}
          name={"camera"}
          type='text'
          onChange={(e) => {
            setCameraModel(e.currentTarget.value);
          }}
        />
        <label htmlFor="lens_maker" className='text-violet-50'>Lens maker:</label>
        <input
          id={"lens_maker"}
          name={"lens_maker"}
          type='text'
          onChange={(e) => {
            setLensBrand(e.currentTarget.value);
          }}
        />
        <label htmlFor="lens_model" className='text-violet-50'>Lens model:</label>
        <input
          id={"lens_model"}
          name={"lens_model"}
          type='text'
          onChange={(e) => {
            setLensModel(e.currentTarget.value);
          }}
        />
      </div>
    </div>
  );
}
