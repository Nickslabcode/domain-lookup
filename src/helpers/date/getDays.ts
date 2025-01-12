export const getDays = (ms: number): number => {
  return Math.floor(
    (new Date(ms).getTime() - Date.now()) / 1000 / 60 / 60 / 24
  );
};
