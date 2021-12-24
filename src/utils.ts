import {printSchema, buildSchema} from 'graphql';

export const sdl = (s: string): string => printSchema(buildSchema(s));

export const removeExclamation = (s: string): string => {
  if (s.match(/!$/)) {
    return s.slice(0, -1);
  }

  return s;
};
