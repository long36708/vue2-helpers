/* eslint-disable no-undef */
const { rollup } = require('rollup');
const typescript = require('@rollup/plugin-typescript');
const { terser } = require('rollup-plugin-terser');
const banner = require('./banner.js');
const path = require('path');

compile('src/index.ts');
compile('src/vue-router.ts');
compile('src/vuetify.ts');
compile('src/vuex.ts');

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
    external: ['vue', 'vuex', 'vue-router', 'vuetify'],
    plugins: [typescript()],
  });
  await bundle.write({
    output: {
      banner,
      file: `${name}.es.js`,
      format: 'esm',
      sourcemap: true,
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
      globals: {
        vue: 'Vue',
        vuex: 'Vuex',
        'vue-router': 'VueRouter',
        vuetify: 'Vuetify',
      },
      plugins: [terser()],
    },
  });
}
