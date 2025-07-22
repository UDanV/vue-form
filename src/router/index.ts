import { createRouter, createWebHistory } from 'vue-router';
import AccountForm from '@/components/accountForm.vue';

const routes = [
  {
    path: '/accounts',
    name: 'Accounts',
    component: AccountForm,
  },
  {
    path: '/',
    redirect: '/accounts',
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
