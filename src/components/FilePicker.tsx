import { useRef, useState } from 'react';
import { Image as ImageIcon } from 'lucide-react';
import ExifReader from 'exifreader';
import { useLisiereStore } from '@/store-provider';
import { LogoOptions } from './LogoSelect';
import { exifTimestampAsDate } from '@/utils';

export type EXIFData = {
  Make: string;
  Model: string;
  DateTime: string;
  ExposureTime: number;
  FNumber: number;
  ISOSpeedRatings: number;
  ShutterSpeedValue: number;
  ApertureValue: number;
  FocalLength: number;
  LensMake: string;
  LensModel: string;
}

type FilePickerProps = {
  onImageSelected: (fileUrl: string) => void;
};

const FilePicker = ({ onImageSelected }: FilePickerProps) => {
  const imagePicker = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

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

  const handleImagePicker = (e: React.ChangeEvent<HTMLInputElement>) => {
    const curFiles = e.target.files;
    if (curFiles) {
      if (curFiles.length === 0) {
        setErrorMessage('no image selected');
      } else {
        const file = curFiles[0];
        if (validFileType(file)) {
          readExif(file);
          const imageSrc = URL.createObjectURL(file);
          onImageSelected(imageSrc);
        } else {
          setErrorMessage('invalid file');
        }
      }
    }
  }

  const readExif = async(file: File) => {
    const tags = await ExifReader.load(file);
    // TIMESTAMP
    const imageDate = tags['DateTimeOriginal']?.description;
    if (imageDate) {
      const formattedDate = exifTimestampAsDate(imageDate);
      setTimestamp(formattedDate);
    }
    // CAMERA BRAND
    const brand = tags['Make']?.description;
    if (brand) {
      const brandLogo = LogoOptions.find(logo => logo.name.toLowerCase() === brand.toLowerCase());
      if (brandLogo) {
        setCameraBrand(brandLogo.name);
        setSelectedIcon(brandLogo.url);
      }
    }
    // CAMERA MODEL
    const model = tags['Model']?.description;
    if (model) {
      setCameraModel(model);
    }
    // EXPOSURE (SPEED)
    const exposure = tags['ExposureTime']?.description;
    if (exposure) {
      setSpeed(exposure);
    }
    // F NUMBER
    const fnumber = tags['FNumber']?.description;
    if (fnumber) {
      setFstop(fnumber);
    }
    // FOCAL LENGTH
    const focalLength = tags['FocalLength']?.value;
    if (focalLength) {
      const [num, den] = focalLength.toString().split(",");
      if (num && den) {
        setFocalLength(parseInt(num)/parseInt(den));
      }
    }
    // ISO
    const iso = tags['ISOSpeedRatings']?.description;
    if (iso) {
      setIso(parseInt(iso));
    }
    // LENS BRAND
    const lensMake = tags['LensMake']?.description;
    if(lensMake) {
      setLensBrand(lensMake);
    }
    // LENS MODEL
    const lensModel = tags['LensModel']?.description;
    if(lensModel) {
      setLensModel(lensModel);
    }
  }

  return (
    <div className='flex flex-col items-center justify-center h-4/5 bg-slate-700'>
      <button
        title={'Upload an image'}
        className='cursor-pointer flex flex-col items-center justify-center w-full'
        onClick={(event) => {
          event.preventDefault();
          imagePicker?.current?.click();
        }}
      >
        <ImageIcon size={60}/>
        {!errorMessage && <p>Upload</p>}
        {errorMessage && <p className='text-red-300 w-full'>{errorMessage}</p>}
      </button>
      <input
        ref={imagePicker}
        style={{ display: 'none' }}
        type="file"
        id="image_uploads"
        name="image_uploads"
        accept=".jpg, .jpeg, .png"
        onChange={handleImagePicker}
      />
    </div>
  );
}

const fileTypes = [
  "image/apng",
  "image/bmp",
  "image/gif",
  "image/jpeg",
  "image/pjpeg",
  "image/png",
  "image/svg+xml",
  "image/tiff",
  "image/webp",
  "image/x-icon",
];

function validFileType(file: File) {
  return fileTypes.includes(file.type);
}

export default FilePicker;