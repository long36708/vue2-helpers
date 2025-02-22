# Vue2 Helpers

A util package to use Vue 2 with Composition API easily.
This fork supports [Vuetify2](https://vuetifyjs.com/).

[@vue/composition-api](https://github.com/vuejs/composition-api) is required separately when using under Vue 2.7.

Notice: Due to the implementation of patching `vuex` to support TypeScript5, it is necessary to include it in the package even if the project does not use `vuex`.

## ⬇️ Install

```sh
npm i -S @longmo/vue2-helpers
```

or

```sh
yarn add -D @longmo/vue2-helpers
```

## 📃 Usage

```javascript
import { createVuexHelpers } from '@longmo/vue2-helpers';
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

CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/vuex@3.6.2/dist/vuex.global.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/vue-demi@latest/lib/index.iife.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@longmo/vue2-helpers@latest/dist/index.iife.js"></script>
```

### vue2-helpers/vuex

| Features                                                               | Description              |
| ---------------------------------------------------------------------- | ------------------------ |
| `createStore`&lt;S&gt;(options: StoreOptions&lt;S&gt;): Store&lt;S&gt; |                          |
| `useStore`&lt;S = any&gt;(): Store&lt;S&gt;                            | Get Vuex store instance. |

CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/vuex@3.6.2/dist/vuex.global.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/vue-demi@latest/lib/index.iife.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@longmo/vue2-helpers@latest/dist/vuex.iife.js"></script>
```

### vue2-helpers/vue-router

The dashed lines are left for compatibility, but since equivalent commands are supported on the [vue-router](https://github.com/vuejs/vue-router/blob/dev/CHANGELOG.md#360-2022-08-22) side, they are flagged as `deprecated`.
Please use them from now on.

| Features                                                      | Description         |
| ------------------------------------------------------------- | ------------------- |
| `createRouter`(options: RouterOptions): Router                |                     |
| ~~`onBeforeRouteLeave`(leaveGuard: NavigationGuard): void~~   |                     |
| ~~`onBeforeRouteUpdate`(updateGuard: NavigationGuard): void~~ |                     |
| ~~`useRoute`(): RouteLocationNormalized~~                     | Get Route instance  |
| ~~`useRouter`(): Router~~                                     | Get Router instance |
| router.`isReady`(): Promise\<void\>                           |                     |

CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/vue-router@3.6.5/dist/vue-router.global.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/vue-demi@latest/lib/index.iife.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@longmo/vue2-helpers@latest/dist/vue-router.iife.js"></script>
```

### vue2-helpers/vuetify

| Features                                             | Description                                                   |
| ---------------------------------------------------- | ------------------------------------------------------------- |
| `createVuetify`(options: UserVuetifyPreset): Vuetify | Create Vuetify Instance                                       |
| `useVuetify`(): Framework                            | Get Vuetify Instance.                                         |
| `useTheme`(): Theme                                  | Get and set Theme variables.                                  |
| `useDisplay`(): Breakpoint                           | Get breakpoint, It's an API similar to Vuetify3's useDisplay. |

CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/vue-demi@latest/lib/index.iife.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@longmo/vue2-helpers@latest/dist/vuetify.iife.js"></script>
```

### vue-helpers/teleport

This is an alternative to [vue3's teleport](https://v3.vuejs.org/guide/teleport.html) component.
You can use the documentation provided by vue as a starting point to using this package.

It is mainly used for dynamic rewriting in the head tag and pouring Vue components into the DOM generated by external libraries other than Vue such as lightbox.
This injected Vue component also contains Vue events.

| Props    | Description                                                                       |
| -------- | --------------------------------------------------------------------------------- |
| to       | Target DOM (Specified by `querySelector`)                                         |
| where    | Insert innerHTML to target DOM. Accepts `after` or `before`. (Default is `after`) |
| disabled | boolean                                                                           |

CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/vue-demi@latest/lib/index.iife.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@longmo/vue2-helpers@latest/dist/teleport.iife.js"></script>
```

#### Teleport Example

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
import Teleport from '@longmo/vue2-helpers/teleport';

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

This component is rewritten to composition api of Mechazawa's [vue2-teleport](https://github.com/Mechazawa/vue2-teleport).

## vue-helpers/h-demi (experimental)

This program is for library components developers.
This is to resolve the incompatibility of the `h` function when creating a library that supports both Vue2 and Vue3.
It is unnecessary if you do not use the `h` function.

See the address below for details.
<https://github.com/vueuse/vue-demi/issues/65>

CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/vue-demi@latest/lib/index.iife.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@longmo/vue2-helpers@latest/dist/h-demi.iife.js"></script>
```

## License

[Apache License Version 2.0](LICENSE)

- Original version By [ambit_tsai](https://github.com/ambit-tsai).
- Modified and add some feature by [Logue](https://github.com/logue).
- Modified and add some feature by [longmo](https://github.com/long36708).


支持跨 Vue 2/3, 兼容 React JSX 协议的渲染方法

详见 [使用文档](https://wakeadmin.wakedata.com/)
