import { inspect } from "node:util";

export function log<T>(object: T, prefix?: string): T {
  if (prefix)
    console.info(
      `${prefix + "\n"}${inspect(object, { colors: false, depth: null, maxArrayLength: Infinity, maxStringLength: Infinity })}`,
    );
  else
    console.info(
      `${inspect(object, { colors: false, depth: null, maxArrayLength: Infinity, maxStringLength: Infinity })}`,
    );

  return object;
}
