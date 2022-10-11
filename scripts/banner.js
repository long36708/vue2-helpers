/* eslint-disable */
const pkg = require('../package.json');

module.exports = `/**
 * ${pkg.name}
 *
 * @description ${pkg.description}
 * @version ${pkg.version}
 * @license ${pkg.license}
 * @see {@link ${pkg.homepage}}
 *
 * Build: ${new Date().toISOString()}
 */`;
