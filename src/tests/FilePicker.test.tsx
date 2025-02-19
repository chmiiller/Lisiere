import React from 'react';
import { expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import '@testing-library/jest-dom/vitest';
import path from 'path';
import * as fs from 'fs/promises';

import FilePicker from '@/components/FilePicker';
import { LisiereStoreProvider } from '@/store-provider';

test("if the component and children are rendered properly", () => {
  const buttonTitle = "Upload an image";
  const paragraphTitle = "Upload";
  render(
    <LisiereStoreProvider>
      <FilePicker onImageSelected={() => {}}/>
    </LisiereStoreProvider>
  );

  const uploadButton = screen.getByTitle(buttonTitle);
  const uploadParagraph = screen.getByRole("paragraph");
  expect(uploadButton).toBeInTheDocument();
  expect((uploadParagraph as HTMLParagraphElement).textContent).toEqual(paragraphTitle);
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