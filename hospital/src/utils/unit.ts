export const getDPI = () => {
  const div = document.createElement("div");
  div.style.height = "1in";
  div.style.width = "1in";
  div.style.top = "-100%";
  div.style.left = "-100%";
  div.style.position = "absolute";

  document.body.appendChild(div);
  const dpi = div.offsetWidth;
  document.body.removeChild(div);

  return dpi;
};

export const cmToPixels = (dpi: number, cm: number) => {
  const isBrowser = typeof window !== "undefined";
  if (!isBrowser) return 0;
  if (dpi === 0) return 0;
  return cm * (dpi / 2.54);
};
