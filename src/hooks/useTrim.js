const useTrim = (length) => {
  return (string) => {
    if (string.length >= length) return string.slice(0, length) + "...";
    return string;
  };
};

export default useTrim;
