import { createRouter, createWebHistory } from "vue-router"
import HomeView from "../views/HomeView.vue"
import HotelsView from "@/views/HotelsView.vue"
import HotelBookingView from "@/views/HotelBookingView.vue"

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: HomeView,
        },
        {
            path: "/hotel/:name/:from/:to/:adults/:children",
            name: "hotel",
            component: HotelBookingView,
        },
        {
            path: "/hotels/:location/:from/:to/:adults/:children",
            name: "hotels",
            component: HotelsView,
        },
    ],
})

export default router
