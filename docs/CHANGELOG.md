## [5.0.2](https://github.com/ngaox/ngaox/compare/v5.0.1...v5.0.2) (2026-02-15)


### Bug Fixes

* **@ngaox/seo:** use name for Twitter Card image alt ([256edef](https://github.com/ngaox/ngaox/commit/256edef2ec729f545ec897291d8d312321f046fc))
* Symbol is no more supported as InjectionToken [skip ci] ([7076676](https://github.com/ngaox/ngaox/commit/70766764b5fe150565dd91952440380a35a0602e))



## [5.0.1](https://github.com/ngaox/ngaox/compare/v5.0.0...v5.0.1) (2024-09-07)


### Bug Fixes

* **@ngaox/icons:** :bug: cant inject destroy ref in effect ([fbe00cc](https://github.com/ngaox/ngaox/commit/fbe00ccb05c239a8a7bf7599a52245c4cc2126f2))
* **infra:** update actions node version ([eab816c](https://github.com/ngaox/ngaox/commit/eab816c298811c4a208c25125f69929e56f32b0b))


### Reverts

* **docs:** temporally remove docs stuff ([3f24264](https://github.com/ngaox/ngaox/commit/3f2426443151afbce55b797362ab964959bc5e6b))
* remove devkit and press packages ([f42be67](https://github.com/ngaox/ngaox/commit/f42be67cd4003f9bf3b05528b61935f468d1f544))



# [5.0.0](https://github.com/ngaox/ngaox/compare/v4.2.0...v5.0.0) (2023-05-04)


### Bug Fixes

* **@ngaox/devkit:** :bug: browser opens on each changes ([19fda83](https://github.com/ngaox/ngaox/commit/19fda83f1927f2b266258df04bd63f19f5ed3417))
* **@ngaox/devkit:** :pushpin: set releevent peerDependencies ([12fa9c7](https://github.com/ngaox/ngaox/commit/12fa9c7366452d3bc12a324e6ab4deeaa0e00bf6))
* **@ngaox/devkit:** ensure everything works is as expected ([66a5b48](https://github.com/ngaox/ngaox/commit/66a5b4883f3e0bec219b3d7ae157de23ef1b2212))
* **@ngaox/devkit:** restore builders logic ([38c0b01](https://github.com/ngaox/ngaox/commit/38c0b01813f8b98d13ef22c58327dbf171c1e9b0))
* correct templates workflow ([#242](https://github.com/ngaox/ngaox/issues/242)) ([a05096e](https://github.com/ngaox/ngaox/commit/a05096e9540e6877b3eb1ce5484ba7abd39c8206))


* chore!: bump major version ([08e19a8](https://github.com/ngaox/ngaox/commit/08e19a80523f1e87e39c2a51636aa87fb538d46c))


### Features

* :tada: init templates submodules ([22a2f9b](https://github.com/ngaox/ngaox/commit/22a2f9be1f7c4368eec288a093b54d29eac1f9fc))
* **@ngaox/devkit:** add other Angular builders ([981048a](https://github.com/ngaox/ngaox/commit/981048a658201d23409c261e17b1ef4aca9fc987))
* **@ngaox/devkit:** schematics ([e1cf406](https://github.com/ngaox/ngaox/commit/e1cf4064e271ce4fa3c824af4f15d8c1aaf242f0))
* **@ngaox/devkit:** update builders ([4cc08e8](https://github.com/ngaox/ngaox/commit/4cc08e8fec275e681fb07e4877f9f758577e8abf)), closes [#213](https://github.com/ngaox/ngaox/issues/213) [#212](https://github.com/ngaox/ngaox/issues/212)
* **docs:** improve hero section text ([4d3f890](https://github.com/ngaox/ngaox/commit/4d3f890abaaf079d27077a5cf154edf54dcab7b8))
* **infra:** update templates & deployement ([01b5af6](https://github.com/ngaox/ngaox/commit/01b5af61fa3fbcd0159fc95cae55643ad8007c6e))


### BREAKING CHANGES

* v5.0.0



# [4.2.0](https://github.com/ngaox/ngaox/compare/v4.1.0...v4.2.0) (2022-05-01)


### Bug Fixes

* **@ngaox/devkit:** weird chokidar events emiting p.2 :/ ([6e07766](https://github.com/ngaox/ngaox/commit/6e07766af1b363a9814f9fd8035e8cc76ac8155c))


### Features

* **docs:** :sparkles: 404 page & simple UI improvements ([cd2bfc3](https://github.com/ngaox/ngaox/commit/cd2bfc352d75c266f1198599716add7bbb6186ae)), closes [#120](https://github.com/ngaox/ngaox/issues/120) [#36](https://github.com/ngaox/ngaox/issues/36)


### Performance Improvements

* **@ngaox/icons:** icons should be laoded only `.forRoot` modules ([8de7d4b](https://github.com/ngaox/ngaox/commit/8de7d4bb92c37a8298db7533d560f6adde1c282b))



# [4.1.0](https://github.com/ngaox/ngaox/compare/v4.0.3...v4.1.0) (2022-04-18)


### Bug Fixes

* **@ngaox/devkit:** weird chokidar events emiting :/ ([f217a6e](https://github.com/ngaox/ngaox/commit/f217a6edcb31d7ae335fef2c97e04a473299b5f1))
* **infra:** browser library should not depend on nodejs one (devkit) ([8e1cc37](https://github.com/ngaox/ngaox/commit/8e1cc37b504ccad793a78c20a263b5c5d30fe473))


### Features

* **@ngaox/icons:** :sparkles: auto load built icons instead of using an Adapter ([e4ae8e0](https://github.com/ngaox/ngaox/commit/e4ae8e0959d388b162b25b6dc66b7f12a745d030))



## [4.0.3](https://github.com/ngaox/ngaox/compare/v4.0.2...v4.0.3) (2022-04-17)


### Bug Fixes

* **@ngaox/devkit:** ensure contests mapper generate all files ([b0572d5](https://github.com/ngaox/ngaox/commit/b0572d5de71cafaab6d0d493384beb37257edc1b))
* **@ngaox/devkit:** provide default outputPath value ([81ee489](https://github.com/ngaox/ngaox/commit/81ee489b83a1974c0cc5bbff6d868f6b1c06d095))



## [4.0.2](https://github.com/ngaox/ngaox/compare/v4.0.1...v4.0.2) (2022-04-17)


### Bug Fixes

* **@ngaox/devkit:** ensure json schema match object type ([831213c](https://github.com/ngaox/ngaox/commit/831213c77e92555cbdd06dc7220e8a373fb09e59))



## [4.0.1](https://github.com/ngaox/ngaox/compare/v4.0.0...v4.0.1) (2022-04-17)


### Bug Fixes

* **@ngaox/devkit:** ngBuild task should not delete other tasks output ([a036fd3](https://github.com/ngaox/ngaox/commit/a036fd3a79a3722c009679928d036291409a3b1b))



# [4.0.0](https://github.com/ngaox/ngaox/compare/v3.6.0...v4.0.0) (2022-04-16)


### Bug Fixes

* **@ngaox/devkit:** disable outdated schematics ([0e6d1be](https://github.com/ngaox/ngaox/commit/0e6d1be184e3d12973c87ace5c79b4fdfc925932))
* **@ngaox/devkit:** polynomial regular expression used on uncontrolled data ([339cb7c](https://github.com/ngaox/ngaox/commit/339cb7c029bb76cd2f3015db4063e235f09d704e))
* **@ngaox/devkit:** send icons definition updates ([df3a31d](https://github.com/ngaox/ngaox/commit/df3a31d0ecd801db21c09e75d28391bcaea6f1fa))
* **docs:** update ngaox builder configs ([e8952ed](https://github.com/ngaox/ngaox/commit/e8952ed0f334f7dbf2782fffb9727ea1f8449f59))


### Code Refactoring

* **@ngaox/devkit:** rollback to same angular builders schemas for compatibility purposes ([fb8b5bd](https://github.com/ngaox/ngaox/commit/fb8b5bd6281468e23f4c9b7656563c417eb4da31))


### Features

* **@ngaox/devkit:** implement contests press mapper ([584b8b9](https://github.com/ngaox/ngaox/commit/584b8b98303652f84f670b2c86e5c3d554306fa7))
* **@ngaox/icons:** :sparkles: add options to build icons from src ([01115c2](https://github.com/ngaox/ngaox/commit/01115c2f92d6f80a6eb091d4f32628bbb3e46fb8))
* **docs:** :memo: update docs content ([077832c](https://github.com/ngaox/ngaox/commit/077832cb89dcb593ce52e717dfe75e014db39dc3))
* **docs:** :sparkles: improve docs website ([b651cae](https://github.com/ngaox/ngaox/commit/b651cae2be6179b1b852540646a721840669b431))
* **docs:** :sparkles: re-design table of contents ([eaa8a62](https://github.com/ngaox/ngaox/commit/eaa8a62c38fd8a8c704e6ad2828665a181d9798d))


### BREAKING CHANGES

* **@ngaox/devkit:** supperted configs changed



# [3.6.0](https://github.com/ngaox/ngaox/compare/v3.5.4...v3.6.0) (2022-04-12)


### Features

* **@ngaox/seo:** option for `extra` meta tags ([#173](https://github.com/ngaox/ngaox/issues/173)) ([0ce8411](https://github.com/ngaox/ngaox/commit/0ce84110132ba91f386e994edc751cb6b341cd68))



## [3.5.4](https://github.com/ngaox/ngaox/compare/v3.5.3...v3.5.4) (2022-03-24)


### Bug Fixes

* **@ngaox/devkit:** :bug: output both challenge & editions for periodic challenges ([b3af10b](https://github.com/ngaox/ngaox/commit/b3af10b2e9a87862be3cd2d56b9eebec5adcfb70))



## [3.5.3](https://github.com/ngaox/ngaox/compare/v3.5.2...v3.5.3) (2022-03-22)


### Bug Fixes

* **@ngaox/devkit:** reduce challenges press-mapper content map size ([7805e89](https://github.com/ngaox/ngaox/commit/7805e89af4914d0c471ce30ac30d25f18ac99069))



## [3.5.2](https://github.com/ngaox/ngaox/compare/v3.5.1...v3.5.2) (2022-03-21)


### Bug Fixes

* **@ngaox/devkit:** :bug: remove unnecessary fields in content map ([95055a4](https://github.com/ngaox/ngaox/commit/95055a47c4f8a6c4b5c6f1f43b4c9bf8abb32755))



## [3.5.1](https://github.com/ngaox/ngaox/compare/v3.5.0...v3.5.1) (2022-03-20)


### Bug Fixes

* **deps-dev:** remove duplicated dependacy ([cb02aee](https://github.com/ngaox/ngaox/commit/cb02aeead7d310158b8e9cfaecb613d4de9227d5))



# [3.5.0](https://github.com/ngaox/ngaox/compare/v3.4.3...v3.5.0) (2022-03-20)


### Features

* **@ngaox/devkit:** :sparkles: add challenges press mapper ([f1f3991](https://github.com/ngaox/ngaox/commit/f1f3991f9b3460d1dec2ac19d407835eb4aab05a))
* **@ngaox/press:** :sparkles: introducing Ngaox Press ([400c2a6](https://github.com/ngaox/ngaox/commit/400c2a6f48dfee2414fec9db8c6aa99495d5fbcb))
* **docs:** add some getting started docs ([f4a6c3d](https://github.com/ngaox/ngaox/commit/f4a6c3d778c5f1c075ad2e7d163aa88e8d874839))



## [3.4.3](https://github.com/ngaox/ngaox/compare/v3.4.2...v3.4.3) (2022-03-18)


### Bug Fixes

* **@ngaox/devkit:** builder never actually complete ([aa3e181](https://github.com/ngaox/ngaox/commit/aa3e181f7f4868a20610c0ec4ad4716131c4a523))



## [3.4.2](https://github.com/ngaox/ngaox/compare/v3.4.1...v3.4.2) (2022-03-18)


### Bug Fixes

* **@ngaox/devkit:** prevent type error when not using a builder option ([1d85b57](https://github.com/ngaox/ngaox/commit/1d85b57549470ce7def4eeedf53da1c0657bb980))



## [3.4.1](https://github.com/ngaox/ngaox/compare/v3.4.0...v3.4.1) (2022-03-18)


### Bug Fixes

* **@ngaox/devkit:** remove options diffrence btwn builder and dev-server ([1390787](https://github.com/ngaox/ngaox/commit/1390787d62ccc63153e41cc204d29dd7d3659452))



# [3.4.0](https://github.com/ngaox/ngaox/compare/v3.3.5...v3.4.0) (2022-03-18)


### Bug Fixes

* **@ngaox/devkit:** ensure all dependacies added to package.json ([01bf6b8](https://github.com/ngaox/ngaox/commit/01bf6b8086d7865adb31766e7e8f5bcab0a75caa))
* **@ngaox/devkit:** remove title from docs press mapper ([9f92d76](https://github.com/ngaox/ngaox/commit/9f92d766e6a709d90456867dfcf6646441439863))


### Features

* **docs:** redesign docs layout ([5834dec](https://github.com/ngaox/ngaox/commit/5834deccfae01c3febd13249c4efa373166a51b6))



## [3.3.5](https://github.com/ngaox/ngaox/compare/v3.3.4...v3.3.5) (2022-03-17)


### Bug Fixes

* **@ngaox/devkit:** remove unnecessary fields from content map ([8274e7f](https://github.com/ngaox/ngaox/commit/8274e7f2b898fac7d7b4478e23fe8e5dc4a9037b))



## [3.3.4](https://github.com/ngaox/ngaox/compare/v3.3.3...v3.3.4) (2022-03-17)


### Bug Fixes

* **@ngaox/devkit:** ensure ngBuilder doesnt remove other assets ([5c5dfce](https://github.com/ngaox/ngaox/commit/5c5dfce9092358700c09f99bffdc90f26c6e78fe))
* **@ngaox/devkit:** remove unnecessary fields from content map ([c19da5a](https://github.com/ngaox/ngaox/commit/c19da5ae49e7ce485df01055f9a5c5114b0097c5))



## [3.3.3](https://github.com/ngaox/ngaox/compare/v3.3.2...v3.3.3) (2022-03-16)


### Reverts

* reenable docs deployment ([1fc7f83](https://github.com/ngaox/ngaox/commit/1fc7f83c29aead54a4bbd595f95035be541bc2c0))



## [3.3.2](https://github.com/ngaox/ngaox/compare/v3.3.1...v3.3.2) (2022-03-16)


### Bug Fixes

* **@ngaox/devkit:** node.js stdout clearline() and cursorTo() are not functions ([3b35057](https://github.com/ngaox/ngaox/commit/3b35057c820f6293c38b984397f5f75d9d5bf242))



## [3.3.1](https://github.com/ngaox/ngaox/compare/v3.3.0...v3.3.1) (2022-03-16)


### Bug Fixes

* **docs:** ensure docs items are sorted in the sidebar ([b3264d5](https://github.com/ngaox/ngaox/commit/b3264d5dbaecc1598acf2bcfe7fc0a7608742dda))



# [3.3.0](https://github.com/ngaox/ngaox/compare/v3.2.2...v3.3.0) (2022-03-16)


### Features

* **devkit:** provide docs press mapper ([21dbb22](https://github.com/ngaox/ngaox/commit/21dbb22b2f1177580524ec4df831b1b9218077ed))



## [3.2.2](https://github.com/ngaox/ngaox/compare/v3.2.1...v3.2.2) (2022-03-15)


### Bug Fixes

* **devkit:** ensure content is available with dev-server ([e5f6a00](https://github.com/ngaox/ngaox/commit/e5f6a00ebe4939b33f8b195ca23423b91b8a800e))



## [3.2.1](https://github.com/ngaox/ngaox/compare/v3.2.0...v3.2.1) (2022-03-15)


### Bug Fixes

* :green_heart: add missing deploy workflow step ([f394be4](https://github.com/ngaox/ngaox/commit/f394be4bb0f1052928f33054a0d6625d25562813))



# [3.2.0](https://github.com/ngaox/ngaox/compare/v3.1.3...v3.2.0) (2022-03-15)


### Bug Fixes

* **icons:** allow changing color of default fallback icon ([ce31e9b](https://github.com/ngaox/ngaox/commit/ce31e9b916d9260cc5165287261cd9873bf1c06b))


### Features

* **devkit:** :sparkles: add Ngaox Builder ([151d53b](https://github.com/ngaox/ngaox/commit/151d53bc6679287154e2e552472b5ef40cf6bb09)), closes [#139](https://github.com/ngaox/ngaox/issues/139) [#135](https://github.com/ngaox/ngaox/issues/135)
* **devkit:** allow builder multi configs options & set defaults ([3cc1ce9](https://github.com/ngaox/ngaox/commit/3cc1ce9d14e42266d60e674b98c08996f2051549)), closes [#136](https://github.com/ngaox/ngaox/issues/136)
* **devkit:** provide dev-server builder ([69660a9](https://github.com/ngaox/ngaox/commit/69660a94794865c9e8c528d6379a2f705c4fa0d1))
* **devkit:** support generating content map (& custom mappers) ([80f9325](https://github.com/ngaox/ngaox/commit/80f93251b4dab9500ef125eeb502546878bc6fee)), closes [#137](https://github.com/ngaox/ngaox/issues/137)



## [3.1.3](https://github.com/ngaox/ngaox/compare/v3.1.2...v3.1.3) (2022-02-26)


### Bug Fixes

* **icons:** improve override logic and ensure lazy icons works ([7c9b5e2](https://github.com/ngaox/ngaox/commit/7c9b5e2410bd71bdf90a1541fe80744e1f283e64))



## [3.1.2](https://github.com/ngaox/ngaox/compare/v3.1.1...v3.1.2) (2022-02-26)


### Bug Fixes

* **docs-app:** ensure `doc-item.title` is always available in app runtime ([cd65fa7](https://github.com/ngaox/ngaox/commit/cd65fa70c5c54db22bd2d2f60d97380173d57133))



## [3.1.1](https://github.com/ngaox/ngaox/compare/v3.1.0...v3.1.1) (2022-02-25)


### Bug Fixes

* **icons:** icon not changing when input changes ([fac7897](https://github.com/ngaox/ngaox/commit/fac7897d368e1045e69c3f81d5157e2479ecf632))



# [3.1.0](https://github.com/ngaox/ngaox/compare/v3.0.2...v3.1.0) (2022-02-22)


### Bug Fixes

* **docs-app:** :bug: allow slugs to contain slashes ([59eb664](https://github.com/ngaox/ngaox/commit/59eb6640c4fe77430e5d6d0088d1d49f68a7c22a))
* **docs-app:** change SEO word color to match Ngaox color palette ([39f5764](https://github.com/ngaox/ngaox/commit/39f57642ae31f766ea11ba9c5a59d689b5a9ca66))
* ensure consistency over all the project ([a5d9efd](https://github.com/ngaox/ngaox/commit/a5d9efdc46c474bfcb3345a3ea91b2f770336d47))
* **seo:** make using seo component override the route data values ([0ad8772](https://github.com/ngaox/ngaox/commit/0ad877281ddc386e0559da5c6656ee21018b1e04))


### Features

* **devkit:** :sparkles: implement setup-seo generator ([c060ce3](https://github.com/ngaox/ngaox/commit/c060ce3ba20d702ef10b7b5d94ca2bc6ecdef6e2))
* **icons:** minor changes and add compact adapter ([db31dde](https://github.com/ngaox/ngaox/commit/db31dde125880e51dd19c339174be31844ec9b43))
* init referenced docs pages and update features data ([bab9907](https://github.com/ngaox/ngaox/commit/bab9907b851688edb9941b125bfa93476fea72a8))
* **seo:** :sparkles: add seo component and change default loader ([f8f0f3a](https://github.com/ngaox/ngaox/commit/f8f0f3abecde40d8518d1fa1f5af8b250e1c47ec))



## [3.0.2](https://github.com/ngaox/ngaox/compare/v3.0.1...v3.0.2) (2022-02-16)


### Bug Fixes

* **docs-app:** :bug: synchronization between TOC active state and its links navigations ([b672e41](https://github.com/ngaox/ngaox/commit/b672e41025619c3ed0191447436a5bfdf9ce5d10))



## [3.0.1](https://github.com/ngaox/ngaox/compare/v3.0.0...v3.0.1) (2022-02-14)


### Bug Fixes

* **docs-app:** deployement unavailable firebase `projectId` ([5cd62f8](https://github.com/ngaox/ngaox/commit/5cd62f8fd0de02f48dd3263a4e8094352f954c6b))



# [3.0.0](https://github.com/ngaox/ngaox/compare/v2.0.0...v3.0.0) (2022-02-14)


### Bug Fixes

* :bug: version difference between packages ([05528df](https://github.com/ngaox/ngaox/commit/05528df8cf631e96685dc5d6d57e28795459a90e))
* :triangular_flag_on_post: extract helper scripts & schematics from packages ([afd3fb7](https://github.com/ngaox/ngaox/commit/afd3fb71249a369a680d760555add104f44dc136))
* docs accessing old API & release workflow fetch depth ([c78616c](https://github.com/ngaox/ngaox/commit/c78616c08f6796fa815abdecbb0044befde84d3a))
* **docs-app:** :ambulance: incompatibility with new build system ([a184e68](https://github.com/ngaox/ngaox/commit/a184e6815515cd107e0fd37b9d66d43273b607db))
* **docs-app:** :bug: docs TOC unexpected behaviors and performance ([7aad667](https://github.com/ngaox/ngaox/commit/7aad667aacc8d48b55744f1994b6e9067ba0ae22))
* **docs-content:** correct LICENSE year & README badge url ([a0bfab1](https://github.com/ngaox/ngaox/commit/a0bfab1f57f1758991729754161d786a6a2414a1))
* links after transferring repository ([371d346](https://github.com/ngaox/ngaox/commit/371d346200e0d350b543d5b9d1f63d40ad7db6de))
* **tools:** version variable assignment without declaration ([94c1ac5](https://github.com/ngaox/ngaox/commit/94c1ac5ad67e7a0c7eb8eaef255a8d7f404b764a))


### Features

* **devkit:** :sparkles: initialize devkit package ([3cface8](https://github.com/ngaox/ngaox/commit/3cface8047a36007a52df670e93fbd454b24f8f6)), closes [#94](https://github.com/ngaox/ngaox/issues/94)
* **docs-app:** :sparkles: redesign home page and add missing sections ([402d6fc](https://github.com/ngaox/ngaox/commit/402d6fc3685f429c05694509966df53ca1f61feb)), closes [#38](https://github.com/ngaox/ngaox/issues/38)
* **docs-app:** implement docs table of content ([654b205](https://github.com/ngaox/ngaox/commit/654b2055076cc607eafdac3b3131b65b0a5a38de)), closes [#25](https://github.com/ngaox/ngaox/issues/25) [#115](https://github.com/ngaox/ngaox/issues/115)
* **docs-app:** redesing docs sidebar ([b28b1ac](https://github.com/ngaox/ngaox/commit/b28b1ac69c60b67518fd92c31af06f06768a34aa))


### Reverts

* :coffin: remove `docs-functions` app & all `deploy` targets ([4f30fc4](https://github.com/ngaox/ngaox/commit/4f30fc4a628393256a1cf2366b1bfecf3676f213)), closes [#63](https://github.com/ngaox/ngaox/issues/63)
* :rewind: remove chaospad package from the repo ([#93](https://github.com/ngaox/ngaox/issues/93)) ([e2345bc](https://github.com/ngaox/ngaox/commit/e2345bc33a0f6616ee09707d04f484638102fd47))
* **docs:** :coffin: remove docs functions & prepare for the new docs content build system ([941b16f](https://github.com/ngaox/ngaox/commit/941b16f6547c47acc86167b81b94174ba57b206b)), closes [#104](https://github.com/ngaox/ngaox/issues/104)



# [2.0.0](https://github.com/ngaox/ngaox/compare/v1.5.1...v2.0.0) (2022-01-02)


### Bug Fixes

* :bug: remove inited tests and normalize prefixes ([9be30d1](https://github.com/ngaox/ngaox/commit/9be30d14affd6535df2b5e5ff80212293e506b03))


### Code Refactoring

* :clown_face: netlify functions => firebase functions ([91fdfe7](https://github.com/ngaox/ngaox/commit/91fdfe7eb00c268cc58d59279cd242533be13d0b))


### BREAKING CHANGES

* netlify functions is not compatible with firebase functions



## [1.5.1](https://github.com/ngaox/ngaox/compare/v1.5.0...v1.5.1) (2021-11-21)


### Reverts

* **padup:** :alien: extract padup from main source ([eb81bd6](https://github.com/ngaox/ngaox/commit/eb81bd6e42691e5462c409c36c545cf17523b2dd))



# [1.5.0](https://github.com/ngaox/ngaox/compare/v1.4.0...v1.5.0) (2021-11-20)


### Bug Fixes

* **docs:** add a fixed version of local dependacies ([866fd51](https://github.com/ngaox/ngaox/commit/866fd51c9b26f1e2c98a15487a21135873e0362b))
* **docs:** layout shift on navigation ([f76c9f0](https://github.com/ngaox/ngaox/commit/f76c9f06500f3bf29080b6c8415e15c7f2c19793))
* **docs:** navbar responsiveness ([1fbf349](https://github.com/ngaox/ngaox/commit/1fbf349b3dfbf49806a3f2efd5b212b806df8cc9))
* **icons:** svg ignore height ([fd5ada7](https://github.com/ngaox/ngaox/commit/fd5ada79bdf785ca329c0abdc264fb9cc05d82d2))
* specify node version in .nvmrc ([8db170a](https://github.com/ngaox/ngaox/commit/8db170a43befb68df83ed133bac0c932ccd332c4))


### Features

* **docs:** :art: improve sidenav ([183b0f2](https://github.com/ngaox/ngaox/commit/183b0f2314d0e142b1d3b86584b256f7245d09a6))
* **docs:** add categories page content ([9caa1a8](https://github.com/ngaox/ngaox/commit/9caa1a8c1b1d329bf458729dfba3765ef5bb7781))
* **docs:** add default markdown styling ([b25bc5f](https://github.com/ngaox/ngaox/commit/b25bc5fb86282403bc456fcbb021aa95757c3ef5))
* **docs:** add docs pages links on a sidebar ([409f516](https://github.com/ngaox/ngaox/commit/409f5160fb5c1a378f7f8096d90ef5f10f8908da)), closes [#24](https://github.com/ngaox/ngaox/issues/24)
* **docs:** add footer bar content ([f143674](https://github.com/ngaox/ngaox/commit/f143674b09f19ae08066e29b6b57b15b75e7ad8b))
* **docs:** add home hero section ([1d72bd0](https://github.com/ngaox/ngaox/commit/1d72bd0b02eb58a6e0ab495a87d99077e4a9a5ad))
* **docs:** add progress bar and correct title ([76fb5a1](https://github.com/ngaox/ngaox/commit/76fb5a1f39cbfb7cc6579809f21a7792e52a1495))
* **docs:** implement docs page from md content ([efa3746](https://github.com/ngaox/ngaox/commit/efa374673a9036a03a5a9e33498bc64d1a23351c)), closes [#23](https://github.com/ngaox/ngaox/issues/23)
* **docs:** init footer component ([21c65db](https://github.com/ngaox/ngaox/commit/21c65db6285bcff9d4260f2b3abb95e5c1e319ac))
* **docs:** init pages components and routing ([ba91783](https://github.com/ngaox/ngaox/commit/ba9178318f2fc62741ffe4dbf3c336e5c9d1b2d1))
* **icons:** add arrows icons ([ee2e767](https://github.com/ngaox/ngaox/commit/ee2e767931645575df4ff8233bc42621fe21c973))



# [1.4.0](https://github.com/ngaox/ngaox/compare/v1.3.2...v1.4.0) (2021-09-18)


### Bug Fixes

* **icons:** prevent inconsistent logos/namespaces naming ([cdb3bd9](https://github.com/ngaox/ngaox/commit/cdb3bd9d0fd1b808ee3b5de0f0d3f16334b7e084))
* **icons:** unset default width ([86fabe8](https://github.com/ngaox/ngaox/commit/86fabe8476ce8770f58ee8f7172d2068925c7360))


### Features

* **docs:** setup angular material and navigation components ([31ccd9a](https://github.com/ngaox/ngaox/commit/31ccd9a121f2cf2155081218d735bf4e604146cd))



## [1.3.2](https://github.com/ngaox/ngaox/compare/v1.3.1...v1.3.2) (2021-09-12)


### Bug Fixes

* **icons:** yargs invalid argument alias ([1df7caa](https://github.com/ngaox/ngaox/commit/1df7caa88e848e37fbff586a858d8def88f454ad))



## [1.3.1](https://github.com/ngaox/ngaox/compare/v1.3.0...v1.3.1) (2021-09-12)


### Bug Fixes

* **icons:** bin commad missing dependecies ([9130b47](https://github.com/ngaox/ngaox/commit/9130b47d3d58ca3370dbe392081e58aeed107c38))
* **models:** correct `file.uploadedAt` property name ([837a2b8](https://github.com/ngaox/ngaox/commit/837a2b8092c90a3d48747cf10727d268c84a20c7))
* **padup:** paths error across platforms ([edaf369](https://github.com/ngaox/ngaox/commit/edaf36951fe334108f790598b9f80e58fefd809c))


### Features

* **chaospad:** add user validators ([a207a09](https://github.com/ngaox/ngaox/commit/a207a0914b191f60899258dba111bb2433a609a2))
* **icons:** `IconsModule.forRoot()` to define fallback icon & register a globa icons ([6325567](https://github.com/ngaox/ngaox/commit/63255677412d795ee3671ccecb1d5683d3486739)), closes [#99](https://github.com/ngaox/ngaox/issues/99)
* **icons:** add social platforms logos icons ([44de8fa](https://github.com/ngaox/ngaox/commit/44de8faf02ee7bb45ee827481e51f4e0922dcd7d))
* **icons:** add svg directory build command ([1310fa3](https://github.com/ngaox/ngaox/commit/1310fa38f87122b38c8b9d27f14ada4368cb02d9))
* **icons:** setup `@ngaox/icons` an angular library to manage svgs ([6982d87](https://github.com/ngaox/ngaox/commit/6982d87282452f55979ca1bbf09c0b1f2130d93c))
* **icons:** update `ngaox-icons` build commad ([ef8f902](https://github.com/ngaox/ngaox/commit/ef8f90230e025dfaf5eda4690a4c7f8e201f8c25))
* restore docs-app with the same setup ([7a81010](https://github.com/ngaox/ngaox/commit/7a81010927bc63097da5db219253c05065217da6))
* **seo:** provide a helper function to get activated route ([3bdc5ae](https://github.com/ngaox/ngaox/commit/3bdc5ae7d539f3a7540846104613e74f10221c2f))
* **validators:** add topic validators (topicname, title, type, alias...) ([90d8ab1](https://github.com/ngaox/ngaox/commit/90d8ab17509be90df4b8f16067263bcb4dff1ba1))
* **validators:** add user bio validator ([1afea28](https://github.com/ngaox/ngaox/commit/1afea287911e08c41280ae673b356b7e78f01fec))
* **validators:** add user birthday validator ([9fe5bb5](https://github.com/ngaox/ngaox/commit/9fe5bb54fdb37717741e28038f4c9a5a3ef592a3))


### Reverts

* remove `docs` app ([e977275](https://github.com/ngaox/ngaox/commit/e977275157e4e095ac8ec24f13e13a6812efd37c))



# [1.2.0](https://github.com/ngaox/ngaox/compare/aae28b0863689f8b849beee996e331cd3bfd3999...v1.2.0) (2021-08-13)


### Bug Fixes

* `ApiService` not provided ([cf8d37f](https://github.com/ngaox/ngaox/commit/cf8d37fd4fc6d34b6539d873077441b3741fd219))
* ci karma browser ([c9e271d](https://github.com/ngaox/ngaox/commit/c9e271d10f6cea4734fb0c54759cb51628e9b944))
* ci karma tests browser ([9454a99](https://github.com/ngaox/ngaox/commit/9454a99a629f7450a373b5c4f3f10cfcbee3cc29))
* **docs:** accordion open/close animation ([c5aa6ec](https://github.com/ngaox/ngaox/commit/c5aa6ec3a41cb894ee65f61f98aacfb8cdfb2b24))
* **nav:** correct `.nav-accordion` styling ([c1ee4b7](https://github.com/ngaox/ngaox/commit/c1ee4b7b4b50347502fb6110b57c045cf7daf0ae))
* **padup:** low contrasts & unecissery spacing ([affc0aa](https://github.com/ngaox/ngaox/commit/affc0aaaeb5ac560ddea390078dc5f243bd8f952))
* remove unexsisting files import statements ([f0a6f33](https://github.com/ngaox/ngaox/commit/f0a6f337bba142484758cf406239cd4d3077ea53))
* schematics source file type ([231004d](https://github.com/ngaox/ngaox/commit/231004d3fdd19533f3241490740da4dabf5375bc))
* scripts slashes ([6747e23](https://github.com/ngaox/ngaox/commit/6747e23d8b8dba16f1986378264899ea048fd314))
* **seo:** :bug: `SeoService` NG0201 error when SeoModule is not imported ([d9c3be3](https://github.com/ngaox/ngaox/commit/d9c3be391f087376ed19f738d9770e1b901b5c85))
* services providation scop ([f04ec0d](https://github.com/ngaox/ngaox/commit/f04ec0dd2d538d983cd42854537a73f77c46720b))
* type errors ([aae28b0](https://github.com/ngaox/ngaox/commit/aae28b0863689f8b849beee996e331cd3bfd3999))
* update release-please bootstrap-sha ([51dbf6e](https://github.com/ngaox/ngaox/commit/51dbf6e7e913d95c7d5e77669b026bf8ad633947))
* update release-please bootstrap-sha ([b5429f8](https://github.com/ngaox/ngaox/commit/b5429f8c45c4060dfa6d1d4766a3d0b470f50e17))


### Features

* :sparkles: setup scully ([42da76e](https://github.com/ngaox/ngaox/commit/42da76efe3cba6d35a2762db8e71ce399926f614))
* add `AuthService` to facilate auth related api calls ([f10a16f](https://github.com/ngaox/ngaox/commit/f10a16f07e54c01ddd09b522a8487dd0c7f2b03f))
* add base typography stylings ([b903402](https://github.com/ngaox/ngaox/commit/b9034020898886deab704a4cee1494495f52fb50))
* **base:** provide default styling for all HTML elements ([f669c69](https://github.com/ngaox/ngaox/commit/f669c696df1340a062357d14e5bd3d123b05c0b0)), closes [#12](https://github.com/ngaox/ngaox/issues/12)
* **base:** provide default styling for all HTML elements ([246ddd0](https://github.com/ngaox/ngaox/commit/246ddd067b57b42e28498ecb0029e2675ef8e792)), closes [#12](https://github.com/ngaox/ngaox/issues/12)
* **cp:** provide `getApiBase` function in api service ([25a2b51](https://github.com/ngaox/ngaox/commit/25a2b513ac221bb1ecdba6060e179b93a44701d1))
* **cp:** provide chaospad-api service ([3bc8583](https://github.com/ngaox/ngaox/commit/3bc8583b22678fe4b7473c9ecb1a148c05eaaa5b)), closes [#22](https://github.com/ngaox/ngaox/issues/22)
* **cp:** set chaospad dev api as `ApiService` default endpoint ([5c14064](https://github.com/ngaox/ngaox/commit/5c14064e2f4ab26184b74aaa03ee670930c9aa31))
* imporove docs app styling & add md syntax highlight with prismjs ([e7d019f](https://github.com/ngaox/ngaox/commit/e7d019fb57432e830348f3ec69aaa527a0b7523e))
* **padup:** add `button`, `overlay`, `nav`, `container` components ([b09fd7d](https://github.com/ngaox/ngaox/commit/b09fd7d4b0c5f87ce0b748e1ea15dd0988b5719f))
* **padup:** add accordion nav modifier ([4777eb1](https://github.com/ngaox/ngaox/commit/4777eb18d17ff6e79d083473a5a83147fb165046))
* **padup:** add button component & its modifiers ([e230160](https://github.com/ngaox/ngaox/commit/e2301601bd53eef5b7974599f1463a327ab6e35d))
* **padup:** defaults reset & scrollbar stylling ([2bfbaf4](https://github.com/ngaox/ngaox/commit/2bfbaf482cd18576c9f49f9b3ee232fe93945d10))
* **padup:** styling root & ::section ([b01f67f](https://github.com/ngaox/ngaox/commit/b01f67fb09215615aed8d6d03794f4af8fff25c2))
* **table:** add table component base styling ([8d73dc3](https://github.com/ngaox/ngaox/commit/8d73dc365fe4990706f7bf0951a49dc8f12b935d))
* update docs sidebar ([1dfbe76](https://github.com/ngaox/ngaox/commit/1dfbe767a2fff844a3e78ee00e4779253c97bd74))
* use grid layout for docs app & init navbar ([6c48244](https://github.com/ngaox/ngaox/commit/6c48244472ebb4a870ffab8f049dd882d038b512))



