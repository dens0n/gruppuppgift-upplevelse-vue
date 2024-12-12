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
            path: "/hotels/:name",
            name: "hotel",
            component: HotelBookingView,
        },
        {
            path: "/hotels/:from/:to/:adults/:children",
            name: "hotels",
            component: HotelsView,
        },
    ],
})

export default router
