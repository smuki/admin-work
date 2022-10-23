import { readonly, reactive, inject } from "vue";
const key = Symbol(); // Provide的key

// 在传入的vue应用实例中提供数据
export function provideStore(app) {
  // 创建默认的响应式数据
  const state = reactive({ value: null});
  // 登录
  async function setValue(value) {
    state.value = value;
  }

  // 提供全局数据
  app.provide(key, {
    state: readonly(state), // 对外只读
    setValue,
  });
}

export function useProvideStore(defaultValue = null) {
  return inject(key, defaultValue);
}
