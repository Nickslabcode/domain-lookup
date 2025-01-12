import { PipeFunction } from '../../types/PipeFunction';

export const domainPipe =
  <T>(...fns: PipeFunction<T>[]) =>
  (x: T): T =>
    fns.reduce((result, nextFn) => nextFn(result), x);
