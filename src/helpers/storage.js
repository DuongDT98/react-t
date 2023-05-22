const get = (key) => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
};

const set = (key, value) => {
  const tmp = JSON.stringify(value);
  localStorage.setItem(key, tmp);
};

const clear = (key) => {
  localStorage.clear();
};

export { set, get, clear };
