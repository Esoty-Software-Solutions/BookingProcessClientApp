export const cleanObject = (obj: any) => {
  const newObj = { ...obj };
  Object.keys(newObj).forEach((key) => {
    if (newObj[key] === null || newObj[key] === undefined) {
      delete newObj[key];
    }
  });
  return newObj;
};
export const getBase64 = (img: File, callback: (img: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result!.toString()));
  reader.readAsDataURL(img);
};
