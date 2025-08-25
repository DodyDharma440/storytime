export const debounce = (callback: () => void, wait?: number) => {
  let timer: NodeJS.Timeout;
  const handleDebounce = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback();
    }, wait ?? 500);
  };

  handleDebounce();
};
