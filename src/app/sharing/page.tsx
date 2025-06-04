'use client';
import { Download } from 'lucide-react';
import { ChangeEvent, useEffect, useState } from 'react';

import Button from '@/components/Button';

export default function Sharing() {
  const [shareButtonEnabled, setShareButtonEnabled] = useState<boolean>(true);
  const [debugMessage, setDebugMessage] = useState<string>('Sharing');
  const [titleMessage, setTitleMessage] = useState<string>();
  const [textMessage, setTextMessage] = useState<string>();
  const [urlMessage, setUrlMessage] = useState<string>();
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
    // XXX: There is no straightforward API to do this.
    // For now, assume that text/plain is supported everywhere.
    const txt = new Blob(['Hello, world!'], { type: 'text/plain' });
    // XXX: Blob support? https://github.com/w3c/web-share/issues/181
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
        title: titleMessage,
        text: textMessage,
        url: urlMessage,
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
        updateDebugMessage('protocol is HTTP, replacing it..');
        // Window.location.replace(Window.location.href.replace(/^http:/, 'https:'));
      } else {
        updateDebugMessage(
          'Error: You need to use a browser that supports this draft ' +
            'proposal.',
        );
      }
    } else {
      updateDebugMessage('navigator.share is NOT undefined');
    }
  }, []);

  return (
    <div className="flex flex-col items-center p-4">
      <p>{debugMessage}</p>
      <div>
        <h1>Web Share Test</h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <label htmlFor="title" style={{ minWidth: '50px' }}>
              Title:
            </label>
            <input type="checkbox" id="title_checkbox" defaultChecked />
            <input
              className={`ml-3 border p-1.5 text-lg`}
              id="title"
              defaultValue=""
              onChange={(e) => {
                setTitleMessage(e.currentTarget.value);
              }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <label htmlFor="text" style={{ minWidth: '50px' }}>
              Text:
            </label>
            <input type="checkbox" id="text_checkbox" defaultChecked />
            <input
              className={`ml-3 border p-1.5 text-lg`}
              id="text"
              defaultValue=""
              onChange={(e) => {
                setTextMessage(e.currentTarget.value);
              }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <label htmlFor="url" style={{ minWidth: '50px' }}>
              URL:
            </label>
            <input type="checkbox" id="url_checkbox" defaultChecked />
            <input
              className={`ml-3 border p-1.5 text-lg`}
              id="url"
              defaultValue="https://example.com"
              onChange={(e) => {
                setUrlMessage(e.currentTarget.value);
              }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <label htmlFor="files" style={{ minWidth: '50px' }}>
              Files:
            </label>
            <input
              className="rounded-md bg-gray-700 p-1.5"
              id="files"
              type="file"
              onChange={handleFileChange}
            />
          </div>
        </div>

        <ShareButton
          onClick={async () => {
            await testWebShare();
          }}
          enabled={shareButtonEnabled}
        />
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
