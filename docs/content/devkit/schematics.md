---
name: Schematics in Ngaox
order: 1
---

@ngaox/devkit provides the ng-add schematics aliased setup that setup Ngaox Devkit builders and configuration.
In addition, it provides other schematics that can be used to setup Ngaox Devkit features.

## Setup Ngaox

Run the following command to setup Ngaox Devkit, this will prompt you to choose the features you want to setup:

```bash
ng generate @ngaox/devkit:setup
```

And to setup a specific feature, run one of the following commands:

### SEO

```bash
ng generate @ngaox/devkit:setup --features=seo
```

### Icons

```bash
ng generate @ngaox/devkit:setup --features=icons
```

### SEO and Icons

```bash
ng generate @ngaox/devkit:setup --features=seo,icons
```
