import { isDev } from "@/registry/utils/checks/checks";

const INVALID_VALUES = ["", "undefined", "null"];

export function readStorageJsonValue<T>(
  key: string,
  defaultValue: T | (() => T),
  storageObject: Storage,
) {
  try {
    if (!storageObject) return _handleDefaultValue(defaultValue);

    const item = storageObject.getItem(key);

    if (item !== null && item !== undefined && !INVALID_VALUES.includes(item))
      return JSON.parse(item);

    return _handleDefaultValue(defaultValue);
  } catch (error) {
    if (isDev()) throw error;

    return _handleDefaultValue(defaultValue);
  }
}

const _handleDefaultValue = <T>(defaultValue: T | (() => T)) =>
  defaultValue instanceof Function ? defaultValue() : defaultValue;
