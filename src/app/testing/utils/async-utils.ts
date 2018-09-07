import { defer } from 'rxjs/internal/observable/defer';
import { delay } from 'rxjs/operators';

export function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data))
    .pipe(
      delay(3000)
    );
}

export function asyncError<T>(errorObject: any) {
  return defer(() => Promise.reject(errorObject));
}
