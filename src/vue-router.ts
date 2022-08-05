import { getCurrentInstance, reactive, Vue2 } from 'vue-demi';
import VueRouter, {
  type NavigationGuard,
  type Route,
  type RouterOptions,
} from 'vue-router';
import { OUT_OF_SCOPE, warn } from './utils';

export type {
  RouteMeta,
  RouterOptions,
  RouteRecord,
  RouteConfig as RouteRecordRaw,
  RedirectOption as RouteRecordRedirectOption,
  RawLocation as RouteLocationRaw,
} from 'vue-router';
export type RouteRecordName = string | symbol;
export type RouterScrollBehavior = RouterOptions['scrollBehavior'];
export type RouteLocationNormalized = Route;
export type RouteLocationNormalizedLoaded = Route;

export interface Router extends VueRouter {
  isReady: () => Promise<void>;
}

// @ts-ignore
VueRouter.prototype.isReady = function () {
  return new Promise((resolve, reject) => {
    this.onReady(resolve, reject);
  });
};

/** Create Vue Router */
export function createRouter(options?: RouterOptions) {
  Vue2?.use(VueRouter);
  return new VueRouter(options) as Router;
}

/** Get Router instance */
export function useRouter(): Router {
  const inst = getCurrentInstance();
  if (inst) {
    return inst.proxy.$router as Router;
  }
  warn(`[vue-router] ${OUT_OF_SCOPE}`);
  return undefined as any;
}

let currentRoute: RouteLocationNormalizedLoaded;

/** Get current route instance */
export function useRoute() {
  const router = useRouter();
  if (!currentRoute) {
    const inst = getCurrentInstance();
    if (!inst) {
      warn(`[vue-router] ${OUT_OF_SCOPE}`);
      return;
    }
    currentRoute = reactive({ ...inst.proxy.$route } as Route);
    router.afterEach(to => Object.assign(currentRoute, to));
  }
  return currentRoute;
}

/**
 * Attach leave current route event
 *
 * @param leaveGuard - Navigation Guard
 * @returns
 */
export function onBeforeRouteLeave(leaveGuard?: NavigationGuard) {
  const inst = getCurrentInstance();
  if (!inst) {
    warn(`[vue-router] ${OUT_OF_SCOPE}`);
    return;
  }
  const { options } = inst.proxy.constructor as any;
  const hooks: any = options.beforeRouteLeave || [];
  hooks.push(leaveGuard);
  options.beforeRouteLeave = hooks;
}

/**
 * Attach route before update event
 *
 * @param updateGuard - Navigation Guard
 * @returns
 */
export function onBeforeRouteUpdate(updateGuard?: NavigationGuard) {
  const inst = getCurrentInstance();
  if (!inst) {
    warn(`[vue-router] ${OUT_OF_SCOPE}`);
    return;
  }
  const { options } = inst.proxy.constructor as any;
  const hooks: any = options.beforeRouteUpdate || [];
  hooks.push(updateGuard);
  options.beforeRouteUpdate = hooks;
}
