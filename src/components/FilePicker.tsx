import { useRef, useState } from 'react';
import { Image as ImageIcon } from 'lucide-react';

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
          const imageSrc = URL.createObjectURL(file);
          onImageSelected(imageSrc);
        } else {
          setErrorMessage('invalid file');
        }
      }
    }
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