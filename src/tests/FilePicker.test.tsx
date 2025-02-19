import React from 'react';
import { expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import '@testing-library/jest-dom/vitest';
import path from 'path';
import * as fs from 'fs/promises';

import FilePicker from '@/components/FilePicker';
import { LisiereStoreProvider, useLisiereStore } from '../store-provider';

vi.mock('../store-provider', () => {
  return {
    useLisiereStore: vi.fn(),
    LisiereStoreProvider: ({ children }: { children: React.ReactNode }) => (
      <div>
        {children}
      </div>
    ),
    setTimestamp: vi.fn(),
  };
});

(useLisiereStore as ReturnType<typeof vi.fn>).mockImplementation(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (passedFn: any) => {
    return passedFn({
      setIso: vi.fn(),
      setFocalLength: vi.fn(),
      setFstop: vi.fn(),
      setSpeed: vi.fn(),
      setTimestamp: vi.fn(),
      setSelectedIcon: vi.fn(),
      setCameraModel: vi.fn(),
      setCameraBrand: vi.fn(),
      setLensBrand: vi.fn(),
      setLensModel: vi.fn(),
    });
  }
);

test("if the component and children are rendered properly", () => {
  const buttonTitle = "Upload an image";
  const paragraphTitle = "Upload";
  const inputAcceptedFormats = ".jpg, .jpeg, .png";

  render(
    <LisiereStoreProvider>
      <FilePicker onImageSelected={() => {}}/>
    </LisiereStoreProvider>
  );

  const uploadButton = screen.getByTitle(buttonTitle);
  const uploadParagraph = screen.getByRole("paragraph");
  const input = screen.getByTestId("image_upload");

  expect(uploadButton).toBeInTheDocument();
  expect((uploadParagraph as HTMLParagraphElement).textContent).toEqual(paragraphTitle);
  expect((input as HTMLInputElement).accept).toEqual(inputAcceptedFormats);
});

test("If image upload works", async() => {
  const imagePath = path.resolve(__dirname, '../../public/sample.jpg');
  const imageBuffer = await fs.readFile(imagePath).then(buffer => buffer.buffer) as ArrayBuffer;
  const mockFile = new File([imageBuffer], 'image_with_exif.jpg', { type: 'image/jpeg' });
  global.URL.createObjectURL = vi.fn();

  const mockCallback = vi.fn();
  render(
    <LisiereStoreProvider>
      <FilePicker onImageSelected={mockCallback}/>
    </LisiereStoreProvider>
  );

  const input = screen.getByTestId("image_upload");
  await userEvent.upload(input, mockFile);
  expect(mockCallback).toBeCalled();
});

test("If image upload calls all store actions", async() => {
  const imagePath = path.resolve(__dirname, '../../public/sample.jpg');
  const imageBuffer = await fs.readFile(imagePath).then(buffer => buffer.buffer) as ArrayBuffer;
  const mockFile = new File([imageBuffer], 'image_with_exif.jpg', { type: 'image/jpeg' });
  global.URL.createObjectURL = vi.fn();
  const mockCallback = vi.fn();

  const mockSetIso = vi.fn();
  const mockSetFocalLength = vi.fn();
  const mockSetFstop = vi.fn();
  const mockSetSpeed = vi.fn();
  const mockSetTimestamp = vi.fn();
  const mockSetSelectedIcon = vi.fn();
  const mockSetCameraModel = vi.fn();
  const mockSetCameraBrand = vi.fn();
  const mockSetLensBrand = vi.fn();
  const mockSetLensModel = vi.fn();

  (useLisiereStore as ReturnType<typeof vi.fn>).mockImplementation(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (passedFn: any) => {
      return passedFn({
        setIso: mockSetIso,
        setFocalLength: mockSetFocalLength,
        setFstop: mockSetFstop,
        setSpeed: mockSetSpeed,
        setTimestamp: mockSetTimestamp,
        setSelectedIcon: mockSetSelectedIcon,
        setCameraModel: mockSetCameraModel,
        setCameraBrand: mockSetCameraBrand,
        setLensBrand: mockSetLensBrand,
        setLensModel: mockSetLensModel,
      });
    }
  );

  render(
    <LisiereStoreProvider>
      <FilePicker onImageSelected={mockCallback}/>
    </LisiereStoreProvider>
  );

  const input = screen.getByTestId("image_upload");
  await userEvent.upload(input, mockFile);
  expect(mockCallback).toBeCalled();
  expect(mockSetIso).toBeCalled();
  expect(mockSetFocalLength).toBeCalled();
  expect(mockSetFstop).toBeCalled();
  expect(mockSetSpeed).toBeCalled();
  expect(mockSetTimestamp).toBeCalled();
  expect(mockSetSelectedIcon).toBeCalled();
  expect(mockSetCameraModel).toBeCalled();
  expect(mockSetCameraBrand).toBeCalled();
  expect(mockSetLensBrand).toBeCalledTimes(0); // usually EXIF data lack lens brand and this is action is not fired
  expect(mockSetLensModel).toBeCalled();
  expect(mockSetLensModel).toBeCalled();
});