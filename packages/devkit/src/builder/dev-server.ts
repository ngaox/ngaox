import { executeContentTask } from './builders/_index';
import { setupAndGetOptions } from './helpers/prepare';
import {
  of,
  from,
  map,
  catchError,
  switchMap,
  combineLatest,
  startWith
} from 'rxjs';
import { BuilderContext, createBuilder } from '@angular-devkit/architect';
import {
  DevServerBuilderOptions,
  executeDevServerBuilder
} from '@angular-devkit/build-angular';
import {
  defineDataPlugin,
  mergeDefinedDataObjects
} from './helpers/define-data';
import { v6ToV7Observable } from '../utils/observable-polyfills';

export default createBuilder(
  (rawOptions: DevServerBuilderOptions, context: BuilderContext) => {
    const options$ = from(
      setupAndGetOptions(context, rawOptions.browserTarget)
    );
    return options$.pipe(
      switchMap(options => {
        return combineLatest(
          Object.entries(options.builder.content).map(([taskName, value]) =>
            executeContentTask(context, options, taskName, value).pipe(
              startWith(null),
              map(data => ({ type: taskName, data }))
            )
          )
        ).pipe(
          map(mergeDefinedDataObjects),
          switchMap(data => {
            return v6ToV7Observable(
              executeDevServerBuilder(
                rawOptions,
                context,
                defineDataPlugin(data)
              )
            );
          })
        );
      }),
      catchError(error => {
        context.logger.error(error.message ?? error);
        return of({ success: false });
      })
    );
  }
);
