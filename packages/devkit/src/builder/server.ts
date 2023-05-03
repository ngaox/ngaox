import { BuilderContext, createBuilder } from '@angular-devkit/architect';
import {
  ServerBuilderOptions,
  executeServerBuilder
} from '@angular-devkit/build-angular';

export default createBuilder(
  (rawOptions: ServerBuilderOptions, context: BuilderContext) =>
    executeServerBuilder(rawOptions, context)
);
