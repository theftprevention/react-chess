export function capitalize<T extends string>(string: T): Capitalize<T> {
  return (string ? string[0].toUpperCase() + string.slice(1) : '') as Capitalize<T>;
}

export const freeze = Object.freeze;

export const isArray = Array.isArray;

export const ownKeys = Reflect.ownKeys as <T extends object>(target: T) => (keyof T)[];