// utils/parseQueryParams.ts
import { ParsedQs } from 'qs';

export const parseQueryParams = (query: ParsedQs) => {
  const parsed: Record<string, string | number | boolean> = {};

  Object.entries(query).forEach(([key, value]) => {
    if (typeof value === 'string') {
      if (value === 'true') parsed[key] = true;
      else if (value === 'false') parsed[key] = false;
      else if (!isNaN(Number(value))) parsed[key] = Number(value);
      else parsed[key] = value;
    }
  });

  return parsed;
};
