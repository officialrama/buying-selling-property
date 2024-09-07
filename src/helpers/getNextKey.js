export function getNextKey(key, obj) {
  let keys = Object.keys(obj);
  return (keys[(keys.indexOf(key) + 1) % keys.length]);
};