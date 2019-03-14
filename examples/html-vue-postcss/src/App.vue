<script>
import MainHeader from './components/MainHeader';
import MainFooter from './components/MainFooter';

export default {
  components: { MainHeader, MainFooter },
};
</script>

<template>
  <div class="app">
    <main-header/>
    <router-view/>
    <main-footer/>
  </div>
</template>

<style lang="postcss">
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
</style>
