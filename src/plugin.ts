/**
 * @Author: longmo
 * @Date: 2025-02-22 11:43:19
 * @LastEditTime: 2025-02-22 12:02:31
 * @FilePath: src/plugin.ts
 * @Description:
 */
/**
 * 插件，用于修改 Vue 的一些行为
 */
import { isVue2, type Vue2 } from 'vue-demi';
import {
  camelCase,
  kebabCase,
  hasProp,
  addHiddenProp,
  PACKAGE_NAME,
} from './utils';
import { getEventNameFindCache } from './declareComponent/process';

const INSTALLED = Symbol('h-plugin-installed');

export const plugin = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  install(Vue: Object) {
    if (hasProp(Vue, INSTALLED)) {
      if (process.env.NODE_ENV !== 'production') {
        console.warn(`${PACKAGE_NAME('h')} 已经 use 过, 不要重复安装`);
      }

      return;
    }

    addHiddenProp(Vue, INSTALLED, true);

    // 支持camelCase/kebab-case 多种方式调用
    if (isVue2) {
      const ctor = Vue as typeof Vue2;
      const _$emit = ctor?.prototype.$emit;

      if (!ctor) {
        return;
      }
      ctor.prototype.$emit = function (event: string, ...args: any[]) {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const vm = this;

        // 缓存查找的结果
        const cache = getEventNameFindCache(vm);

        if (event in cache) {
          return _$emit.call(vm, cache[event], ...args);
        }

        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        const find = (name: string) => {
          if (name in vm._events) {
            return name;
          }

          return undefined;
        };

        const rc =
          find(event) ??
          find(
            event
              .split(':')
              .map(i => camelCase(i))
              .join(':')
          ) ??
          find(
            event
              .split(':')
              .map(i => kebabCase(i))
              .join(':')
          );

        if (rc != null) {
          cache[event] = rc;
          return _$emit.call(vm, rc, ...args);
        }

        return _$emit.apply(vm, arguments);
      };
    }
  },
};
