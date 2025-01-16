'use client'

import DatePicker from '@/components/DatePicker';
import Footer from '@/components/Footer';
import InputText from '@/components/InputText';
import ISOSelect from '@/components/ISOSelect';
import { useLisiereStore } from '@/store-provider';
import Image from 'next/image';

export default function Home() {
  const {
    setIso,
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
        {/* ISO Select */}
        <ISOSelect onChange={value => setIso(value)}/>
        {/* Focal Length */}
        <InputText id='focalLength' label="Focal Length:" limit={4}
          onChange={(value) => {
            if(parseInt(value)){
              setFocalLength(parseInt(value));
            }
          }}
        />
        {/* F-Stop */}
        <InputText id='fstop' label="f-stop:" limit={4}
          onChange={(value) => {
            if(parseFloat(value)){
              setFstop(parseFloat(value));
            }
          }}
        />
        {/* Shutter Speed */}
        <InputText id='speed' label="Shutter speed:"
          onChange={(value) => {
            setSpeed(value);
          }}
        />
        {/* Date */}
        <DatePicker
          onDateChange={(selectedDate: string) => {
            setTimestamp(new Date(selectedDate));
          }}
        />
        {/* Camera model */}
        <InputText id='camera' label="Camera model:"
          onChange={(value) => {
            setCameraModel(value);
          }}
        />
        {/* Lens Maker */}
        <InputText id='lens_maker' label="Lens maker:"
          onChange={(value) => {
            setLensBrand(value);
          }}
        />
        {/* Lens Model */}
        <InputText id='lens_model' label="Lens model:"
          onChange={(value) => {
            setLensModel(value);
          }}
        />
      </div>
    </div>
  );
}
