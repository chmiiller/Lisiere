import ExifReader from 'exifreader';
import { LogoOptions } from './components/LogoSelect';

export type EXIFData = {
  Make: string;
  Model: string;
  DateTimeOriginal: string;
  ExposureTime: string;
  FNumber: string;
  ISOSpeedRatings: string;
  ShutterSpeedValue: number;
  FocalLength: string;
  LensMake: string;
  LensModel: string;
}

export type EXIFObject = {
  timestamp?: Date;
  brandName?: string;
  brandLogo?: string;
  model?: string;
  speed?: string;
  fstop?: string;
  focalLength?: number;
  iso?: number;
  lensBrand?: string;
  lensModel?: string;
}

// EXIF dates come as "2024:12:31 11:22:33" and we convert it to a JS Date
export function exifTimestampAsDate(timestampString: string): Date {
  const [datePart, timePart] = timestampString.split(" ");
  const [year, month, day] = datePart.split(":").map(Number);
  const [hours, minutes, seconds] = timePart.split(":").map(Number);

  return new Date(year, month - 1, day, hours, minutes, seconds);
}

// yyyy-mm-dd
export function formatDateForPicker(date: Date): string {
  return date.toISOString().split('T')[0]; 
}

// shortens a string length to limit. Ex: f/1.7799999713 becomes f/1.77
export function shortString(original: string, limit: number): string {
  if (original.length > limit) {
    return original.substring(0, limit);
  } else {
    return original;
  }
}

const fileTypes = [
  "image/apng",
  "image/bmp",
  "image/gif",
  "image/jpeg",
  "image/pjpeg",
  "image/png",
  "image/svg+xml",
  "image/tiff",
  "image/webp",
  "image/x-icon",
];

export function getValidFileType(file: File) {
  return fileTypes.includes(file.type);
}

export async function parseExif(file: File): Promise<EXIFObject> {
  const exifResult: EXIFObject = {};
  const tags = await ExifReader.load(file);
  // TIMESTAMP
  const imageDate: EXIFData["DateTimeOriginal"] | undefined = tags['DateTimeOriginal']?.description;
  if (imageDate) {
    exifResult.timestamp = exifTimestampAsDate(imageDate);
  }
  // CAMERA BRAND
  const brand: EXIFData["Make"] | undefined = tags['Make']?.description;
  if (brand) {
    const brandLogo = LogoOptions.find(logo => logo.name.toLowerCase() === brand.toLowerCase());
    if (brandLogo) {
      exifResult.brandName = brandLogo.name;
      exifResult.brandLogo = brandLogo.url;
    }
  }
  // CAMERA MODEL
  const model: EXIFData["Model"] | undefined = tags['Model']?.description;
  if (model) {
    exifResult.model = model;
  }
  // EXPOSURE (SPEED)
  const exposure: EXIFData["ExposureTime"] | undefined = tags['ExposureTime']?.description;
  if (exposure) {
    exifResult.speed = shortString(exposure, 6);
  }
  // F NUMBER
  const fnumber: EXIFData["FNumber"] | undefined = tags['FNumber']?.description;
  if (fnumber) {
    exifResult.fstop = shortString(fnumber, 6);
  }
  // FOCAL LENGTH
  const focalLength = tags['FocalLength']?.value;
  if (focalLength) {
    const [num, den] = focalLength.toString().split(",");
    if (num && den) {
      const focalLengthFixed: EXIFData["FocalLength"] = (parseFloat(num)/parseFloat(den)).toFixed(2);
      exifResult.focalLength = parseFloat(focalLengthFixed);
    }
  }
  // ISO
  const iso: EXIFData["ISOSpeedRatings"] | undefined = tags['ISOSpeedRatings']?.description;
  if (iso) {
    exifResult.iso = parseInt(iso);
  }
  // LENS BRAND
  const lensMake: EXIFData["LensMake"] | undefined = tags['LensMake']?.description;
  if(lensMake) {
    exifResult.lensBrand = lensMake;
  }
  // LENS MODEL
  const lensModel: EXIFData["LensModel"] | undefined = tags['LensModel']?.description;
  if(lensModel) {
    exifResult.lensModel = lensModel;
  }
  return exifResult;
}