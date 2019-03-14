<template>
  <div class="page-content">
    <slot/>
  </div>
</template>

<style lang="postcss">
@import '../styles/variables.pcss';

.page-content {
  max-width: var(--content-width);
  margin: 0 auto;
  padding: 0 var(--content-horizontal-padding);
}
</style>
