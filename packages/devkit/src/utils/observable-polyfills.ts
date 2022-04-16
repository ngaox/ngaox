import { fromEvent, Observable, finalize } from 'rxjs';
import { Observable as OldObservable } from '@angular-devkit/core/node_modules/rxjs';
import { EventEmitter } from 'events';

export function v6ToV7Observable<T>(
  v6Observable: OldObservable<T>
): Observable<T> {
  const eventEmitter = new EventEmitter();
  const subscription = v6Observable.subscribe({
    next: (value: T) => {
      eventEmitter.emit('next', value);
    }
  });
  return fromEvent(eventEmitter, 'next').pipe(
    finalize(() => subscription.unsubscribe())
  ) as Observable<T>;
}
