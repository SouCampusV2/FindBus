<template>
  <router-view/>
</template>

<script>
import axios from 'axios'
import {mapActions} from 'vuex';
export default {
  name: "App",
  created() {
    const instance = axios.create({
      baseURL: process.env.NODE_ENV === "development" ? 'http://localhost:3000/' : 'http://localhost:3000/',
      timeout: 1000,
    });
    this.setAxios(instance)
  },
  methods: {
    ...mapActions(["setAxios"])
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap');

#app {
  font-family: 'Ubuntu', sans-serif;
  padding: 15px;
  background: linear-gradient(45deg, #4158D0 0%, #C850C0 100%);
  min-height: 100vh;
  color: #333333;
}

@keyframes show-animation {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
