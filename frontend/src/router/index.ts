// frontend/src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import CatalogView from '../views/CatalogView.vue';
import EquipmentDetailView from '../views/EquipmentDetailView.vue';
import LoanHistoryView from '../views/LoanHistoryView.vue';
import AdminDashboardView from '../views/AdminDashboardView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView
    },
    {
      path: '/catalog',
      name: 'catalog',
      component: CatalogView
    },
    {
      path: '/equipment/:id',
      name: 'equipment-detail',
      component: EquipmentDetailView
    },
    {
      path: '/loans',
      name: 'loans',
      component: LoanHistoryView
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminDashboardView
    }
  ]
});

export default router;