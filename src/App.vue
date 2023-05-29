<template>
  <router-view />
</template>
<script lang="ts" setup>
import SignInTab from './views/SignInTab.vue';
</script>
<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  --green-1: 240, 245, 255;
  --green-2: 214, 228, 255;
  --green-3: 173, 198, 255;
  --green-4: 133, 165, 255;
  --green-5: 89, 126, 247;
  --green-6: 47,84,235;
  --green-7: 29,57,196;
  --green-8: 16, 35, 158;
  --green-9: 6, 17, 120;
  --green-10: 3, 8, 82;
  min-height: 100vh;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
