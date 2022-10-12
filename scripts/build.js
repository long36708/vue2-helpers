/* eslint-disable no-undef */
const { rollup } = require('rollup');
const { terser } = require('rollup-plugin-terser');
const banner = require('./banner.js');
const path = require('path');
const typescript = require('@rollup/plugin-typescript');
const vuetify = require('rollup-plugin-vuetify');

console.log('Build:');
compile('src/index.ts');
compile('src/vue-router.ts');
compile('src/vuetify.ts');
compile('src/vuex.ts');
compile('src/teleport.ts');
console.log('done.');

/**
 * Compile
 *
 * @param file - target
 */
async function compile(file) {
  console.log(`compile: ${file}`);
  const name = path.parse(file).name;
  const bundle = await rollup({
    input: file,
    external: ['vue', 'vuex', 'vue-router', 'vue-demi', 'vuetify/lib'],
    plugins: [typescript(), vuetify()],
  });
  const globals = {
    vue: 'Vue',
    vuex: 'Vuex',
    'vue-router': 'VueRouter',
    'vue-demi': 'VueDemi',
    'vuetify/lib': 'vuetify',
  };
  await bundle.write({
    output: {
      banner,
      file: `${name}.es.js`,
      format: 'esm',
      sourcemap: true,
      globals: globals,
    },
  });
  await bundle.write({
    output: {
      banner,
      name: name,
      file: `${name}.umd.js`,
      format: 'umd',
      sourcemap: true,
      exports: 'named',
      globals: globals,
    },
    plugins: [terser()],
  });
}
