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
