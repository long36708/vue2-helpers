import { unlink } from 'node:fs';

removeFile('index');
removeFile('vue-router');
removeFile('vuetify');
removeFile('vuex');
removeFile('utils', ['d.ts', 'd.ts.map']);
removeFile('teleport');
removeFile('h-demi');

/**
 * Remove File
 * @param {string} file - File
 * @param {string[]} exts - Extensions
 */
function removeFile(
  file,
  exts = ['es.js', 'umd.js', 'd.ts', 'es.js.map', 'umd.js.map', 'd.ts.map']
) {
  exts.forEach(ext => {
    unlink(`${file}.${ext}`, err => {
      if (err) throw err;
      console.log(`Remove: ${file}.${ext}`);
    });
  });
}
