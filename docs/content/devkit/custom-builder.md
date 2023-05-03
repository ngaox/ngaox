---
name: Creating Custom Builder
order: 3
---

@ngaox/devkit provides a set of [builders](https://ngaox-lab.web.app/docs/press#builders) that can be used to build different types of content.
In addition, it provides a generic builder that can be used to build any type of content.

However, it is also possible to create custom builders that can be used to build any type of content.

## Creating Custom Builder

To create a custom builder, you need to implement the `IBuilder` interface exported from `@ngaox/devkit`:

```typescript
import { IBuilder } from '@ngaox/devkit';

export class MyBuilder implements IBuilder {
  push: (
    parsed: IParsedContent,
    filePath: string,
    extra: IMapperExtraOptions
  ) => Promise<unknown>;
  remove: (filePath: string, extra: IMapperExtraOptions) => Promise<unknown>;
  getClientSideData?: (extra: IMapperExtraOptions) => Promise<IClientSideData>;
}
```
