function convertTimeToSeconds(hours: number, minutes: number = 0): number {
  return hours * 3600 + minutes * 60;
}

export default convertTimeToSeconds;
