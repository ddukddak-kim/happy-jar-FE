<template>
  <div class="overlay" data-test="modal">
    <div class="modal-container">
      <div class="header">
        <span class="header-text">
          <slot name="header">default header</slot>
        </span>
        <font-awesome-icon
          icon="xmark"
          class="close fa-2x"
          data-test="modal-close"
          @click="close"/>
      </div>
      <div class="body">
        <slot name="body">default body</slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Modal',
  methods: {
    close() {
      this.$emit('close');
    },
  },
};
</script>

<style lang="scss" scoped>
@import "src/style/color.scss";

.overlay {
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: $modal-background;

  display: flex;
  justify-content: center;
  align-items: center;

  .modal-container {
    position: relative;

    width: 40vh;
    min-height: 30vh;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: $white;
    border-radius: 2px;

    .header {
      position: relative;

      .header-text {
        position: absolute;
        left: 0px;
        font-size: 1.3em;
        font-weight: bolder;
      }
      .close {
        position: absolute;
        top: -10px;
        right: -15px;
      }
    }

    .body {
      margin: 20px 0;
    }
  }
}

</style>
