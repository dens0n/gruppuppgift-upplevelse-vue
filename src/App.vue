<script setup lang="ts">
import Navbar from "./components/Navbar.vue"
import { RouterView, useRouter } from "vue-router"
import { useHotelStore } from "./stores/hotel";

const router = useRouter();

router.beforeEach((to, from, next) => {
    const store = useHotelStore();
    if (store.checkoutAmount <= 0 && to.name === "checkout") {
        store.removeFromCheckout();
        next({ name: "home" })
    }
    else next();
})

</script>

<template>
    <div class="flex flex-col bg-gradient-to-b from-slate-100 to-sky-500 min-h-screen">
        <Navbar />
        <RouterView />
    </div>
</template>
