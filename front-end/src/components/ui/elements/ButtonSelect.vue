<template>
  <div class="button d-flex justify-content-center align-items-center text-center">
    <BIconCaretDownFill class="arrow"/>
  </div>
</template>

<script>
export default {
  name: "ButtonSelect"
}
</script>

<style scoped>
.button {
  background: white;
  border-radius: 16px;
  color: #C850C0;
  font-weight: 300;
  padding: 6px 8px 6px 8px;
  width: fit-content;
  height: fit-content;
  cursor: pointer;
  border: 2px solid #C850C0;
  transition: 0.3s;
}

.button:hover {
  transition: 0.3s;
  background: white;
  color: #C850C0;
  border: 2px solid #C850C0;
}
</style>