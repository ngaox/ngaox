export function omitKeys<T>(obj: object, omitKeys: string[]) {
  return Object.keys(obj).reduce((result, key) => {
    if (!omitKeys.includes(key)) {
      result[key] = obj[key];
    }
    return result;
  }, {}) as T;
}
