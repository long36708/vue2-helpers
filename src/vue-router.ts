import Vue from 'vue'
import { computed, ComputedRef, getCurrentInstance, reactive, shallowRef } from '@vue/composition-api'
import VueRouter, { NavigationGuard, Route, RouterOptions, RouteConfig } from 'vue-router'
import { OUT_OF_SCOPE, warn } from './utils'


export type RouteRecordRaw = RouteConfig

export interface Router extends VueRouter {
    isReady: () => Promise<void>

    /** @deprecated */
    app: VueRouter['app']

    /** @deprecated */
    getMatchedComponents: VueRouter['getMatchedComponents']

    /** @deprecated use `isReady` instead */
    onReady: VueRouter['onReady']
}


// @ts-ignore
VueRouter.prototype.isReady = function () {
    return new Promise((resolve, reject) => {
        this.onReady(resolve, reject)
    })
}


export function createRouter(options: RouterOptions) {
    Vue.use(VueRouter)
    return new VueRouter(options) as Router
}


export function useRouter(): Router {
    const inst = getCurrentInstance()
    if (inst) {
        return inst.proxy.$router as Router
    }
    warn(OUT_OF_SCOPE)
    return undefined as any
}


export interface RouteLocationNormalized extends Route {}
export interface RouteLocationNormalizedLoaded extends Route {}


function createReactiveRoute(initialRoute: Route) {
    const routeRef = shallowRef(initialRoute);
    const computedRoute = {} as {
        [key in keyof Route]: ComputedRef<Route[key]>
    }
    for (const key of [
        'name', 'meta', 'path', 'hash', 'query',
        'params', 'fullPath', 'matched', 'redirectedFrom'
    ] as const) {
        computedRoute[key] = computed<any>(() => routeRef.value[key]);
    }
    return [
        reactive(computedRoute),
        (route: Route) => {
            routeRef.value = route
        },
    ] as const
}

let reactiveCurrentRoute: Route

export function useRoute(): RouteLocationNormalizedLoaded {
    const router = useRouter()
    if (!router) return undefined as any
    if (!reactiveCurrentRoute) {
        let setCurrentRoute: (route: Route) => void
        [reactiveCurrentRoute, setCurrentRoute] = createReactiveRoute(router.currentRoute)
        router.afterEach(to => setCurrentRoute(to))
    }
    return reactiveCurrentRoute
}


export function onBeforeRouteLeave(leaveGuard: NavigationGuard) {
    const inst = getCurrentInstance()
    if (!inst) {
        warn(OUT_OF_SCOPE)
        return
    }
    const { options } = inst.proxy.constructor as any
    const hooks: any = options.beforeRouteLeave || []
    hooks.push(leaveGuard)
    options.beforeRouteLeave = hooks
}

export function onBeforeRouteUpdate(updateGuard: NavigationGuard) {
    const inst = getCurrentInstance()
    if (!inst) {
        warn(OUT_OF_SCOPE)
        return
    }
    const { options } = inst.proxy.constructor as any
    const hooks: any = options.beforeRouteUpdate || []
    hooks.push(updateGuard)
    options.beforeRouteUpdate = hooks
}
