import pkg from '../package.json';

export default `
/**
 * ${pkg.name}@${pkg.version}
 * ${pkg.description}
 * @author ${pkg.author.name} <${pkg.author.email}>
 * @license ${pkg.license}
 * @see {@link ${pkg.homepage}}
 */`;
