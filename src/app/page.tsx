'use client'

import DatePicker from '@/components/DatePicker';
import Footer from '@/components/Footer';
import InputText from '@/components/InputText';
import ISOSelect from '@/components/ISOSelect';
import LogoSelect, { LogoOption } from '@/components/LogoSelect';
import { useLisiereStore } from '@/store-provider';
import html2canvas from 'html2canvas';
import { useRef } from 'react';

export default function Home() {
  const {
    setIso,
    setFocalLength,
    setFstop,
    setSpeed,
    setTimestamp,
    setSelectedIcon,
    setCameraModel,
    setCameraBrand,
    setLensBrand,
    setLensModel,
  } = useLisiereStore((state) => state);

  const containerRef = useRef(null);

  const createImage = () => {
    if(containerRef.current) {
      const container = containerRef.current;
      html2canvas(container).then((canvas) => {
        // Convert the canvas to a JPG image
        const image = canvas.toDataURL("image/jpeg", 0.8);

        // Create a link to download the image
        const link = document.createElement("a");
        link.href = image;
        link.download = "lisiere-image.jpg";
        link.click();
      });
    }
  }

  return (
    <div className=" w-96 items-center justify-items-center min-h-screen p-3 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div id='canvas-container' ref={containerRef}>
        <img
          src={'/sample.jpg'}
          alt='sample image'
          width={'100%'}
          height={'auto'}
        />
        <Footer />
      </div>
      <button onClick={() => {
        createImage();
      }}>Download Image</button>
      {/* Form container */}
      <div className='w-full mt-4 p-1 flex flex-col'>
        {/* ISO Select */}
        <ISOSelect onChange={value => setIso(value)}/>
        {/* Focal Length */}
        <InputText 
          id='focalLength'
          label="Focal Length"
          limit={4}
          numeric
          onChange={(value) => {
            if(parseInt(value)){
              setFocalLength(parseInt(value));
            }
          }}
        />
        {/* F-Stop */}
        <InputText
          id='fstop'
          label="F-stop"
          limit={4}
          numeric
          onChange={(value) => {
              setFstop(value as unknown as number);
          }}
        />
        {/* Shutter Speed */}
        <InputText id='speed' label="Shutter speed"
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
        <LogoSelect onChange={(item: LogoOption) => {
          setCameraBrand(item.name);
          setSelectedIcon(item.url);
        }}/>
        {/* Camera model */}
        <InputText id='camera' label="Camera model"
          onChange={(value) => {
            setCameraModel(value);
          }}
        />
        {/* Lens Maker */}
        <InputText id='lens_maker' label="Lens maker"
          onChange={(value) => {
            setLensBrand(value);
          }}
        />
        {/* Lens Model */}
        <InputText id='lens_model' label="Lens model"
          onChange={(value) => {
            setLensModel(value);
          }}
        />
      </div>
    </div>
  );
}
