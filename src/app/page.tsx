'use client';

import html2canvas from 'html2canvas-pro';
import { ArrowUpFromLine, Download, Share, Share2 } from 'lucide-react';
import mixpanel from 'mixpanel-browser';
import Link from 'next/link';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import Button from '@/components/Button';
import DatePicker from '@/components/DatePicker';
import FilePicker from '@/components/FilePicker';
import Footer from '@/components/Footer';
import InputText from '@/components/InputText';
import ISOSelect from '@/components/ISOSelect';
import LogoSelect, { LogoOption } from '@/components/LogoSelect';
import { MixpanelConstants } from '@/lib/mixpanelClient';
import { useLisiereStore } from '@/store-provider';
import { getPlatform } from '@/utils';
import { createClient } from '@/utils/supabase/client';

export default function Home() {
  const supabase = createClient();

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
  const [imageName, setImageName] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [debugMessage, setDebugMessage] = useState<string>('');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const platform = getPlatform();

  const getProfile = useCallback(async () => {
    try {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.log(error);
        throw error;
      }
      if (data?.user?.email) {
        setUserEmail(data?.user?.email);
      }
    } catch (error) {
      console.log(
        `---------------------> home error: ${JSON.stringify(error, null, '    ')}`,
      );
    }
  }, [supabase]);

  useEffect(() => {
    getProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateDebugMessage = (message: string) => {
    setDebugMessage((old) => old + ` ${message}`);
  };

  const createImage = (): Promise<HTMLCanvasElement | null> =>
    new Promise((resolve) => {
      if (containerRef.current) {
        html2canvas(containerRef.current)
          .then((canvas) => {
            resolve(canvas);
          })
          .catch(() => {
            resolve(null);
          });
      }
    });

  const generateFile = (canvas: HTMLCanvasElement): Promise<File | null> =>
    new Promise<File | null>((resolve) => {
      canvas.toBlob((imageBlob: Blob | null) => {
        if (imageBlob) {
          const imageFile = new File([imageBlob], `${imageName}.jpg`, {
            type: imageBlob.type,
          });
          resolve(imageFile);
        } else {
          resolve(null);
        }
      }, 'image/jpeg');
    });

  const downloadImage = async () => {
    mixpanel.track(MixpanelConstants.DownloadImageAttempt);
    const canvas = await createImage();
    if (canvas) {
      const image = canvas.toDataURL('image/jpeg', 1.0);
      const link = document.createElement('a');
      link.href = image;
      link.download = `${imageName}-lisiere.jpg`;
      link.click();
      mixpanel.track(MixpanelConstants.DownloadImageSuccess);
    }
  };

  const shareImage = async () => {
    if (selectedFiles.length === 0) {
      mixpanel.track(MixpanelConstants.ShareImageAttempt);
      const canvas = await createImage();
      if (canvas) {
        const file = await generateFile(canvas);
        if (file) {
          const fileArray: File[] = [file];
          setSelectedFiles(fileArray);
        }
      }
    } else {
      if (selectedFiles) {
        try {
          await navigator.share({
            files: selectedFiles,
          });
          mixpanel.track(MixpanelConstants.ShareImageSuccess);
          updateDebugMessage('Successfully sent share');
        } catch (error) {
          mixpanel.track(MixpanelConstants.ShareImageFail);
          updateDebugMessage('Error sharing: ' + error);
        }
        setSelectedFiles([]);
      }
    }
  };

  return (
    <div
      className={`flex min-h-screen w-full flex-col items-center justify-center p-3 pb-20 font-[family-name:var(--font-geist-sans)]`}
    >
      <p>{debugMessage}</p>
      <Link href={userEmail ? '/account' : '/login'}>
        <div
          className={`mb-3 flex w-auto max-w-32 cursor-pointer flex-row items-center justify-center rounded-md border-violet-500 bg-fuchsia-700 p-2 hover:bg-fuchsia-800`}
        >
          {userEmail ? 'Account' : 'Login'}
        </div>
      </Link>
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
            onImageSelected={(imagePath, fileName) => {
              setImagePath(imagePath);
              setImageName(fileName);
            }}
          />
        )}
      </div>
      {/* Form container */}
      <div className="mt-1 flex w-full max-w-4xl flex-col p-1">
        <DownloadButton onClick={downloadImage} />
        <ShareButton
          title={
            selectedFiles.length === 0 ? 'Click to share' : 'Ready to Share'
          }
          onClick={shareImage}
          platform={platform}
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

const ShareButton = ({
  onClick,
  title,
  platform,
}: {
  onClick: () => void;
  title: string;
  platform: 'apple' | 'other';
}) => (
  <div className="mt-3 flex w-full justify-center">
    <Button title={title} onClick={onClick}>
      {platform === 'apple' ? <Share size={18} /> : <Share2 size={18} />}
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
