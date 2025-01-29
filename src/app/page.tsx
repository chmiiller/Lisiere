'use client'

import { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { ArrowUpFromLine, Download } from 'lucide-react';

import { useLisiereStore } from '@/store-provider';

import Button from '@/components/Button';
import DatePicker from '@/components/DatePicker';
import Footer from '@/components/Footer';
import InputText from '@/components/InputText';
import ISOSelect from '@/components/ISOSelect';
import LogoSelect, { LogoOption } from '@/components/LogoSelect';
import FilePicker from '@/components/FilePicker';

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
    exif,
    timestamp,
    cameraBrand,
    cameraModel,
    lensBrand,
    lensModel,
  } = useLisiereStore((state) => state);

  const containerRef = useRef<HTMLDivElement>(null);
  const [imagePath, setImagePath] = useState<string>("");

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
      {/* Image and Footer to be rendered in the end */}
      <div id='canvas-container' ref={containerRef}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {imagePath && <img src={imagePath} alt='uploaded image' />}
        {!imagePath && (
          <FilePicker onImageSelected={(imagePath) => {
            setImagePath(imagePath);
          }}/>
        )}
        <Footer />
      </div>
      <DownloadButton onClick={createImage}/>
      
      {/* Form container */}
      <div className='w-full mt-4 p-1 flex flex-col'>
        {/* ISO Select */}
        <ISOSelect value={exif.iso} onChange={value => setIso(value)}/>
        {/* Focal Length */}
        <InputText 
          id='focalLength'
          label="Focal Length"
          limit={4}
          numeric
          value={exif.focalLength.toString()}
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
          value={exif.fstop}
          onChange={(value) => {
              setFstop(value);
          }}
        />
        {/* Shutter Speed */}
        <InputText id='speed' label="Shutter speed" value={exif.speed}
          onChange={(value) => {
            setSpeed(value);
          }}
        />
        {/* Date */}
        <DatePicker
          value={timestamp ? timestamp : undefined}
          onDateChange={(selectedDate: string) => {
            setTimestamp(new Date(selectedDate));
          }}
        />
        <LogoSelect value={cameraBrand} onChange={(item: LogoOption) => {
          setCameraBrand(item.name);
          setSelectedIcon(item.url);
        }}/>
        {/* Camera model */}
        <InputText id='camera' label="Camera model" value={cameraModel}
          onChange={(value) => {
            setCameraModel(value);
          }}
        />
        {/* Lens Maker / Brand */}
        <InputText id='lens_maker' label="Lens maker" value={lensBrand}
          onChange={(value) => {
            setLensBrand(value);
          }}
        />
        {/* Lens Model */}
        <InputText id='lens_model' label="Lens model" value={lensModel}
          onChange={(value) => {
            setLensModel(value);
          }}
        />
        <UpButton />
      </div>
    </div>
  );
}

const DownloadButton = ({ onClick }: {onClick: () => void}) => {
  return (
    <div className='mt-3 w-full flex justify-end'>
      <Button
        title={'Download'}
        onClick={onClick}>
        <Download size={18}/>
      </Button>
    </div>
  );
}

const UpButton = () => {
  return (
    <div className='mt-4 w-full flex justify-start'>
      <Button
        title={'Done'}
        onClick={() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}>
        <ArrowUpFromLine size={18}/>
      </Button>
    </div>
  );
}