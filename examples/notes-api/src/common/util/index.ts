import { validate as uuidValidate, version as uuidVersion } from "uuid";

/**
 * Check whether the passed value is a version 4 UUID.
 * @param value The value to check
 * @returns True if value is a version 4 UUID, else false.
 */
export const isUuidv4 = (value: string) => {
  return uuidValidate(value) && uuidVersion(value) === 4;
};
