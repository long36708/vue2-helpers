/* eslint-disable */
const { rollup } = require('rollup');
const typescript = require('@rollup/plugin-typescript');
const { terser } = require('rollup-plugin-terser');
const banner = require('./banner.js');
const fs = require('fs');
const path = require('path');

compile('src/index.ts');
compile('src/vuex.ts');
compile('src/vue-router.ts');
compile('src/vuetify.ts');
// copyFile('package.json');
// copyFile('README.md');
// copyFile('LICENSE');

/**
 * Compile
 *
 * @param file - target
 */
async function compile(file) {
  const name = path.parse(file).name;
  const bundle = await rollup({
    input: file,
    external: ['vue', 'vuex', 'vue-router', 'vuetify'],
    plugins: [typescript()],
  });
  await bundle.write({
    output: {
      banner,
      file: `dist/${name}.es.js`,
      format: 'esm',
      sourcemap: true,
    },
  });
  await bundle.write({
    output: {
      banner,
      name: name,
      file: `dist/${name}.umd.js`,
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

/**
 * File Copy
 *
 * @param file - File name
 */
function copyFile(file) {
  fs.copyFile(file, `dist/${file}`, err => {
    if (err) console.log(err);
  });
}
