import { getCurrentInstance, computed } from "vue";

export default function useControlled(prop) {
  const instance = getCurrentInstance();
  const isControlled = computed(() => !!instance?.vnode?.props && (prop in instance?.vnode?.props));

  return isControlled;
};