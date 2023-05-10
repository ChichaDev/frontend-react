export type DeserializedValue =
  | string
  | number
  | boolean
  | any[]
  | Record<string, any>;

type ReturnType<T> = T extends string
  ? string
  : T extends number
  ? number
  : T extends boolean
  ? boolean
  : T;

function getFromLocalStorage<T extends DeserializedValue>(
  id: string,
  defaultValue: T
): ReturnType<T> {
  const value = localStorage.getItem(id);

  if (!value) {
    return defaultValue as ReturnType<T>;
  }
  try {
    return JSON.parse(value);
  } catch {
    return value as ReturnType<T>;
  }
}

export default getFromLocalStorage;
