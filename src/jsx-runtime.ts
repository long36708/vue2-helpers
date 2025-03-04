import { h, Fragment } from './h';
import { type VNode } from 'vue-demi';

/**
 * 支持 自动 JSX, used by Babel's {runtime:"automatic"} JSX transform
 * @param type
 * @param props
 * @param key
 * @param __self
 * @param __source
 */
export function jsx(
  type: any,
  props: Record<string, any>,
  key?: string | number | symbol,
  // eslint-disable-next-line @typescript-eslint/naming-convention
  __self?: string,
  // eslint-disable-next-line @typescript-eslint/naming-convention
  __source?: string
): VNode {
  const { children, ...finalProps } = props;

  if (key != null) {
    Object.assign(finalProps, {
      key,
    });
  }

  if (Array.isArray(children) && children.length) {
    if (children.length) {
      return h(type, finalProps, children);
    } else {
      return h(type, finalProps);
    }
  }

  if (children != null) {
    return h(type, finalProps, children);
  }

  return h(type, finalProps);
}

export const jsxs = jsx;
export const jsxDEV = jsx;
export { Fragment };
