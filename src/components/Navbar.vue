<script setup lang="ts">
import { Camera } from "lucide-vue-next"
import { ShoppingBasket } from "lucide-vue-next"
import { Bed } from "lucide-vue-next"
</script>

<template>
    <nav class="fixed flex h-20 w-full items-center justify-center bg-gray-300">
        <div class="container flex items-center justify-between px-4 xl:px-0">
            <Bed :size="30" />
            <form action="submit">
                <input type="text" />
            </form>
            <ShoppingBasket :size="30" />
            test
        </div>
    </nav>
</template>
