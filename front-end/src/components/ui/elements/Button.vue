<template>
  <div
      @click="preaction()"
      class="button d-flex justify-content-center align-items-center text-center">
    <div class="content-custom">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: ["action"],
  name: "Button",
  methods: {
    preaction(){
      this.action()
    }
  }
}
</script>

<style scoped>
.button {
  background: #C850C0;  /* Используем розовый цвет из градиента */
  border-radius: 16px;
  color: white;
  font-weight: 300;
  padding: 13px 18px 13px 18px;
  width: fit-content;
  height: fit-content;
  cursor: pointer;
  border: 2px solid #C850C0;
  transition: 0.3s;
  box-shadow: 2px 2px 8px rgba(200, 80, 192, 0.5);
}

.button:hover {
  transition: 0.3s;
  background: white;
  color: #C850C0;
  border: 2px solid #C850C0;
  box-shadow: 2px 2px 8px rgba(200, 80, 192, 0.3);
}

.button:hover .content-custom {
  color: #C850C0;
}
</style>