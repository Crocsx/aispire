export class ObjectUtils {
  static objectsEqual(o1: unknown, o2: unknown): boolean {
    return typeof o2 === 'object' &&
      typeof o1 === 'object' &&
      Object.keys(o1 || {}).length > 0
      ? Object.keys(o1 || {}).length === Object.keys(o2 || {}).length &&
          Object.keys(o1 || {}).every((p) =>
            ObjectUtils.objectsEqual(
              (o1 as { [key: string]: unknown })[p],
              (o2 as { [key: string]: unknown })[p]
            )
          )
      : o1 === o2;
  }

  static isEmpty(value: unknown) {
    if (Array.isArray(value)) {
      return !value.length;
    }

    if (value instanceof Map || value instanceof Set) {
      return !value.size;
    }

    if (ObjectUtils.isRecord(value)) {
      return !Object.keys(value).length;
    }

    return true;
  }

  static arraysEqual(a1: unknown[], a2: unknown[]) {
    return (
      a1.length === a2.length &&
      a1.every((o, idx) => ObjectUtils.objectsEqual(o, a2[idx]))
    );
  }

  static arrayFromEnum<T extends string>(test: Record<string, string>): T[] {
    return Object.keys(test) as T[];
  }

  static isLiteralObject = function (obj: unknown): obj is object {
    return !!obj && obj.constructor === Object;
  };

  static isRecord(obj: unknown): obj is Record<string, string> {
    return !!obj && typeof obj === 'object' && !Array.isArray(obj);
  }

  static pick<T extends Record<string, unknown>>(
    obj: T,
    paths: Array<keyof T | string>
  ): Partial<T> {
    const result: Partial<T> = {};

    paths.forEach((path) => {
      if (typeof path === 'string') {
        const value = ObjectUtils.getNestedProperty(obj, path);
        if (value !== undefined) {
          ObjectUtils.setNestedProperty(result, path, value);
        }
      } else {
        // If path is not a string, it's directly a key of T
        result[path] = obj[path];
      }
    });

    return result;
  }

  private static getNestedProperty<T extends Record<string, unknown>>(
    obj: T,
    path: string
  ): unknown {
    return path
      .split('.')
      .reduce((acc: any, part: string) => acc && acc[part], obj);
  }

  private static setNestedProperty<T extends Record<string, unknown>>(
    obj: T,
    path: string,
    value: unknown
  ): void {
    const parts = path.split('.');
    const lastPart = parts.pop();
    if (!lastPart) return; // Early exit if path is empty

    const lastObj = parts.reduce(
      (acc: any, part: string) => (acc[part] = acc[part] || {}),
      obj
    );
    lastObj[lastPart] = value;
  }
}
