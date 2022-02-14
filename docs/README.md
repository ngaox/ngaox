# Ngaox Docs

This is where all the documentations for Ngaox should live.

# Creating Contents

When you creating content take in consideration to:

- Use markdown as the file format and `.md` as the extension.
- Each file must start with the one and only one `h1`/`#` heading in the file as the title.
- All subsections in the document must use the `h2`/`##` heading, and so on (`h3`/`###`, ...).
- Provide front yaml meta data:
  ```markdown
  ---
  name: Getting Started
  slug: start
  description: Get started with Ngaox
  order: 1
  ---
  ```
  PS:
  - order & slug are optional.
  - the name supposed to be a compact version of the title (the `h1`/`#` heading).
    e.g. if the title is: `Ngaox integration with the Angular framework` the name could be: `Ngaox and Angular`
- The file path match a section `content` glob pattern (see [Docs Sections](./app/src/app/core/data/docs-sections.ts))
