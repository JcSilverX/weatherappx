const addToMap = (MAP, keys, value) => {
  keys.forEach((key) => {
    MAP.set(key, value);
  });
};

export default addToMap;
