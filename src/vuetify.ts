import { getCurrentInstance } from 'vue-demi';
import type { Framework } from 'vuetify';
import { OUT_OF_SCOPE, warn } from './utils';

/** Vuetify Instance */
export function useVuetify(): Framework {
  /** Vue instance */
  const instance = getCurrentInstance();
  if (instance) {
    // @ts-ignore
    return instance.proxy.$vuetify;
  } else {
    warn(`[vue2-helpers/vuetify] ${OUT_OF_SCOPE}`);
  }
  return undefined as any;
}
