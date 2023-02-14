/* eslint-disable tsdoc/syntax */
import { parse } from 'path';
import { rollup } from 'rollup';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';

import banner from './banner.js';

console.log('Build:');
compile('src/index.ts');
compile('src/teleport.ts');
compile('src/vue-router.ts');
compile('src/vuetify.ts');
compile('src/vuex.ts');
console.log('done.');

/**
 * Compile
 *
 * @param {string} file - target
 */
async function compile(file) {
  console.log(`compile: ${file}`);
  const name = parse(file).name;
  const bundle = await rollup({
    input: file,
    external: ['vue', 'vuex', 'vue-router', 'vue-demi', 'vuetify/lib'],
    plugins: [typescript()],
  });
  const globals = {
    vue: 'Vue',
    vuex: 'Vuex',
    'vue-router': 'VueRouter',
    'vue-demi': 'VueDemi',
    'vuetify/lib': 'vuetify',
  };
  await bundle.write({
    banner,
    file: `${name}.es.js`,
    format: 'esm',
    sourcemap: true,
    globals: globals,
  });
  await bundle.write({
    banner,
    name: name,
    file: `${name}.umd.js`,
    format: 'umd',
    sourcemap: true,
    exports: 'named',
    globals: globals,
    plugins: [terser()],
  });
}
