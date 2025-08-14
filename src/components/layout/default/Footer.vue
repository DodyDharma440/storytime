<script setup lang="ts">
import FacebookIcon from "~/assets/icons/FacebookIcon.vue";
import InstagramIcon from "~/assets/icons/InstagramIcon.vue";
import YoutubeIcon from "~/assets/icons/YoutubeIcon.vue";

const cpYear = new Date().getFullYear();
</script>

<template>
  <footer class="footer">
    <div class="container footer__content">
      <p class="footer__cp-text">
        © {{ cpYear }} PT. Timedoor Indonesia. All rights reserved.
      </p>

      <div class="footer__socials">
        <a href="https://facebook.com" target="_blank">
          <FacebookIcon class="footer__social-icon" />
        </a>
        <a href="https://instagram.com/" target="_blank">
          <InstagramIcon class="footer__social-icon" />
        </a>
        <a href="https://youtube.com" target="_blank">
          <YoutubeIcon class="footer__social-icon" />
        </a>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  border-top: 1px solid #4b4b4b;

  &__content {
    padding-top: spacing(6.25);
    padding-bottom: spacing(8.25);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: spacing(4);
  }

  &__cp-text {
    font-size: to-rem(18);

    @include min-lg {
      font-size: to-rem(20);
    }
  }

  &__socials {
    display: flex;
    align-items: center;
    gap: spacing(3);

    @include min-lg {
      gap: spacing(5);
    }
  }

  &__social-icon {
    width: 100%;
    height: 36px;
    transition: transform 0.2s;
    color: $text-color;

    &:hover {
      transform: translateY(spacing(-0.5));
    }

    @include min-lg {
      height: 40px;
    }
  }
}
</style>
