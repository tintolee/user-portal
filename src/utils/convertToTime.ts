export const convertToTime = (counter: number) => {
  let min: string | number = Math.floor(counter / 60);
  min = min < 10 ? `0${min}` : min;

  let secs: string | number = counter % 60;
  secs = secs < 10 ? `0${secs}` : secs;

  return `${min}:${secs}`;
};
