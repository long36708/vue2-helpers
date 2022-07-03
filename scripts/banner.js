/* eslint-disable */
const pkg = require('../package.json');

module.exports = `/**
 * ${pkg.name}
 *
 * @description ${pkg.description}
 * @version ${pkg.version}
 * @author ${pkg.author.name} <${pkg.author.email}>
 * @license ${pkg.license}
 * @see {@link ${pkg.homepage}}
 */`;
