import { version } from 'vue-demi';

export function upperFirst(str: string): string {
  if (str.length === 0) {
    return str; // 如果字符串为空，直接返回
  }
  const firstChar = str.charAt(0).toUpperCase();
  return firstChar + str.slice(1); // 拼接首字符的大写形式与剩余字符串
}

export function kebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2') // 将大写字母前加上连字符
    .replace(/\s+/g, '-') // 将一个或多个空格替换为连字符
    .toLowerCase(); // 转换为全小写
}

export function lowerFirst(str: string): string {
  if (str.length === 0) {
    return str; // 如果字符串为空，直接返回
  }
  const firstChar = str.charAt(0).toLowerCase();
  return firstChar + str.slice(1); // 拼接首字符的小写形式与剩余字符串
}

export function camelCase(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+(.)/g, (match, group1) => group1.toUpperCase());
}

export const { warn } = console;

export const OUT_OF_SCOPE =
  'getCurrentInstance() returned null. Method must be called at the top of a setup() function.';

export const DEPRECATED_ROUTER = (name: string): string =>
  `${name}() is deprecated. use "import { ${name} } from 'vue-router/composables';"`;

/**
 * 添加 包名标识
 * @param name
 * @constructor
 */
export const PACKAGE_NAME = (name: string): string => {
  return `[vue2-helpers/${name}]`;
};

const objectPrototype = Object.prototype;
const plainObjectString = Object.toString();
const hasGetOwnPropertySymbols =
  typeof Object.getOwnPropertySymbols !== 'undefined';
const CAMELIZE_REGEXP = /(-|_|\.|\s)+(.)?/g;

export const isVue2Dot7 = version.startsWith('2.7.');

export const isBrowser = typeof window !== 'undefined';

export function isObject<T = object>(obj: any): obj is T {
  return obj != null && typeof obj === 'object';
}

/**
 * 查看属性是否定义
 * @param target
 * @param key
 * @returns
 */
export function hasProp(target: Object, key: PropertyKey): boolean {
  return objectPrototype.hasOwnProperty.call(target, key);
}

/**
 * 添加不能枚举的字段
 * @param target
 * @param key
 */
export function addHiddenProp(
  target: Object,
  key: PropertyKey,
  value: any
): void {
  Object.defineProperty(target, key, {
    enumerable: false,
    configurable: true,
    writable: true,
    value,
  });
}

export function isPlainObject(value: any): Boolean {
  if (!isObject(value)) {
    return false;
  }
  const proto = Object.getPrototypeOf(value);
  if (proto == null) {
    return true;
  }
  const protoConstructor =
    Object.hasOwnProperty.call(proto, 'constructor') && proto.constructor;
  return (
    typeof protoConstructor === 'function' &&
    protoConstructor.toString() === plainObjectString
  );
}

export const ownKeys: (target: any) => PropertyKey[] = Reflect?.ownKeys
  ? Reflect.ownKeys
  : hasGetOwnPropertySymbols
    ? obj =>
        Object.getOwnPropertyNames(obj).concat(
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          Object.getOwnPropertySymbols(obj) as any
        )
    : /* istanbul ignore next */ Object.getOwnPropertyNames;

export function isCamelCase(str: string): boolean {
  return typeof str === 'string' && !str.includes('-');
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const identity = <T = any>(i: T) => i;

/**
 * 转换成小写驼峰格式
 *
 * @example
 * ```javascript
 * camelize('innerHTML');          // 'innerHTML'
 * camelize('action_name');        // 'actionName'
 * camelize('css-class-name');     // 'cssClassName'
 * camelize('update:modalValue');  // 'update:modalValue'
 * camelize('update:modal-value');  // 'update:modalValue'
 * camelize('Q w Q');  // 'QWQ'
 * ```
 * @param str
 */
export function camelize(str: string): string {
  return str
    .replace(CAMELIZE_REGEXP, (_: string, sep: string, chr: string) => {
      return chr ? chr.toUpperCase() : '';
    })
    .replace(/^([A-Z])/, (chr: string) => chr.toLowerCase());
}
