'use client';

import html2canvas from 'html2canvas-pro';
import { ArrowUpFromLine, Download } from 'lucide-react';
import mixpanel from 'mixpanel-browser';
import React, { useRef, useState } from 'react';

import Button from '@/components/Button';
import DatePicker from '@/components/DatePicker';
import FilePicker from '@/components/FilePicker';
import Footer from '@/components/Footer';
import InputText from '@/components/InputText';
import ISOSelect from '@/components/ISOSelect';
import LogoSelect, { LogoOption } from '@/components/LogoSelect';
import { MixpanelConstants } from '@/lib/mixpanelClient';
import { useLisiereStore } from '@/store-provider';

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
  const [imagePath, setImagePath] = useState<string>('');
  const [debugMessage, setDebugMessage] = useState<string>('');

  const updateDebugMessage = (message: string) => {
    setDebugMessage((old) => old + ` ${message}`);
  };

  const createImage = () => {
    mixpanel.track(MixpanelConstants.DownloadImageAttempt);
    if (containerRef.current) {
      const container = containerRef.current;
      html2canvas(container).then((canvas) => {
        // Convert the canvas to a JPG image
        const image = canvas.toDataURL('image/jpeg', 1.0);

        // Create a link to download the image
        const link = document.createElement('a');
        link.href = image;
        link.download = 'lisiere-image.jpg';
        link.click();
        mixpanel.track(MixpanelConstants.DownloadImageSuccess);
      });
    }
  };

  /*
  Function checkBasicFileShare() {
    const txt = new Blob(['Hello, world!'], { type: 'text/plain' });
    const file = new File([txt], 'test.txt');
    return navigator.canShare({ files: [file] });
  }

  const shareImage = async () => {
    if (containerRef.current) {
      const container = containerRef.current;
      html2canvas(container).then((canvas) => {
        canvas.toBlob(async (imageBlob) => {
          if (imageBlob) {
            const imageFile = new File([imageBlob], 'yourImageFileName.jpg', {
              type: imageBlob.type,
            });
            const selectedFiles = [imageFile];
            try {
              await navigator.share({
                files: selectedFiles,
              });
              updateDebugMessage('Successfully sent share');
            } catch (error) {
              updateDebugMessage('Error sharing: ' + error);
            }
          }
        });
      });
    }
  };
*/
  async function generateCanvasFromHTML(): Promise<HTMLCanvasElement | null> {
    return new Promise<HTMLCanvasElement | null>((resolve) => {
      if (containerRef.current) {
        const container = containerRef.current;
        html2canvas(container)
          .then((canvas) => {
            resolve(canvas);
          })
          .catch(() => {
            resolve(null);
          });
      }
    });
  }

  return (
    <div
      className={`flex min-h-screen w-full flex-col items-center justify-center p-3 pb-20 font-[family-name:var(--font-geist-sans)]`}
    >
      <p>{debugMessage}</p>
      <div className="flex w-full max-w-sm flex-col p-1 sm:max-w-sm md:max-w-md lg:max-w-lg">
        {imagePath && (
          // Image and Footer to be rendered in the end
          <div ref={containerRef}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={imagePath} alt="uploaded image" />
            <Footer />
          </div>
        )}
        {!imagePath && (
          <FilePicker
            onImageSelected={(imagePath) => {
              setImagePath(imagePath);
            }}
          />
        )}
      </div>
      {/* Form container */}
      <div className="mt-1 flex w-full max-w-4xl flex-col p-1">
        <DownloadButton onClick={createImage} />
        <ShareButton
          onClick={async () => {
            const canvas = await generateCanvasFromHTML();
            if (canvas) {
              canvas.toBlob(async (imageBlob: Blob | null) => {
                if (imageBlob) {
                  const imageFile = new File(
                    [imageBlob],
                    'yourImageFileName.jpg',
                    {
                      type: imageBlob.type,
                    },
                  );
                  const selectedFiles = [imageFile];

                  try {
                    await navigator.share({
                      files: selectedFiles,
                    });
                    updateDebugMessage('Successfully sent share');
                  } catch (error) {
                    updateDebugMessage('Error sharing: ' + error);
                  }
                }
              });
            }
          }}
        />
        {/* ISO Select */}
        <ISOSelect value={exif.iso} onChange={(value) => setIso(value)} />
        {/* Focal Length */}
        <InputText
          id="focalLength"
          label="Focal Length"
          limit={4}
          numeric
          value={exif.focalLength.toString()}
          onChange={(value) => {
            if (parseInt(value)) {
              setFocalLength(parseInt(value));
            }
          }}
        />
        {/* F-Stop */}
        <InputText
          id="fstop"
          label="F-stop"
          limit={4}
          numeric
          value={exif.fstop}
          onChange={(value) => {
            setFstop(value);
          }}
        />
        {/* Shutter Speed */}
        <InputText
          id="speed"
          label="Shutter speed"
          limit={4}
          value={exif.speed}
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
        <LogoSelect
          value={cameraBrand}
          onChange={(item: LogoOption) => {
            mixpanel.track(MixpanelConstants.ChangedCameraLogo, {
              from: cameraBrand,
              to: item.name,
            });
            setCameraBrand(item.name);
            setSelectedIcon(item.url);
          }}
        />
        {/* Camera model */}
        <InputText
          id="camera"
          label="Camera model"
          value={cameraModel}
          onChange={(value) => {
            setCameraModel(value);
          }}
        />
        {/* Lens Maker / Brand */}
        <InputText
          id="lens_maker"
          label="Lens maker"
          value={lensBrand}
          onChange={(value) => {
            setLensBrand(value);
          }}
        />
        {/* Lens Model */}
        <InputText
          id="lens_model"
          label="Lens model"
          value={lensModel}
          onChange={(value) => {
            setLensModel(value);
          }}
        />
        <UpButton />
      </div>
    </div>
  );
}

const DownloadButton = ({ onClick }: { onClick: () => void }) => (
  <div className="mt-3 flex w-full justify-center">
    <Button title={'Download'} onClick={onClick}>
      <Download size={18} />
    </Button>
  </div>
);

const ShareButton = ({ onClick }: { onClick: () => void }) => (
  <div className="mt-3 flex w-full justify-center">
    <Button title={'Share 14:56'} onClick={onClick}>
      <Download size={18} />
    </Button>
  </div>
);

const UpButton = () => (
  <div className="mt-4 flex w-full justify-start">
    <Button
      title={'Done'}
      onClick={() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
    >
      <ArrowUpFromLine size={18} />
    </Button>
  </div>
);
