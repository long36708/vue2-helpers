import { getCurrentInstance, isRef } from 'vue-demi';

import {
  kebabCase,
  hasProp,
  identity,
  isCamelCase,
  addHiddenProp,
  upperFirst,
} from '../utils';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function vue2AsVmProperty(vm: any, key: string, getter: () => any) {
  const props = vm.$options.props;
  // 属性不能冲突
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  if (!(key in vm) && !(props && hasProp(props, key))) {
    Object.defineProperty(vm, key, {
      configurable: true,
      enumerable: true,
      get: getter,
    });
  } else if (process.env.NODE_ENV !== 'production') {
    if (key in vm) {
      throw new Error(`${key} 已经在 vm 中存在`);
    } else {
      throw new Error(`${key} 已经在 props 中定义`);
    }
  }
}

/**
 * vue2 下支持 expose
 */
export function vue2Expose(exposed: Record<string, any>): void {
  if (
    process.env.NODE_ENV !== 'production' &&
    exposed != null &&
    typeof exposed !== 'object'
  ) {
    throw new Error('expose 必须为对象形式');
  }

  if (exposed == null) {
    return;
  }

  const instance = getCurrentInstance();

  if (process.env.NODE_ENV !== 'production' && instance == null) {
    throw new Error('expose() 只能在 setup 中调用');
  }

  if (instance == null) {
    return;
  }

  const vm = instance.proxy as any;

  if (process.env.NODE_ENV !== 'production' && vm.exposed) {
    throw new Error('expose() 只能调用一次');
  }

  vm.exposed = exposed;

  // 代理到 vm 上
  for (const key in exposed) {
    vue2AsVmProperty(vm, key, () => {
      const value = exposed[key];
      // Ref 需要展开
      if (isRef(value)) {
        return value.value;
      }
      return value;
    });
  }
}

const EVENT_NAME_FIND_CACHE = Symbol('event-name-cache');
const EVENT_CACHE_MAP = new WeakMap<any, Record<string, any | null>>();

export function getEventNameFindCache(
  target: any
): Record<string, string | null> {
  if (!Object.isExtensible(target)) {
    // 不支持扩展，使用 WeakMap 缓存
    let cache: Record<string, string> | undefined = EVENT_CACHE_MAP.get(target);
    if (cache != null) {
      return cache;
    }
    cache = {};
    EVENT_CACHE_MAP.set(target, cache);

    return cache;
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  if (hasProp(target, EVENT_NAME_FIND_CACHE)) {
    return target[EVENT_NAME_FIND_CACHE];
  }

  const cache: Record<string, string> = {};
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  addHiddenProp(target, EVENT_NAME_FIND_CACHE, cache);
  return cache;
}

export function vue3EventNameCapitalized(name: string): string {
  return `on${upperFirst(name)}`;
}

/**
 * 期望传入一个 camelCase 的事件名称，在 attrs 中查找符合的事件处理器
 *
 * vue 传入事件处理器的名称可能千奇百怪，比如
 *
 * click
 * clickMe
 * click-me
 * update:modelValue
 * update:model-value
 * update:modelvalue
 *
 * @param name 驼峰式的事件名
 * @param target 事件处理器集合
 * @param postprocess 对名称进行处理，比如加上 on 前缀
 *
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function findEventHandler(
  name: string,
  target: Record<string, any>,
  postprocess: (name: string) => string = identity
) {
  if (process.env.NODE_ENV !== 'production' && !isCamelCase(name)) {
    throw new Error(`emit(${name}) 统一使用驼峰式命名`);
  }

  // 查找缓存
  const cache = getEventNameFindCache(target);
  if (name in cache) {
    return cache[name];
  }

  const test = (candidate: string): any => {
    const normalized = postprocess(candidate);
    return normalized in target ? normalized : null;
  };

  const found =
    test(name) ??
    test(name.toLowerCase()) ??
    test(
      name
        .split(':')
        .map(i => kebabCase(i))
        .join(':')
    );

  cache[name] = found;

  return found;
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function safeCallHandler(
  handler: Function | Function[] | undefined,
  context: any,
  args: any[]
) {
  if (typeof handler === 'function') {
    return handler.apply(context, args);
  } else if (Array.isArray(handler) && handler.length) {
    return handler.map(h => {
      if (typeof h === 'function') {
        return h.apply(context, args);
      }

      return undefined;
    })[handler.length - 1];
  }

  return undefined;
}
