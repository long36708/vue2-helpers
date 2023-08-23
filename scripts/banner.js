import { readFileSync } from 'node:fs';
import { fileURLToPath, URL } from 'node:url';

const pkg = JSON.parse(
  readFileSync(
    fileURLToPath(new URL('../package.json', import.meta.url)),
    'utf-8'
  )
);

/** @return {string} */
export default (isExperimental = false) => {
  let ret = `/**
 * ${pkg.name}
 *
 * @description ${pkg.description}
 * @version ${pkg.version}
 * @license ${pkg.license}
 * @see {@link ${pkg.homepage}}`;
  if (isExperimental) {
    ret += '\n * @experimental\n';
  }
  ret += ` *
 * Build: ${new Date().toISOString()}
 */`;
  return ret;
};
