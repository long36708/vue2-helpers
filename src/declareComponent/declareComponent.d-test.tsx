/** @jsxImportSource .. */
import { VNodeChild, ref, StyleValue, defineComponent } from 'vue-demi-longmo';
import {
  declareComponent,
  declareProps,
  declareExpose,
  declareSlots,
  declareEmits,
} from './declareComponent';
import { withDefaults } from './helper';
import SPA from './declareComponent.d-test.vue';
import { ComponentInstance, DefineComponentContext } from './types';

import { expectType } from '../__tests__/helper';

declare let t: any;

test('withDefaults', () => {
  const props: { foo: string; bar?: string } = { foo: '1' };
  const withDefaultValues1 = withDefaults(props, { bar: '1' });
  expectType<{ foo: string; bar: string }>(withDefaultValues1);

  // @ts-expect-error baz 未定义
  withDefaults(props, { baz: '1' });

  // @ts-expect-error 类型不兼容
  withDefaults(props, { bar: 1 });
});

test('测试 defineComponent 类型推断', () => {
  test('未定义任何声明', () => {
    const Test = declareComponent({
      setup(props, { slots, emit, expose }) {
        expectType<{}>(props);

        // 包含默认 slots
        expectType<{ default?: () => VNodeChild }>(slots);

        // 可以 emit 任何内容
        emit('event', t);

        // 未限制
        expose({ a: 1 });
      },
    });

    t = <Test></Test>;
  });

  test('props 定义', () => {
    declareProps<{ a: number; b: number; c: boolean; d: any }>({
      a: Number,
      c: Boolean,
      d: null,
    });
  });

  test('emit 定义', () => {
    const Test = declareComponent({
      // 统一使用驼峰式
      emits: declareEmits<{
        change: (a: number) => void;
        clickMe: () => void;
        'update:modelValue': (value: number) => void;
      }>(),
      setup(props, { emit, attrs }) {
        // @ts-expect-error
        emit('change', 'a');
      },
    });

    t = (
      <Test
        // 对 JSX 暴露 onChange 属性
        onChange={a => {
          expectType<number>(a);
        }}
        onUpdate:modelValue={a => {
          expectType<number>(a);
        }}
      ></Test>
    );
  });

  test('ref 定义', () => {
    const Test = declareComponent({
      expose: declareExpose<{ a: number; b?: () => void }>(),
      setup(props, { expose }) {
        const refNumber = ref(1);
        const refFunction = ref(() => {});

        // @ts-expect-error
        expose({ a: 'string' });
        expose({ a: 1 });
        expose({ a: 1, b: () => {} });

        // 支持 ref
        expose({ a: refNumber });
        expose({ a: 1, b: refFunction });
      },
    });

    const refTest = ref<{ a: string } | null>(null);
    const refTestCorrect = ref<{ a: number }>();

    // @ts-expect-error
    t = <Test ref={refTest} />;
    t = <Test ref={refTestCorrect} />;
  });

  test('slot 定义', () => {
    const Test = declareComponent({
      slots: declareSlots<{ default: never; named: string }>(),
      setup(props, { slots }) {
        expectType<{}>(props);
        expectType<{
          default?: () => VNodeChild;
          named?: (scope: string) => VNodeChild;
        }>(slots);
      },
    });

    // object 语法
    t = (
      <Test>
        {{
          default: () => {
            return '';
          },
          // @ts-expect-error
          named: scope => {
            expectType<string>(scope);
            return '';
          },
        }}
      </Test>
    );

    // v-slots 语法
    t = (
      <Test
        v-slots={{
          default: () => {
            return '';
          },
          named: scope => {
            expectType<string>(scope);
            return '';
          },
        }}
      />
    );

    // 不适用 slots
    t = <Test>hello world</Test>;

    // 混合使用
    t = (
      <Test
        v-slots={{
          named: scope => {
            expectType<string>(scope);
            return 'hello';
          },
        }}
      >
        hello world
      </Test>
    );
  });

  test('render function', () => {
    const Test = declareComponent({
      setup() {
        return () => {
          return 'hello';
        };
      },
    });

    const AsyncTest = declareComponent({
      async setup() {
        return () => 'hello';
      },
    });

    console.log(Test, AsyncTest);
  });

  test('完全定义', () => {
    const A = declareComponent({
      name: 'Comp',
      props: declareProps<{ a?: string; b: number }>(['a', 'b']),
      expose: declareExpose<{ hello: string }>(),
      slots: declareSlots<{ default: never }>(),
      emits: declareEmits<{ change: (data: number) => void }>(),
      setup: (props, { emit, expose, slots, attrs }) => {
        // vue3 可以访问 class、style
        expectType<any | undefined>(attrs.class);
        expectType<StyleValue | undefined>(attrs.style);

        expectType<string | undefined>(props.a);
        expectType<number>(props.b);

        emit('change', 100);

        // @ts-expect-error
        emit('change', 'string');

        expose({
          // @ts-expect-error
          hello: 1,
        });

        expectType<((scope: never) => VNodeChild) | undefined>(slots.default);

        // @ts-expect-error
        slots.foo();
      },
    });

    // JSX test
    // @ts-expect-error require b
    let a = <A />;
    a = <A b={1}>{{ default: () => 1 }}</A>;
  });
});

test('不同方式定义的组件 ref 不应该报错', () => {
  const DefineComponent = defineComponent({});
  const DeclareComponent = declareComponent({
    setup() {
      return () => <div></div>;
    },
  });

  const instanceRef = ref<any>();
  <SPA ref={instanceRef} />;
  <DefineComponent ref={instanceRef} />;
  <DeclareComponent ref={instanceRef} />;
});

test('泛型', () => {
  function OurGeneric<T>(
    props: { list: T[]; filter: (item: T) => boolean },
    ctx: DefineComponentContext<
      { change: (list: T[]) => void; add: (item: T) => void },
      {
        open: (item: T) => void;
        list: T[];
      },
      {
        foo: (list: T[]) => any;
      }
    >
  ) {
    ctx.emit('change', []);
    ctx.expose({
      open: item => {
        // ignore
      },
      list: props.list,
    });
    return {} as any;
  }

  // My.options = {
  //   props: ['list', 'shit'],
  // };

  const GenericBar = declareComponent(OurGeneric);

  <GenericBar
    list={[1, 2]}
    filter={i => {
      expectType<number>(i);
      return true;
    }}
    onAdd={i => {
      expectType<number>(i);
    }}
    onChange={i => {
      expectType<number[]>(i);
    }}
    v-slots={{
      foo(i) {
        expectType<number[]>(i);
      },
    }}
  ></GenericBar>;
});

test('泛型 2', () => {
  interface Props<T> {
    list: T[];
    filter: (item: T) => boolean;
  }

  type Emit<T> = {
    add: (item: T) => void;
    change: (list: T[]) => void;
  };

  type Expose<T> = {
    open: (item: T) => void;
    list: T[];
  };

  type Slots<T> = {
    foo: (list: T[]) => any;
  };

  const GenericBar = declareComponent({
    props: declareProps<Props<any>>([]),
    emits: declareEmits<Emit<any>>(),
    expose: declareExpose<Expose<any>>(),
    slots: declareSlots<Slots<any>>(),
    setup(props, ctx) {
      expectType<any[]>(props.list);
      ctx.emit('change', []);
      ctx.slots.foo?.([]);
      ctx.expose({
        list: [],
        open() {
          // ignore
        },
      });
      return {} as any;
    },
  }) as new <T>(
    ...args: any[]
  ) => ComponentInstance<Props<T>, Emit<T>, Expose<T>, Slots<T>>;

  <GenericBar
    list={[1, 2]}
    filter={i => {
      expectType<number>(i);
      return true;
    }}
    onAdd={i => {
      expectType<number>(i);
    }}
    onChange={i => {
      expectType<number[]>(i);
    }}
    v-slots={{
      foo(i) {
        expectType<number[]>(i);
      },
    }}
  ></GenericBar>;
});
