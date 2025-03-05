import * as fs from 'fs/promises';
import path from 'path';
import { expect, expectTypeOf, test } from 'vitest';

import {
  exifTimestampAsDate,
  formatDateForFooter,
  formatDateForPicker,
  formatFileSize,
  getValidFileType,
  parseExif,
  shortString,
} from '@/utils';

test('converting EXIF timestamp to JS Date', () => {
  const originalTimestamp = '1969:07:20 20:18:0';
  const timestampAsDate = exifTimestampAsDate(originalTimestamp);
  const expectedDate = new Date(1969, 6, 20, 20, 18, 0);
  expectTypeOf(expectedDate).toEqualTypeOf<Date>();
  expect(timestampAsDate.getFullYear()).equal(expectedDate.getFullYear());
  expect(timestampAsDate.getMonth()).equal(expectedDate.getMonth());
  expect(timestampAsDate.getDate()).equal(expectedDate.getDate());
  expect(timestampAsDate.getHours()).equal(expectedDate.getHours());
  expect(timestampAsDate.getMinutes()).equal(expectedDate.getMinutes());
  expect(timestampAsDate.getSeconds()).equal(expectedDate.getSeconds());
});

test('converting JS Date to a proper value for the date picker', () => {
  const moonLandingDate = new Date(1969, 6, 20, 20, 18, 0);
  const expectedString = '1969-07-20';
  const formattedDate = formatDateForPicker(moonLandingDate); // Returns on this format: yyyy-mm-dd
  expect(formattedDate).equal(expectedString);
});

test('converting JS Date to a proper timestamp to be displayed on the Footer', () => {
  const moonLandingDate = new Date(1969, 6, 20, 20, 18, 0);
  const expectedTimestamp = '20 Jul 1969';
  const formattedTimestamp = formatDateForFooter(moonLandingDate);
  expect(formattedTimestamp).toStrictEqual(expectedTimestamp);
});

test('if a JPG file is a valid image type', () => {
  const mockFile = new File(['image'], 'image.jpg', {
    type: 'image/jpeg',
  });
  const isValid = getValidFileType(mockFile);
  expect(isValid).toBeTruthy();
});

test('if a PNG file is a valid image type', () => {
  const mockFile = new File(['image'], 'image.png', {
    type: 'image/png',
  });
  const isValid = getValidFileType(mockFile);
  expect(isValid).toBeTruthy();
});

test('if a PDF file is a valid image type', () => {
  const mockFile = new File(['document'], 'doc.pdf', {
    type: 'application/pdf',
  });
  const isValid = getValidFileType(mockFile);
  expect(isValid).toBeFalsy();
});

test('if a long string is properly shortened', () => {
  const short = shortString('f/5.22222', 6);
  const expectedString = 'f/5.22';
  expect(short).toEqual(expectedString);
});

test('if file size is formatted correctly', () => {
  const formattedFileSize = formatFileSize(500);
  const expectedString = '500.00 B';
  expect(formattedFileSize).toEqual(expectedString);

  const formattedFileSizeBig = formatFileSize(500000);
  const expectedStringBig = '488.28 kB';
  expect(formattedFileSizeBig).toEqual(expectedStringBig);

  const formattedFileSizeLarge = formatFileSize(500000000);
  const expectedStringLarge = '476.84 MB';
  expect(formattedFileSizeLarge).toEqual(expectedStringLarge);

  const formattedFileSizeHuge = formatFileSize(50000000000);
  const expectedStringHuge = '46.57 GB';
  expect(formattedFileSizeHuge).toEqual(expectedStringHuge);
});

test('if file size is formatted correctly from an actual file', async () => {
  const imagePath = path.resolve(__dirname, '../../public/sample.jpg');
  const imageBuffer = (await fs
    .readFile(imagePath)
    .then((buffer) => buffer.buffer)) as ArrayBuffer;
  const mockFile = new File([imageBuffer], 'image_with_exif.jpg', {
    type: 'image/jpeg',
  });

  const formattedFileSize = formatFileSize(mockFile.size);
  const expectedString = '304.93 kB';
  expect(formattedFileSize).toEqual(expectedString);
});

test('if parseExif returns the correct object when an image is passed', async () => {
  const imagePath = path.resolve(__dirname, '../../public/sample.jpg');
  const imageBuffer = (await fs
    .readFile(imagePath)
    .then((buffer) => buffer.buffer)) as ArrayBuffer;
  const mockFile = new File([imageBuffer], 'image_with_exif.jpg', {
    type: 'image/jpeg',
  });

  const validExifData = {
    brandLogo: '/logos/sony.png',
    brandName: 'Sony',
    focalLength: 70,
    fstop: 'f/2.8',
    iso: 320,
    lensModel: '24-70mm F2.8 DG DN | Art 019',
    model: 'ILCE-7',
    speed: '1/1000',
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
});

test('if parseExif returns error when passing a text document', async () => {
  const blob = new Blob(['this is a text file']);
  const mockFile = new File([blob], 'document.txt', { type: 'text/plain' });
  await expect(parseExif(mockFile)).rejects.toThrowError(
    'Invalid image format',
  );
});
