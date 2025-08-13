<script setup lang="ts">
import UiButton from "~/components/ui/Button.vue";
const emit = defineEmits<{ (e: "close"): void }>();

const menuRef = useTemplateRef("mobile-nav-menu");

useClickOutside(menuRef, () => {
  emit("close");
});
</script>

<template>
  <div id="nav-mobile-menu" ref="mobile-nav-menu" class="menu-wrapper">
    <div class="menu">
      <UiButton variant="outline">Register</UiButton>
      <UiButton>Login</UiButton>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.menu-wrapper {
  transition: opacity 0.5s ease;
}

.menu {
  @keyframes fade-menu {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

  & {
    position: absolute;
    top: 100%;
    right: 0;
    background-color: #ffffff;
    padding: spacing(3);
    border-radius: spacing(2);
    margin-top: spacing(2);
    box-shadow: 0 2px 2px 2px #00000017;
    min-width: 150px;
    display: flex;
    align-items: center;
    gap: spacing(3);
    flex-direction: column;
    animation: fade-menu 0.5s ease;

    .btn {
      width: 100%;
    }
  }
}
</style>
