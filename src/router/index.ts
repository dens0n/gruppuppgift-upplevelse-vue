import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AirbnbDetails from "@/components/AirbnbDetails.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: HomeView,
        },
        {
            path: "/hotel/:name",
            name: "hotel",
            component: AirbnbDetails,
            props: true
        }
    ],
});

export default router;
