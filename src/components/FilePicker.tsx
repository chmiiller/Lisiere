import { useRef, useState } from 'react';
import { Image as ImageIcon } from 'lucide-react';
import ExifReader from 'exifreader';

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
    const imageDate = tags['DateTimeOriginal']?.description;
    console.log(`imageDate: ${imageDate}`);
    const brand = tags['Make']?.value;
    console.log(`brand: ${brand}`);
    const model = tags['Model']?.value;
    console.log(`model: ${model}`);
    const timestamp = tags['DateTimeOriginal']?.value;
    console.log(`timestamp: ${timestamp}`);
    const exposure = tags['ExposureTime']?.value;
    console.log(`exposure: ${exposure}`);
    const fnumber = tags['FNumber']?.value;
    console.log(`fnumber: ${fnumber}`);
    const iso = tags['ISOSpeedRatings']?.value;
    console.log(`iso: ${iso}`);
    const shutter = tags['ShutterSpeedValue']?.value;
    console.log(`shutter: ${shutter}`);
    const aperture = tags['ApertureValue']?.value;
    console.log(`aperture: ${aperture}`);
    const focalLength = tags['FocalLength']?.value;
    console.log(`focalLength: ${focalLength}`);
    const lensSpecification = tags['LensSpecification']?.value;
    console.log(`lensSpecification: ${lensSpecification}`);
    const lensMake = tags['LensMake'];
    console.log(`lensMake: ${JSON.stringify(lensMake)}`);
    const lensModel = tags['LensModel']?.value;
    console.log(`lensModel: ${lensModel}`);
    const lensId = tags['Lens']?.value;
    console.log(`lensId: ${lensId}`);
    
    
  }

  return (
    <div className='flex flex-col items-center justify-center w-full h-36 bg-slate-700 rounded-md'>
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