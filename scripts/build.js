/* eslint-disable */
const { rollup } = require('rollup');
const typescript = require('@rollup/plugin-typescript');
const { terser } = require('rollup-plugin-terser');
const banner = require('./banner.js');
const fs = require('fs');

compile('src/index.ts');
compile('src/vuex.ts');
compile('src/vue-router.ts');
compile('src/vuetify.ts');

/**
 * Compile
 *
 * @param file - target
 */
async function compile(file) {
  const bundle = await rollup({
    input: file,
    external: ['vue', 'vuex', 'vue-router', 'vuetify'],
    plugins: [typescript(), terser()],
  });
  await bundle.write({
    dir: 'dist',
    banner,
    format: 'esm',
    sourcemap: true,
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
