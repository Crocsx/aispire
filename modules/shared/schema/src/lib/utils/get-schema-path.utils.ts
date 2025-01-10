import { z, ZodTypeAny } from 'zod';

export function getSchemaPaths(schema: ZodTypeAny, parentPath = ''): string[] {
  if (schema instanceof z.ZodObject) {
    return Object.entries(schema.shape).flatMap(([key, subSchema]) =>
      getSchemaPaths(
        subSchema as ZodTypeAny,
        parentPath ? `${parentPath}.${key}` : key
      )
    );
  }
  if (schema instanceof z.ZodArray) {
    return getSchemaPaths(schema.element, `${parentPath}[]`);
  }
  return [parentPath];
}
