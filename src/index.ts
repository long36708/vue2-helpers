import { OUT_OF_SCOPE } from './utils';
import type Vue from 'vue';
import { getCurrentInstance } from 'vue-demi';

/**
 * Get Vue Instance
 */
export function getVueInstance(): Vue {
  const vm = getCurrentInstance();
  if (vm != null) {
    return vm.proxy;
  }
  throw new Error(OUT_OF_SCOPE);
}
