export const capitalizeString = (str: string): string => {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
};

export const capitalizeFirstLetter = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
