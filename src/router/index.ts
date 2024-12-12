import { createRouter, createWebHistory } from "vue-router"
import HomeView from "@/views/HomeView.vue"
import CheckoutView from "@/views/CheckoutView.vue"
import HotelDetails from "@/components/HotelDetails.vue"
import HotelsView from "@/views/HotelsView.vue"

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
            component: HotelDetails,
            props: true,
        },
        {
            path: "/hotels/:from/:to/:adults/:children",
            name: "hotels",
            component: HotelsView,
        },
    ],
})

export default router
