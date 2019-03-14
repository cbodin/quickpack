<script>
import PageContent from './PageContent';

export default {
  components: { PageContent },
};
</script>

<template>
  <header class="main-header">
    <page-content>
      <nav>
        <ul class="main-header__links">
          <li class="main-header__link-wrapper">
            <router-link class="main-header__link" to="/">Start</router-link>
          </li>
          <li class="main-header__link-wrapper">
            <router-link class="main-header__link" to="/about">About</router-link>
          </li>
        </ul>
      </nav>
    </page-content>
  </header>
</template>

<style lang="postcss">
@import '../styles/variables.pcss';

.main-header {
  padding: 50px 0;
  background: var(--background-dark);
}

.main-header__links {
  list-style: none;
  display: flex;
}

.main-header__link-wrapper {
  padding: 0 10px;

  &:first-child {
    padding-left: 0;
  }

  &:last-child {
    padding-right: 0;
  }
}

.main-header__link {
  display: block;
  padding: 10px 0;
}
</style>
