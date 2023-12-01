import { createRouter, createWebHistory } from 'vue-router';
import Auth_Form from './components/AuthForm.vue';
import ReportsLog from './components/ReportsLog.vue';
import AdminForm from './components/AdminForm.vue';

const routes = [
    { path: '/', component: Auth_Form },
    { path: '/reports', component: ReportsLog },
    { path: '/admin', component: AdminForm },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
