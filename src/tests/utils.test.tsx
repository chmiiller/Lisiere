import { exifTimestampAsDate, formatDateForPicker, getValidFileType } from '../utils';
import { expect, test } from 'vitest';

test('converting EXIF timestamp to JS Date', () => {
  const originalTimestamp = "2025:01:27 12:33:11";
  const timestampAsDate = exifTimestampAsDate(originalTimestamp);
  const expectedDate = new Date(2025, 0, 27, 12, 33, 11);

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