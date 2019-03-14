<script>
import PageContent from './PageContent';

export default {
  components: { PageContent },
};
</script>

<template>
  <footer class="main-footer">
    <page-content>
      Footer
    </page-content>
  </footer>
</template>

<style lang="postcss">
@import '../styles/variables.pcss';

.main-footer {
  padding: 50px 0;
  background: var(--background-dark);
}
</style>
