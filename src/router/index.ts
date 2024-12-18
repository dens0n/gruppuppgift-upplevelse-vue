import { createRouter, createWebHistory } from "vue-router"
import HomeView from "../views/HomeView.vue"
import HotelsView from "@/views/HotelsView.vue"
import HotelBookingView from "@/views/HotelBookingView.vue"
import CheckoutView from "@/views/CheckoutView.vue"

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: HomeView,
        },
        {
            path: "/basket/:name",
            name: "basket",
            component: CheckoutView,
            props: true,
        },
        {
            path: "/hotels/:name",
            name: "hotel",
            component: HotelBookingView,
        },
        {
            path: "/hotels/:location/:from/:to/:adults/:children",
            name: "hotels",
            component: HotelsView,
        },
        {
            path: "/checkout",
            name: "checkout",
            component: CheckoutView,
        },
    ],
})

export default router
