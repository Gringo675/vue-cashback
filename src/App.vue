<template>
  <vMainWrapper/>
</template>

<script>
  import vMainWrapper from './components/v-main-wrapper'

  export default {
  name: 'App',
  components: {
    vMainWrapper
  }
}
</script>

<style lang="scss">
  @import '@/assets/reset.scss';

  @import url('https://fonts.googleapis.com/css2?family=Play:wght@400;700&display=swap');

  #app {
    font-family: 'Play', sans-serif;;
    font-size: 16px;
    color: #2c3e50;
    background: #e2e0d0;
    overflow-x: hidden;
    min-height: 100vh;
  }

</style>
