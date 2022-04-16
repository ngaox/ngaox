import { map, Observable, of } from 'rxjs';
import { BuilderContext } from '@angular-devkit/architect';
import { MdContentTask } from './md-content';
import { IBuilderOptions } from '../../models/builders/builder';
import { svgIconsTask } from './svg-icons';
import * as webpack from 'webpack';
import { NGAOX_ICONS_KEY } from '../../models/constants';

export function getIconsTask(
  options: IBuilderOptions,
  context: BuilderContext
): Observable<any> {
  if (options.icons) {
    return svgIconsTask(options.icons, context, options.outputPath).pipe(
      map(icons => {
        return new webpack.DefinePlugin({
          [NGAOX_ICONS_KEY]: JSON.stringify(icons)
        });
      })
    );
  }
  return of(null);
}

export function getNgaoxTasks(
  options: IBuilderOptions,
  context: BuilderContext
): Observable<boolean>[] {
  const tasks: Observable<boolean>[] = [];

  if (options.press) {
    tasks.push(
      MdContentTask(options.press, context, options.outputPath).pipe(
        map(() => true)
      )
    );
  }

  if (tasks.length < 1) {
    tasks.push(of(true));
  }

  return tasks;
}
