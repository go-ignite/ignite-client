export function renameKey(raw, keyMap) {
    const target = {};
    Object.keys(raw)
        .forEach((key) => {
            target[keyMap[key] || key] = raw[key];
        });
    return target;
}
