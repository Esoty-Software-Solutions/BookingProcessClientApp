import { BehaviorSubject, Observable, OperatorFunction } from 'rxjs';
export class BaseStore<T> {
  private obs$!: BehaviorSubject<T>;
  private initialValueSnapShot: T;
  constructor(initialValue: T) {
    this.obs$ = new BehaviorSubject<T>(initialValue);
    this.initialValueSnapShot = initialValue;
  }
  getValue = (): T => this.obs$.value;
  get = (): Observable<T> => this.obs$.asObservable();
  set = (payload: T) => {
    this.obs$.next(payload);
    this.logger('SET', payload);
  };
  update = (callBack: (pv: T) => T) => {
    const updatedValues = callBack(this.getValue());
    this.obs$.next(updatedValues);
    this.logger('UPDATE', updatedValues);
  };
  patch = (payload: Partial<T>) => {
    const margeValues = { ...this.obs$.value, ...payload };
    this.obs$.next(margeValues);
    this.logger('PATCH', margeValues);
  };
  reset = () => {
    this.obs$.next(this.initialValueSnapShot);
    this.logger('RESET', this.initialValueSnapShot);
  };
  clear = () => {
    this.obs$.next(null as any);
    this.logger('RESET', null as any);
  };
  logger(
    method: 'SET' | 'UPDATE' | 'PATCH' | 'RESET' | 'CLEAR' | 'ENTRY',
    newValues: T
  ) {
    // console.info(`[${method} Previous]-`, this.getValue());
    // console.info(`[${method} Next]-`, newValues);
  }
}
