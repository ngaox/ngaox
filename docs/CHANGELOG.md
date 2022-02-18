## [3.0.2](https://github.com/ngaox/ngaox/compare/v3.0.1...v3.0.2) (2022-02-16)

### Bug Fixes

- **docs-app:** :bug: synchronization between TOC active state and its links navigations ([b672e41](https://github.com/ngaox/ngaox/commit/b672e41025619c3ed0191447436a5bfdf9ce5d10))

## [3.0.1](https://github.com/ngaox/ngaox/compare/v3.0.0...v3.0.1) (2022-02-14)

### Bug Fixes

- **docs-app:** deployement unavailable firebase `projectId` ([5cd62f8](https://github.com/ngaox/ngaox/commit/5cd62f8fd0de02f48dd3263a4e8094352f954c6b))

# [3.0.0](https://github.com/ngaox/ngaox/compare/v2.0.0...v3.0.0) (2022-02-14)

### Bug Fixes

- :bug: version difference between packages ([05528df](https://github.com/ngaox/ngaox/commit/05528df8cf631e96685dc5d6d57e28795459a90e))
- :triangular_flag_on_post: extract helper scripts & schematics from packages ([afd3fb7](https://github.com/ngaox/ngaox/commit/afd3fb71249a369a680d760555add104f44dc136))
- docs accessing old API & release workflow fetch depth ([c78616c](https://github.com/ngaox/ngaox/commit/c78616c08f6796fa815abdecbb0044befde84d3a))
- **docs-app:** :ambulance: incompatibility with new build system ([a184e68](https://github.com/ngaox/ngaox/commit/a184e6815515cd107e0fd37b9d66d43273b607db))
- **docs-app:** :bug: docs TOC unexpected behaviors and performance ([7aad667](https://github.com/ngaox/ngaox/commit/7aad667aacc8d48b55744f1994b6e9067ba0ae22))
- **docs-content:** correct LICENSE year & README badge url ([a0bfab1](https://github.com/ngaox/ngaox/commit/a0bfab1f57f1758991729754161d786a6a2414a1))
- links after transferring repository ([371d346](https://github.com/ngaox/ngaox/commit/371d346200e0d350b543d5b9d1f63d40ad7db6de))
- **tools:** version variable assignment without declaration ([94c1ac5](https://github.com/ngaox/ngaox/commit/94c1ac5ad67e7a0c7eb8eaef255a8d7f404b764a))

### Features

- **devkit:** :sparkles: initialize devkit package ([3cface8](https://github.com/ngaox/ngaox/commit/3cface8047a36007a52df670e93fbd454b24f8f6)), closes [#94](https://github.com/ngaox/ngaox/issues/94)
- **docs-app:** :sparkles: redesign home page and add missing sections ([402d6fc](https://github.com/ngaox/ngaox/commit/402d6fc3685f429c05694509966df53ca1f61feb)), closes [#38](https://github.com/ngaox/ngaox/issues/38)
- **docs-app:** implement docs table of content ([654b205](https://github.com/ngaox/ngaox/commit/654b2055076cc607eafdac3b3131b65b0a5a38de)), closes [#25](https://github.com/ngaox/ngaox/issues/25) [#115](https://github.com/ngaox/ngaox/issues/115)
- **docs-app:** redesing docs sidebar ([b28b1ac](https://github.com/ngaox/ngaox/commit/b28b1ac69c60b67518fd92c31af06f06768a34aa))

### Reverts

- :coffin: remove `docs-functions` app & all `deploy` targets ([4f30fc4](https://github.com/ngaox/ngaox/commit/4f30fc4a628393256a1cf2366b1bfecf3676f213)), closes [#63](https://github.com/ngaox/ngaox/issues/63)
- :rewind: remove chaospad package from the repo ([#93](https://github.com/ngaox/ngaox/issues/93)) ([e2345bc](https://github.com/ngaox/ngaox/commit/e2345bc33a0f6616ee09707d04f484638102fd47))
- **docs:** :coffin: remove docs functions & prepare for the new docs content build system ([941b16f](https://github.com/ngaox/ngaox/commit/941b16f6547c47acc86167b81b94174ba57b206b)), closes [#104](https://github.com/ngaox/ngaox/issues/104)

# [2.0.0](https://github.com/ngaox/ngaox/compare/v1.5.1...v2.0.0) (2022-01-02)

### Bug Fixes

- :bug: remove inited tests and normalize prefixes ([9be30d1](https://github.com/ngaox/ngaox/commit/9be30d14affd6535df2b5e5ff80212293e506b03))

### Code Refactoring

- :clown_face: netlify functions => firebase functions ([91fdfe7](https://github.com/ngaox/ngaox/commit/91fdfe7eb00c268cc58d59279cd242533be13d0b))

### BREAKING CHANGES

- netlify functions is not compatible with firebase functions

## [1.5.1](https://github.com/ngaox/ngaox/compare/v1.5.0...v1.5.1) (2021-11-21)

### Reverts

- **padup:** :alien: extract padup from main source ([eb81bd6](https://github.com/ngaox/ngaox/commit/eb81bd6e42691e5462c409c36c545cf17523b2dd))

# [1.5.0](https://github.com/ngaox/ngaox/compare/v1.4.0...v1.5.0) (2021-11-20)

### Bug Fixes

- **docs:** add a fixed version of local dependacies ([866fd51](https://github.com/ngaox/ngaox/commit/866fd51c9b26f1e2c98a15487a21135873e0362b))
- **docs:** layout shift on navigation ([f76c9f0](https://github.com/ngaox/ngaox/commit/f76c9f06500f3bf29080b6c8415e15c7f2c19793))
- **docs:** navbar responsiveness ([1fbf349](https://github.com/ngaox/ngaox/commit/1fbf349b3dfbf49806a3f2efd5b212b806df8cc9))
- **icons:** svg ignore height ([fd5ada7](https://github.com/ngaox/ngaox/commit/fd5ada79bdf785ca329c0abdc264fb9cc05d82d2))
- specify node version in .nvmrc ([8db170a](https://github.com/ngaox/ngaox/commit/8db170a43befb68df83ed133bac0c932ccd332c4))

### Features

- **docs:** :art: improve sidenav ([183b0f2](https://github.com/ngaox/ngaox/commit/183b0f2314d0e142b1d3b86584b256f7245d09a6))
- **docs:** add categories page content ([9caa1a8](https://github.com/ngaox/ngaox/commit/9caa1a8c1b1d329bf458729dfba3765ef5bb7781))
- **docs:** add default markdown styling ([b25bc5f](https://github.com/ngaox/ngaox/commit/b25bc5fb86282403bc456fcbb021aa95757c3ef5))
- **docs:** add docs pages links on a sidebar ([409f516](https://github.com/ngaox/ngaox/commit/409f5160fb5c1a378f7f8096d90ef5f10f8908da)), closes [#24](https://github.com/ngaox/ngaox/issues/24)
- **docs:** add footer bar content ([f143674](https://github.com/ngaox/ngaox/commit/f143674b09f19ae08066e29b6b57b15b75e7ad8b))
- **docs:** add home hero section ([1d72bd0](https://github.com/ngaox/ngaox/commit/1d72bd0b02eb58a6e0ab495a87d99077e4a9a5ad))
- **docs:** add progress bar and correct title ([76fb5a1](https://github.com/ngaox/ngaox/commit/76fb5a1f39cbfb7cc6579809f21a7792e52a1495))
- **docs:** implement docs page from md content ([efa3746](https://github.com/ngaox/ngaox/commit/efa374673a9036a03a5a9e33498bc64d1a23351c)), closes [#23](https://github.com/ngaox/ngaox/issues/23)
- **docs:** init footer component ([21c65db](https://github.com/ngaox/ngaox/commit/21c65db6285bcff9d4260f2b3abb95e5c1e319ac))
- **docs:** init pages components and routing ([ba91783](https://github.com/ngaox/ngaox/commit/ba9178318f2fc62741ffe4dbf3c336e5c9d1b2d1))
- **icons:** add arrows icons ([ee2e767](https://github.com/ngaox/ngaox/commit/ee2e767931645575df4ff8233bc42621fe21c973))

# [1.4.0](https://github.com/ngaox/ngaox/compare/v1.3.2...v1.4.0) (2021-09-18)

### Bug Fixes

- **icons:** prevent inconsistent logos/namespaces naming ([cdb3bd9](https://github.com/ngaox/ngaox/commit/cdb3bd9d0fd1b808ee3b5de0f0d3f16334b7e084))
- **icons:** unset default width ([86fabe8](https://github.com/ngaox/ngaox/commit/86fabe8476ce8770f58ee8f7172d2068925c7360))

### Features

- **docs:** setup angular material and navigation components ([31ccd9a](https://github.com/ngaox/ngaox/commit/31ccd9a121f2cf2155081218d735bf4e604146cd))

## [1.3.2](https://github.com/ngaox/ngaox/compare/v1.3.1...v1.3.2) (2021-09-12)

### Bug Fixes

- **icons:** yargs invalid argument alias ([1df7caa](https://github.com/ngaox/ngaox/commit/1df7caa88e848e37fbff586a858d8def88f454ad))

## [1.3.1](https://github.com/ngaox/ngaox/compare/v1.3.0...v1.3.1) (2021-09-12)

### Bug Fixes

- **icons:** bin commad missing dependecies ([9130b47](https://github.com/ngaox/ngaox/commit/9130b47d3d58ca3370dbe392081e58aeed107c38))
- **models:** correct `file.uploadedAt` property name ([837a2b8](https://github.com/ngaox/ngaox/commit/837a2b8092c90a3d48747cf10727d268c84a20c7))
- **padup:** paths error across platforms ([edaf369](https://github.com/ngaox/ngaox/commit/edaf36951fe334108f790598b9f80e58fefd809c))

### Features

- **chaospad:** add user validators ([a207a09](https://github.com/ngaox/ngaox/commit/a207a0914b191f60899258dba111bb2433a609a2))
- **icons:** `IconsModule.forRoot()` to define fallback icon & register a globa icons ([6325567](https://github.com/ngaox/ngaox/commit/63255677412d795ee3671ccecb1d5683d3486739)), closes [#99](https://github.com/ngaox/ngaox/issues/99)
- **icons:** add social platforms logos icons ([44de8fa](https://github.com/ngaox/ngaox/commit/44de8faf02ee7bb45ee827481e51f4e0922dcd7d))
- **icons:** add svg directory build command ([1310fa3](https://github.com/ngaox/ngaox/commit/1310fa38f87122b38c8b9d27f14ada4368cb02d9))
- **icons:** setup `@ngaox/icons` an angular library to manage svgs ([6982d87](https://github.com/ngaox/ngaox/commit/6982d87282452f55979ca1bbf09c0b1f2130d93c))
- **icons:** update `ngaox-icons` build commad ([ef8f902](https://github.com/ngaox/ngaox/commit/ef8f90230e025dfaf5eda4690a4c7f8e201f8c25))
- restore docs-app with the same setup ([7a81010](https://github.com/ngaox/ngaox/commit/7a81010927bc63097da5db219253c05065217da6))
- **seo:** provide a helper function to get activated route ([3bdc5ae](https://github.com/ngaox/ngaox/commit/3bdc5ae7d539f3a7540846104613e74f10221c2f))
- **validators:** add topic validators (topicname, title, type, alias...) ([90d8ab1](https://github.com/ngaox/ngaox/commit/90d8ab17509be90df4b8f16067263bcb4dff1ba1))
- **validators:** add user bio validator ([1afea28](https://github.com/ngaox/ngaox/commit/1afea287911e08c41280ae673b356b7e78f01fec))
- **validators:** add user birthday validator ([9fe5bb5](https://github.com/ngaox/ngaox/commit/9fe5bb54fdb37717741e28038f4c9a5a3ef592a3))

### Reverts

- remove `docs` app ([e977275](https://github.com/ngaox/ngaox/commit/e977275157e4e095ac8ec24f13e13a6812efd37c))

# [1.2.0](https://github.com/ngaox/ngaox/compare/aae28b0863689f8b849beee996e331cd3bfd3999...v1.2.0) (2021-08-13)

### Bug Fixes

- `ApiService` not provided ([cf8d37f](https://github.com/ngaox/ngaox/commit/cf8d37fd4fc6d34b6539d873077441b3741fd219))
- ci karma browser ([c9e271d](https://github.com/ngaox/ngaox/commit/c9e271d10f6cea4734fb0c54759cb51628e9b944))
- ci karma tests browser ([9454a99](https://github.com/ngaox/ngaox/commit/9454a99a629f7450a373b5c4f3f10cfcbee3cc29))
- **docs:** accordion open/close animation ([c5aa6ec](https://github.com/ngaox/ngaox/commit/c5aa6ec3a41cb894ee65f61f98aacfb8cdfb2b24))
- **nav:** correct `.nav-accordion` styling ([c1ee4b7](https://github.com/ngaox/ngaox/commit/c1ee4b7b4b50347502fb6110b57c045cf7daf0ae))
- **padup:** low contrasts & unecissery spacing ([affc0aa](https://github.com/ngaox/ngaox/commit/affc0aaaeb5ac560ddea390078dc5f243bd8f952))
- remove unexsisting files import statements ([f0a6f33](https://github.com/ngaox/ngaox/commit/f0a6f337bba142484758cf406239cd4d3077ea53))
- schematics source file type ([231004d](https://github.com/ngaox/ngaox/commit/231004d3fdd19533f3241490740da4dabf5375bc))
- scripts slashes ([6747e23](https://github.com/ngaox/ngaox/commit/6747e23d8b8dba16f1986378264899ea048fd314))
- **seo:** :bug: `SeoService` NG0201 error when SeoModule is not imported ([d9c3be3](https://github.com/ngaox/ngaox/commit/d9c3be391f087376ed19f738d9770e1b901b5c85))
- services providation scop ([f04ec0d](https://github.com/ngaox/ngaox/commit/f04ec0dd2d538d983cd42854537a73f77c46720b))
- type errors ([aae28b0](https://github.com/ngaox/ngaox/commit/aae28b0863689f8b849beee996e331cd3bfd3999))
- update release-please bootstrap-sha ([51dbf6e](https://github.com/ngaox/ngaox/commit/51dbf6e7e913d95c7d5e77669b026bf8ad633947))
- update release-please bootstrap-sha ([b5429f8](https://github.com/ngaox/ngaox/commit/b5429f8c45c4060dfa6d1d4766a3d0b470f50e17))

### Features

- :sparkles: setup scully ([42da76e](https://github.com/ngaox/ngaox/commit/42da76efe3cba6d35a2762db8e71ce399926f614))
- add `AuthService` to facilate auth related api calls ([f10a16f](https://github.com/ngaox/ngaox/commit/f10a16f07e54c01ddd09b522a8487dd0c7f2b03f))
- add base typography stylings ([b903402](https://github.com/ngaox/ngaox/commit/b9034020898886deab704a4cee1494495f52fb50))
- **base:** provide default styling for all HTML elements ([f669c69](https://github.com/ngaox/ngaox/commit/f669c696df1340a062357d14e5bd3d123b05c0b0)), closes [#12](https://github.com/ngaox/ngaox/issues/12)
- **base:** provide default styling for all HTML elements ([246ddd0](https://github.com/ngaox/ngaox/commit/246ddd067b57b42e28498ecb0029e2675ef8e792)), closes [#12](https://github.com/ngaox/ngaox/issues/12)
- **cp:** provide `getApiBase` function in api service ([25a2b51](https://github.com/ngaox/ngaox/commit/25a2b513ac221bb1ecdba6060e179b93a44701d1))
- **cp:** provide chaospad-api service ([3bc8583](https://github.com/ngaox/ngaox/commit/3bc8583b22678fe4b7473c9ecb1a148c05eaaa5b)), closes [#22](https://github.com/ngaox/ngaox/issues/22)
- **cp:** set chaospad dev api as `ApiService` default endpoint ([5c14064](https://github.com/ngaox/ngaox/commit/5c14064e2f4ab26184b74aaa03ee670930c9aa31))
- imporove docs app styling & add md syntax highlight with prismjs ([e7d019f](https://github.com/ngaox/ngaox/commit/e7d019fb57432e830348f3ec69aaa527a0b7523e))
- **padup:** add `button`, `overlay`, `nav`, `container` components ([b09fd7d](https://github.com/ngaox/ngaox/commit/b09fd7d4b0c5f87ce0b748e1ea15dd0988b5719f))
- **padup:** add accordion nav modifier ([4777eb1](https://github.com/ngaox/ngaox/commit/4777eb18d17ff6e79d083473a5a83147fb165046))
- **padup:** add button component & its modifiers ([e230160](https://github.com/ngaox/ngaox/commit/e2301601bd53eef5b7974599f1463a327ab6e35d))
- **padup:** defaults reset & scrollbar stylling ([2bfbaf4](https://github.com/ngaox/ngaox/commit/2bfbaf482cd18576c9f49f9b3ee232fe93945d10))
- **padup:** styling root & ::section ([b01f67f](https://github.com/ngaox/ngaox/commit/b01f67fb09215615aed8d6d03794f4af8fff25c2))
- **table:** add table component base styling ([8d73dc3](https://github.com/ngaox/ngaox/commit/8d73dc365fe4990706f7bf0951a49dc8f12b935d))
- update docs sidebar ([1dfbe76](https://github.com/ngaox/ngaox/commit/1dfbe767a2fff844a3e78ee00e4779253c97bd74))
- use grid layout for docs app & init navbar ([6c48244](https://github.com/ngaox/ngaox/commit/6c48244472ebb4a870ffab8f049dd882d038b512))