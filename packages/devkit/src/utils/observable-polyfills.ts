import { fromEvent, Observable } from 'rxjs';
import { Observable as OldObservable } from '@angular-devkit/core/node_modules/rxjs';
import { EventEmitter } from 'events';

export function v6ToV7Observable<T>(
  v6Observable: OldObservable<T>
): Observable<T> {
  return new Observable<T>(subscriber => {
    const emitter = new EventEmitter();
    const subscription = v6Observable.subscribe(
      value => emitter.emit('next', value),
      error => emitter.emit('error', error),
      () => emitter.emit('complete')
    );
    const unsubscribe = () => {
      subscription.unsubscribe();
      emitter.removeAllListeners();
    };
    fromEvent(emitter, 'next').subscribe(value => subscriber.next(value as T));
    fromEvent(emitter, 'error').subscribe(error => subscriber.error(error));
    fromEvent(emitter, 'complete').subscribe(() => subscriber.complete());
    return unsubscribe;
  });
}
