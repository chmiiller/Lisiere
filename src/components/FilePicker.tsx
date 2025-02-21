import { Image as ImageIcon } from 'lucide-react';
import React, { useRef, useState } from 'react';

import { useLisiereStore } from '@/store-provider';
import { getValidFileType, parseExif } from '@/utils';

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
        if (getValidFileType(file)) {
          readExif(file);
          const imageSrc = URL.createObjectURL(file);
          onImageSelected(imageSrc);
        } else {
          setErrorMessage('invalid file');
        }
      }
    }
  };

  const readExif = async (file: File) => {
    const exif = await parseExif(file);
    if (exif.timestamp) {
      setTimestamp(exif.timestamp);
    }
    if (exif.brandName) {
      setCameraBrand(exif.brandName);
    }
    if (exif.brandLogo) {
      setSelectedIcon(exif.brandLogo);
    }
    if (exif.model) {
      setCameraModel(exif.model);
    }
    if (exif.speed) {
      setSpeed(exif.speed);
    }
    if (exif.fstop) {
      setFstop(exif.fstop);
    }
    if (exif.focalLength) {
      setFocalLength(exif.focalLength);
    }
    if (exif.iso) {
      setIso(exif.iso);
    }
    if (exif.lensBrand) {
      setLensBrand(exif.lensBrand);
    }
    if (exif.lensModel) {
      setLensModel(exif.lensModel);
    }
  };

  return (
    <div className="flex h-64 w-full max-w-4xl flex-col items-center justify-center rounded-md bg-slate-700 p-1 sm:h-80 md:h-96">
      <button
        title={'Upload an image'}
        className="flex w-full cursor-pointer flex-col items-center justify-center"
        onClick={(event) => {
          event.preventDefault();
          imagePicker?.current?.click();
        }}
      >
        <ImageIcon size={60} />
        {!errorMessage && <p>Upload</p>}
        {errorMessage && <p className="w-full text-red-300">{errorMessage}</p>}
      </button>
      <input
        data-testid={'image_upload'}
        id="image_upload"
        name="image_upload"
        ref={imagePicker}
        style={{ display: 'none' }}
        type="file"
        accept=".jpg, .jpeg, .png"
        onChange={handleImagePicker}
      />
    </div>
  );
};

export default FilePicker;
