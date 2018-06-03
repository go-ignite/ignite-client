export function renameKey(raw: any, keyMap: any) {
  const target: { [index: string]: string } = {};
  Object.keys(raw).forEach((key: string) => {
    target[keyMap[key] || key] = raw[key];
  });
  return target;
}
