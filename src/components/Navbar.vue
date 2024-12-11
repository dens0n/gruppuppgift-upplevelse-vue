<script setup lang="ts">
import { Camera } from "lucide-vue-next"
import { ShoppingBasket } from "lucide-vue-next"
import { Bed } from "lucide-vue-next"
</script>

<template>
    <nav class="sticky top-0 right-0 bg-transparent flex h-20 w-full items-center justify-center bg-gray-300">
        <div class="container flex items-center justify-between px-4 xl:px-0">
            <Bed :size="30" />
            <ShoppingBasket :size="30" />
        </div>
    </nav>
</template>
