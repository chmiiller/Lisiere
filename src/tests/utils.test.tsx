import { exifTimestampAsDate } from '../utils';
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