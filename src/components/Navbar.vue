<script setup lang="ts">
import { ShoppingCart } from "lucide-vue-next"
import { Bed } from "lucide-vue-next"
import { RouterLink } from "vue-router"
</script>

<template>
    <nav
        class="sticky start-0 top-0 z-20 w-full backdrop-blur-[6px]"
    >
        <div
            class="container mx-auto flex flex-wrap items-center justify-between p-4"
        >
            <RouterLink
                to="/"
                class="flex items-center space-x-3 rtl:space-x-reverse"
            >
                <Bed :size="30" />
                <span
                    class="self-center whitespace-nowrap text-2xl font-semibold"
                    >Star Travel</span
                >
            </RouterLink>
            <RouterLink
                to="/"
                class="flex items-center justify-center rounded-full border-2 border-slate-300 p-3 shadow-sm hover:bg-sky-400"
            >
                <ShoppingCart />
            </RouterLink>
        </div>
    </nav>
</template>
