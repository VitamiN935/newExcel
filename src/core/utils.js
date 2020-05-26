export function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

export function storageName(params) {
  return 'excel:' + params;
}

export function storage(key, value) {
  if (!value) {
    return JSON.parse(localStorage.getItem(key));
  }
  localStorage.setItem(key, JSON.stringify(value));
}
