import Vuex, { Store, StoreOptions } from 'vuex';
import Vue, { getCurrentInstance } from 'vue';
import { OUT_OF_SCOPE, warn } from './utils';

/** Create Vuex Store */
export function createStore<S>(options: StoreOptions<S>) {
  Vue.use(Vuex);
  return new Store<S>(options);
}

/** Use Vuex Instance */
export function useStore<S = any>(): Store<S> {
  const inst = getCurrentInstance();
  if (inst) {
    return inst.proxy.$store;
  } else {
    warn('[vuex] ' + OUT_OF_SCOPE);
  }
  return undefined as any;
}
