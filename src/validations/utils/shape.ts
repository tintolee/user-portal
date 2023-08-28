import { ObjectShape } from 'yup/lib/object';

type ObjectShapeValues = ObjectShape extends Record<string, infer V> ? V : never;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Shape<T extends Record<any, any>> = Record<keyof T, ObjectShapeValues>;
