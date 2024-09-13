import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "home",
        component: HomeView,
    },
    {
        path: "/dashboard",
        name: "dashboard",
        component: () => import("../views/DashboardView.vue"),
    },
    {
        path: "/login",
        name: "login",
        component: () => import("../views/LoginView.vue"),
    },
    {
        path: "/sign-up",
        name: "sign-up",
        component: () => import("../views/SignUpView.vue"),
    },
    {
        path: "/profile",
        name: "profile",
        component: () => import("../views/UserProfileView.vue"),
    },
    {
        path: "/transactions",
        name: "transactions",
        component: () => import("../views/TransactionsView.vue"),
    },
    {
        path: "/reports",
        name: "reports",
        component: () => import("../views/ReportsView.vue"),
    },
    {
        path: "/edit-user-details",
        name: "edit-user-details",
        component: () => import("../views/EditUserDetailsView.vue"),
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
