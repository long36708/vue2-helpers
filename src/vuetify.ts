import { getCurrentInstance, Vue2 } from 'vue-demi';
import Vuetify from 'vuetify/lib';
import type { Framework, UserVuetifyPreset } from 'vuetify';

import { OUT_OF_SCOPE, warn } from './utils';

/** Create Vuetify Instance */
export function createVuetify(options?: UserVuetifyPreset): Vuetify {
  Vue2?.use(Vuetify);
  return new Vuetify(options);
}

/** Vuetify Instance */
export function useVuetify(): Framework {
  /** Vue instance */
  const instance = getCurrentInstance();
  if (instance && instance.proxy.$vuetify) {
    return instance.proxy.$vuetify;
  } else {
    warn(`[vue2-helpers/vuetify] ${OUT_OF_SCOPE}`);
  }
  return undefined as any;
}
