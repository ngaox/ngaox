import { IBuilderOptions } from '../../src';
import { map, Observable, of } from 'rxjs';
import { BuilderContext, BuilderOutput } from '@angular-devkit/architect';
import { MdContentTask } from './md-content';

export function getNgaoxTasks(
  options: IBuilderOptions,
  context: BuilderContext
): Observable<BuilderOutput>[] {
  const tasks: Observable<BuilderOutput>[] = [of({ success: true })];

  if (options.press) {
    tasks.push(
      MdContentTask(options.press, context, options.outputPath).pipe(
        map(() => {
          return {
            success: true
          };
        })
      )
    );
  }

  return tasks;
}
