import { map } from 'rxjs/operators';

export const lowerCaseTrim = () =>
  map((value: string) => value.trim().toLowerCase());
