export function getAllKeysStorage() {
  const keys = [];
  for (let i = 0; i < localStorage.length; i += 1) {
    const key = localStorage.key(i);
    if (!key.includes('excel')) continue;

    keys.push(key);
  }
  return keys;
}
