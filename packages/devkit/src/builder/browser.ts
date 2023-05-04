import { executeContentTask } from './builders/_index';
import { setupAndGetOptions } from './helpers/prepare';
import { of, from, map, catchError, switchMap, forkJoin, take } from 'rxjs';
import { BuilderContext, createBuilder } from '@angular-devkit/architect';
import { executeBrowserBuilder } from '@angular-devkit/build-angular';
import {
  defineDataPlugin,
  mergeDefinedDataObjects
} from './helpers/define-data';
import { v6ToV7Observable } from '../utils/observable-polyfills';
import { IBrowserBuilderOptions } from '../models/builder';
import { logSuccess } from '../utils/output';

export default createBuilder(
  (rawOptions: IBrowserBuilderOptions, context: BuilderContext) => {
    const options$ = from(setupAndGetOptions(context, rawOptions));
    return options$.pipe(
      switchMap(options => {
        return forkJoin(
          Object.entries(options.builder.content).map(([taskName, value]) =>
            executeContentTask(context, options, taskName, value).pipe(
              take(1),
              map(data => (data == null ? null : { type: taskName, data }))
            )
          )
        ).pipe(
          map(mergeDefinedDataObjects),
          switchMap(data => {
            logSuccess(context.logger, 'Content compiled successfully.');
            return v6ToV7Observable(
              executeBrowserBuilder(
                rawOptions,
                context,
                defineDataPlugin(options, data)
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
