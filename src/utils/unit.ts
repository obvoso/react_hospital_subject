export const cmToPixels = (cm: number) => {
  const dpi = 1.2 * 96;
  return cm * (dpi / 2.54);
};
