# Vue2 Helpers

[![jsdelivr CDN](https://data.jsdelivr.com/v1/package/npm/@logue/vue2-helpers/badge)](https://www.jsdelivr.com/package/npm/@logue/vue2-helpers)
[![NPM Downloads](https://img.shields.io/npm/dm/@logue/vue2-helpers.svg?style=flat)](https://www.npmjs.com/package/@logue/vue2-helpers)
[![Open in unpkg](https://img.shields.io/badge/Open%20in-unpkg-blue)](https://uiwjs.github.io/npm-unpkg/#/pkg/@logue/vue2-helpers/file/README.md)
[![npm version](https://img.shields.io/npm/v/@logue/vue2-helpers.svg)](https://www.npmjs.com/package/@logue/vue2-helpers)
[![Open in Gitpod](https://shields.io/badge/Open%20in-Gitpod-green?logo=Gitpod)](https://gitpod.io/#https://github.com/logue/@logue/vue2-helpers)

A util package to use Vue 2 with Composition API easily.
This fork supports Vue 2.7.0 and Vuetify.

## ⬇️ Install

```
npm i -S vue2-helpers
```

## 📃 Usage

```javascript
import { createVuexHelpers } from 'vue2-helpers';
import { useRouter } from 'vue2-helpers/vue-router';

const { useState } = createVuexHelpers<
    RootState, RootGetters, RootMutations, RootActions
>();
// Get a reactive and mutable ref object "stateA"
const { stateA } = useState('module', ['stateA']);

const router = useRouter();
router.push('/login');
```

## ✨ API

### vue2-helpers

| Features                                                                                                                                                                                                  | Description                                                                                                         |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `createVuexHelpers`&lt;<br>&nbsp;&nbsp;&nbsp;&nbsp;RootState, RootGetters, RootMutations, RootActions<br>&gt;(): {<br>&nbsp;&nbsp;&nbsp;&nbsp;`useState`, `useGetters`, `useMutations`, `useActions`<br>} | The helper methods in return value are<br>used to replace `mapState`, `mapGetters`,<br>`mapMutations`, `mapActions` |

### vue2-helpers/vuex

| Features                                                               | Description |
| ---------------------------------------------------------------------- | ----------- |
| `createStore`&lt;S&gt;(options: StoreOptions&lt;S&gt;): Store&lt;S&gt; |             |
| `useStore`&lt;S = any&gt;(): Store&lt;S&gt;                            |

### vue2-helpers/vue-router

| Features                                                  | Description |
| --------------------------------------------------------- | ----------- |
| `createRouter`(options: RouterOptions): Router            |             |
| `onBeforeRouteLeave`(leaveGuard: NavigationGuard): void   |             |
| `onBeforeRouteUpdate`(updateGuard: NavigationGuard): void |             |
| `useRoute`(): RouteLocationNormalized                     |             |
| `useRouter`(): Router                                     |             |
| router.`isReady`(): Promise\<void\>                       |             |

### vue2-helpers/vuetify

| Features                                             | Description |
| ---------------------------------------------------- | ----------- |
| `createVuetify`(options: UserVuetifyPreset): Vuetify |             |
| `useVuetify`(): Framework                            |             |

## License

[MIT](LICENSE)

## ☎️ Contact

- WeChat: ambit_tsai
- QQ Group: 663286147
- E-mail: ambit_tsai@qq.com

Modified by Logue.
