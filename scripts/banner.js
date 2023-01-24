import { readFileSync } from 'node:fs';
import { fileURLToPath, URL } from 'node:url';

const pkg = JSON.parse(
  readFileSync(
    fileURLToPath(new URL('../package.json', import.meta.url)),
    'utf-8'
  )
);

export default `/**
 * ${pkg.name}
 *
 * @description ${pkg.description}
 * @version ${pkg.version}
 * @license ${pkg.license}
 * @see {@link ${pkg.homepage}}
 *
 * Build: ${new Date().toISOString()}
 */`;
