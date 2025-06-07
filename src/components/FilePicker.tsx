import { Image as ImageIcon } from 'lucide-react';
import mixpanel from 'mixpanel-browser';
import React, { useRef, useState } from 'react';

import { MixpanelConstants } from '@/lib/mixpanelClient';
import { useLisiereStore } from '@/store-provider';
import {
  formatFileSize,
  getFileName,
  getValidFileType,
  parseExif,
} from '@/utils';

type FilePickerProps = {
  onImageSelected: (fileUrl: string, fileName: string) => void;
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
        mixpanel.track(MixpanelConstants.NoImageSelected);
      } else {
        const file = curFiles[0];
        const fileSize = formatFileSize(file.size);
        mixpanel.track(MixpanelConstants.SelectedImage, { size: fileSize });
        if (getValidFileType(file)) {
          readExif(file);
          const imageSrc = URL.createObjectURL(file);
          const imageName = getFileName(file.name);
          onImageSelected(imageSrc, imageName);
          mixpanel.track(MixpanelConstants.ReadImageSuccess);
        } else {
          setErrorMessage('invalid file');
          mixpanel.track(MixpanelConstants.InvalidFileType, {
            fileType: file.type,
          });
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
      mixpanel.track(MixpanelConstants.ReadCameraBrand, {
        readValue: exif.brandName,
      });
    }
    if (exif.brandLogo) {
      setSelectedIcon(exif.brandLogo);
    }
    if (exif.model) {
      setCameraModel(exif.model);
      mixpanel.track(MixpanelConstants.ReadCameraModel, {
        readValue: exif.model,
      });
    }
    if (exif.speed) {
      setSpeed(exif.speed);
      mixpanel.track(MixpanelConstants.ReadSpeed, { readValue: exif.speed });
    }
    if (exif.fstop) {
      setFstop(exif.fstop);
      mixpanel.track(MixpanelConstants.ReadFstop, { readValue: exif.fstop });
    }
    if (exif.focalLength) {
      setFocalLength(exif.focalLength);
      mixpanel.track(MixpanelConstants.ReadFocalLength, {
        readValue: exif.focalLength,
      });
    }
    if (exif.iso) {
      setIso(exif.iso);
      mixpanel.track(MixpanelConstants.ReadIso, { readValue: exif.iso });
    }
    if (exif.lensBrand) {
      setLensBrand(exif.lensBrand);
      mixpanel.track(MixpanelConstants.ReadLensBrand, {
        readValue: exif.lensBrand,
      });
    }
    if (exif.lensModel) {
      setLensModel(exif.lensModel);
      mixpanel.track(MixpanelConstants.ReadLensModel, {
        readValue: exif.lensModel,
      });
    }
  };

  return (
    <div className="flex h-64 w-full max-w-4xl flex-col items-center justify-center rounded-md bg-slate-700 p-1 sm:h-80 md:h-96">
      <button
        title={'Upload an image'}
        className="flex w-full cursor-pointer flex-col items-center justify-center"
        onClick={(event) => {
          event.preventDefault();
          mixpanel.track(MixpanelConstants.OpenedPicker);
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
