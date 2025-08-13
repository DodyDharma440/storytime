import type { ShallowRef } from "vue";

export const useClickOutside = <T extends ShallowRef>(
  elementRef: T,
  callback: (e: Event) => void
) => {
  const handleClick = (event: Event) => {
    if (elementRef.value && !elementRef.value.contains(event.target)) {
      callback(event);
    }
  };

  onMounted(() => {
    document.addEventListener("click", handleClick);
  });

  onUnmounted(() => {
    document.removeEventListener("click", handleClick);
  });
};
