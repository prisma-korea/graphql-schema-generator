import {printSchema, buildSchema} from 'graphql';

export const sdl = (s: string): string => printSchema(buildSchema(s));
