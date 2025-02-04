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