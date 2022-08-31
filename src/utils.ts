export const { warn } = console;

export const OUT_OF_SCOPE =
  'getCurrentInstance() returned null. Method must be called at the top of a setup() function.';

export const DEPRECATED_ROUTER = (name: string) =>
  `${name}() is deprecated. use "import { ${name} } from 'vue-router/composable';"`;
