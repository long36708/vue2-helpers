import { getCurrentInstance } from 'vue';
import type { Framework, UserVuetifyPreset } from 'vuetify';
import Vuetify from 'vuetify';
import Vue from 'vue';
import { OUT_OF_SCOPE, warn } from './utils';

/** Create Vuetify */
export function createVuetify(options: Partial<UserVuetifyPreset>): Vuetify {
  Vue.use(Vuetify);
  return new Vuetify(options);
}

/** Vuetify Instance */
export function useVuetify(): Framework {
  /** Vue instance */
  const instance = getCurrentInstance();
  if (instance) {
    // @ts-ignore
    return instance.proxy.$vuetify;
  } else {
    warn(`[vuetify] ${OUT_OF_SCOPE}`);
  }
  return undefined as any;
}
