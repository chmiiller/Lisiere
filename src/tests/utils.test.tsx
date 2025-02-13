import {
  exifTimestampAsDate,
  formatDateForPicker,
  getValidFileType,
  shortString,
  parseExif,
} from '../utils';
import { expect, expectTypeOf,test } from 'vitest';
import * as fs from 'fs/promises';
import path from 'path';

test('converting EXIF timestamp to JS Date', () => {
  const originalTimestamp = "2025:01:27 12:33:11";
  const timestampAsDate = exifTimestampAsDate(originalTimestamp);
  const expectedDate = new Date(2025, 0, 27, 12, 33, 11);
  expectTypeOf(expectedDate).toEqualTypeOf<Date>()
  expect(timestampAsDate.getFullYear()).equal(expectedDate.getFullYear());
  expect(timestampAsDate.getMonth()).equal(expectedDate.getMonth());
  expect(timestampAsDate.getDate()).equal(expectedDate.getDate());
  expect(timestampAsDate.getHours()).equal(expectedDate.getHours());
  expect(timestampAsDate.getMinutes()).equal(expectedDate.getMinutes());
  expect(timestampAsDate.getSeconds()).equal(expectedDate.getSeconds());
});

test('converting JS Date to a proper value for the date picker', () => {
  const today = new Date(2020, 0, 11);
  const expectedString = "2020-01-10";
  const formattedDate = formatDateForPicker(today); // returns on this format: yyyy-mm-dd
  expect(formattedDate).equal(expectedString);
});

test('if a JPG file is a valid image type', () => {
  const mockFile = new File(['image'], 'image.jpg', {
    type: "image/jpeg"
  });
  const isValid = getValidFileType(mockFile);
  expect(isValid).toBeTruthy();
});

test('if a PNG file is a valid image type', () => {
  const mockFile = new File(['image'], 'image.png', {
    type: "image/png"
  });
  const isValid = getValidFileType(mockFile);
  expect(isValid).toBeTruthy();
});

test('if a PDF file is a valid image type', () => {
  const mockFile = new File(['document'], 'doc.pdf', {
    type: "application/pdf"
  });
  const isValid = getValidFileType(mockFile);
  expect(isValid).toBeFalsy();
});

test('if a long string is properly shortened', () => {
  const short = shortString('f/5.22222', 6);
  const expectedString = 'f/5.22';
  expect(short).toEqual(expectedString);
});

test('if parseExif returns the correct object when an image is passed', async() => {
  const imagePath = path.resolve(__dirname, '../../public/sample.jpg');
  const imageBuffer = await fs.readFile(imagePath).then(buffer => buffer.buffer) as ArrayBuffer;
  const mockFile = new File([imageBuffer], 'image_with_exif.jpg', { type: 'image/jpeg' });

  const validExifData = {
    brandLogo: "/logos/sony.png",
    brandName: "Sony",
    focalLength: 70,
    fstop: "f/2.8",
    iso: 320,
    lensModel: "24-70mm F2.8 DG DN | Art 019",
    model: "ILCE-7",
    speed: "1/1000",
  };
  const exifData = await parseExif(mockFile);
  expect(exifData.brandLogo).toEqual(validExifData.brandLogo);
  expect(typeof exifData.brandLogo).toBe('string');
  
  expect(exifData.brandName).toEqual(validExifData.brandName);
  expect(typeof exifData.brandName).toBe('string');
  
  expect(exifData.focalLength).toEqual(validExifData.focalLength);
  expect(typeof exifData.focalLength).toBe('number');
  
  expect(exifData.fstop).toEqual(validExifData.fstop);
  expect(typeof exifData.fstop).toBe('string');
  
  expect(exifData.iso).toEqual(validExifData.iso);
  expect(typeof exifData.iso).toBe('number');
  
  expect(exifData.lensModel).toEqual(validExifData.lensModel);
  expect(typeof exifData.lensModel).toBe('string');
  
  expect(exifData.model).toEqual(validExifData.model);
  expect(typeof exifData.model).toBe('string');
  
  expect(exifData.speed).toEqual(validExifData.speed);
  expect(typeof exifData.speed).toBe('string');
  expect(typeof exifData.timestamp).toBe('object');
})

test('if parseExif returns error when passing a text document', async() => {
  const blob = new Blob(['this is a text file']);
  const mockFile = new File([blob], 'document.txt', { type: 'text/plain' });
  await expect(parseExif(mockFile)).rejects.toThrowError('Invalid image format');
})