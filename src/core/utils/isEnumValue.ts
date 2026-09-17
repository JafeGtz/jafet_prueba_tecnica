export const isEnumValue = <T extends Record<string, string>>(
  enumObject: T,
  value: string,
): value is T[keyof T] => Object.values<string>(enumObject).includes(value);
