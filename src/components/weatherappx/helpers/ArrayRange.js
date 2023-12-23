const arrayRange = (
  start,
  stop,
  step,
) => Array.from({ length: (stop - start) / step + 1 }, (value, index) => start + index * step);

export default arrayRange;
