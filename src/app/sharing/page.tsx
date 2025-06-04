'use client';
import { Download } from 'lucide-react';
import { ChangeEvent, useEffect, useState } from 'react';

import Button from '@/components/Button';

export default function Sharing() {
  const [shareButtonEnabled, setShareButtonEnabled] = useState<boolean>(true);
  const [debugMessage, setDebugMessage] = useState<string>('Sharing');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileArray: File[] = Array.from(files);
      setSelectedFiles(fileArray);
    } else {
      setSelectedFiles([]);
    }
  };

  const updateDebugMessage = (message: string) => {
    setDebugMessage((old) => old + ` ${message}`);
  };

  function checkBasicFileShare() {
    const txt = new Blob(['Hello, world!'], { type: 'text/plain' });
    const file = new File([txt], 'test.txt');
    return navigator.canShare({ files: [file] });
  }

  async function testWebShare() {
    if (selectedFiles && selectedFiles.length > 0) {
      if (!navigator.canShare) {
        updateDebugMessage(
          'Warning: canShare is not supported. File sharing may not be supported at all.',
        );
      } else if (!checkBasicFileShare()) {
        updateDebugMessage(
          'Error: File sharing is not supported in this browser.',
        );
        setShareButtonEnabled(true);
        return;
      } else if (!navigator.canShare({ files: selectedFiles })) {
        updateDebugMessage('Error: share() does not support the given files');
        for (const file of selectedFiles) {
          updateDebugMessage(
            `File info: name - ${file.name}, size ${file.size}, type ${file.type}`,
          );
        }
        setShareButtonEnabled(true);
        return;
      }
    }

    setShareButtonEnabled(false);
    try {
      await navigator.share({
        files: selectedFiles,
      });
      updateDebugMessage('Successfully sent share');
    } catch (error) {
      updateDebugMessage('Error sharing: ' + error);
    }
    setShareButtonEnabled(true);
  }

  useEffect(() => {
    if (navigator.share === undefined) {
      setShareButtonEnabled(false);

      if (window.location.protocol === 'http:') {
        updateDebugMessage('protocol is HTTP');
      } else {
        updateDebugMessage('Error: browser not supported');
      }
    } else {
      updateDebugMessage(' IT SHOULD WORK ');
    }
  }, []);

  return (
    <div className="flex flex-col items-center p-4">
      <div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <input
            className="mt-12 mb-3 rounded-md bg-gray-700 p-1.5"
            id="files"
            type="file"
            onChange={handleFileChange}
          />
        </div>

        <ShareButton
          onClick={async () => {
            await testWebShare();
          }}
          enabled={shareButtonEnabled}
        />
        <br />
        <p>{debugMessage}</p>
      </div>
    </div>
  );
}

const ShareButton = ({
  onClick,
  enabled,
}: {
  onClick: () => void;
  enabled?: boolean;
}) => (
  <div className="mt-3 flex w-full justify-center">
    <Button title={'Share'} onClick={onClick} enabled={enabled}>
      <Download size={18} />
    </Button>
  </div>
);
