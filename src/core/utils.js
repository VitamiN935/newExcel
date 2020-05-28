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


export function capitalize(str) {
  return str[0].toUpperCase() + str.slice(1);
}


export function isEqual(a, b) {
  if (typeof a === 'object' && typeof b === 'object') {
    return JSON.stringify(a) === JSON.stringify(b);
  }
  return a === b;
}


export function range(start, end) {
  if (start > end) {
    [start, end] = [end, start];
  }
  return new Array(end - start + 1)
      .fill('')
      .map((_, idx) => start + idx)
}

export function debounse(fn, ms) {
  let timeout;
  return function(...args) {
    const later = () => {
      clearTimeout(timeout);
      // eslint-disable-next-line no-invalid-this
      return fn.apply(this, args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, ms)
  }
}


