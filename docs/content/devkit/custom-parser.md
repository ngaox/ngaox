---
name: Creating Custom Parser
order: 2
---

@ngaox/devkit provides a set of [parsers](https://ngaox-lab.web.app/docs/press#parsers) that can be used to parse different types of content.
In addition, it provides a `rawParser` that can be used to parse any type of content without any modification nor transformation.

However, it is also possible to create custom parsers that can be used to parse any type of content.

## Creating Custom Parser

To create a custom parser, you need to implement the `IParser` interface exported from `@ngaox/devkit`:

```typescript
import { IParser } from '@ngaox/devkit';

export const myParser: IParser = (content: string) => {
  // Parse the content and return an object with the following properties:
  return {
    content: parsedContent,
    data: metadataObject,
    toc: tableOfContents // Optional
  };
};
```
