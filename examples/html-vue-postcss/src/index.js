import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App';
import PageStart from './pages/PageStart';
import PageAbout from './pages/PageAbout';
import PageNotFound from './pages/PageNotFound';

// Setup router
Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    { path: '/', component: PageStart },
    { path: '/about', component: PageAbout },
    { path: '*', component: PageNotFound },
  ]
});

// Setup app
const app = new Vue({
  router,
  render: h => h(App),
});

// Mount when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  app.$mount('#app');
});
