/* eslint-disable no-undef */
const fs = require('fs');

removeFile('index');
removeFile('vue-router');
removeFile('vuetify');
removeFile('vuex');
removeFile('utils', ['d.ts', 'd.ts.map']);
removeFile('teleport');

/**
 * Remove File
 * @param file - File
 * @param exts - Extensions
 */
function removeFile(
  file,
  exts = ['es.js', 'umd.js', 'd.ts', 'es.js.map', 'umd.js.map', 'd.ts.map']
) {
  exts.forEach(ext => {
    fs.unlink(`${file}.${ext}`, err => {
      if (err) throw err;
      console.log(`Remove: ${file}.${ext}`);
    });
  });
}
