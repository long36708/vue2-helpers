# Vue2 Helpers

[![jsdelivr CDN](https://data.jsdelivr.com/v1/package/npm/@logue/vue2-helpers/badge)](https://www.jsdelivr.com/package/npm/@logue/vue2-helpers)
[![NPM Downloads](https://img.shields.io/npm/dm/@logue/vue2-helpers.svg?style=flat)](https://www.npmjs.com/package/@logue/vue2-helpers)
[![Open in unpkg](https://img.shields.io/badge/Open%20in-unpkg-blue)](https://uiwjs.github.io/npm-unpkg/#/pkg/@logue/vue2-helpers/file/README.md)
[![npm version](https://img.shields.io/npm/v/@logue/vue2-helpers.svg)](https://www.npmjs.com/package/@logue/vue2-helpers)
[![Open in Gitpod](https://shields.io/badge/Open%20in-Gitpod-green?logo=Gitpod)](https://gitpod.io/#https://github.com/logue/@logue/vue2-helpers)
[![Twitter Follow](https://img.shields.io/twitter/follow/logue256?style=plastic)](https://twitter.com/logue256)

A util package to use Vue 2 with Composition API easily.
This fork supports [Vuetify2](https://vuetifyjs.com/).

[@vue/composition-api](https://github.com/vuejs/composition-api) is required separately when using under Vue 2.7.

## ⬇️ Install

```sh
npm i -S @logue/vue2-helpers
```

or

```sh
yarn add -D @logue/vue2-helpers
```

## 📃 Usage

```javascript
import { createVuexHelpers } from '@logue/vue2-helpers';
import { useRouter } from 'vue-router/composable';

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

| Features                                                                                                                                  | Description                                                                                                   |
| ----------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `createVuexHelpers`&lt;RootState, RootGetters, RootMutations, RootActions&gt;(): {`useState`, `useGetters`, `useMutations`, `useActions`} | The helper methods in return value are used to replace `mapState`, `mapGetters`, `mapMutations`, `mapActions` |

### vue2-helpers/vuex

| Features                                                               | Description              |
| ---------------------------------------------------------------------- | ------------------------ |
| `createStore`&lt;S&gt;(options: StoreOptions&lt;S&gt;): Store&lt;S&gt; |                          |
| `useStore`&lt;S = any&gt;(): Store&lt;S&gt;                            | Get Vuex store instance. |

### vue2-helpers/vue-router

| Features                                                      | Description         |
| ------------------------------------------------------------- | ------------------- |
| `createRouter`(options: RouterOptions): Router                |                     |
| ~~`onBeforeRouteLeave`(leaveGuard: NavigationGuard): void~~   |                     |
| ~~`onBeforeRouteUpdate`(updateGuard: NavigationGuard): void~~ |                     |
| ~~`useRoute`(): RouteLocationNormalized~~                     | Get Route instance  |
| ~~`useRouter`(): Router~~                                     | Get Router instance |
| router.`isReady`(): Promise\<void\>                           |                     |

### vue2-helpers/vuetify

| Features                                             | Description             |
| ---------------------------------------------------- | ----------------------- |
| `createVuetify`(options: UserVuetifyPreset): Vuetify | Create Vuetify Instance |
| `useVuetify`(): Framework                            | Get Vuetify Instance.   |

## vue-helpers/teleport

This is an alternative to [vue3's teleport](https://v3.vuejs.org/guide/teleport.html) component. You can use the documentation provided by vue as a starting point to using this package.

```vue
<template>
  <div>
    <button @click="modalOpen = true">
      Open full screen modal! (With teleport!)
    </button>

    <teleport to="body">
      <div v-if="modalOpen" class="modal">
        <div>
          I'm a teleported modal! (My parent is "body")
          <button @click="modalOpen = false">Close</button>
        </div>
      </div>
    </teleport>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import Teleport from '@logue/vue2-helpers/teleport';

export default defineComponent({
  components: {
    Teleport,
  },
  setup() {
    return {
      modalOpen: ref(false),
    };
  },
});
</script>
```

| Props    | Description                                          |
| -------- | ---------------------------------------------------- |
| to       | Target DOM (querySelector)                           |
| where    | Insert innerHTML to target DOM, `after` or `before`. |
| disabled | boolean                                              |

This component is rewritten to composition api of Mechazawa's [vue2-teleport](https://github.com/Mechazawa/vue2-teleport).

## License

[Apache License Version 2.0](LICENSE)

Original version By [ambit_tsai](https://github.com/ambit-tsai).

Modified and add some feature by [Logue](https://github.com/logue).
