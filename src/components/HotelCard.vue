<script setup lang="ts">
import { RouterLink } from "vue-router"

defineProps<{
    hotel: Hotel
}>()
</script>

<template>
    <li
        class="group relative flex h-52 w-full justify-between rounded-lg border border-gray-300 bg-white p-1 transition-all duration-300 hover:cursor-pointer hover:shadow-md"
    >
        <!-- Image section -->
        <div class="flex-shrink-0">
            <img
                :src="`/img/${hotel.img}`"
                :alt="hotel.name"
                class="h-full w-full rounded object-cover"
            />
        </div>

        <!-- Text section -->
        <div class="flex h-full w-full flex-col gap-6 p-6">
            <div class="flex items-start justify-between">
                <h2 class="font-bold group-hover:underline">
                    {{ hotel.name }}, {{ hotel.city }}
                </h2>
                <span class="text-sm font-bold"
                    >{{ hotel.price_per_night.adult }} kr/natt</span
                >
            </div>
            <p class="text-sm font-light no-underline">
                {{ hotel.description || "Välkommen till detta hotell!" }}
            </p>
        </div>

        <!-- Button -->
        <RouterLink :to="`/hotels/${hotel.name}`">
            <button
                class="absolute bottom-4 right-6 cursor-pointer rounded-lg border-b-[4px] border-blue-600 bg-blue-500 px-4 py-2 text-white transition-all hover:-translate-y-[1px] hover:border-b-[6px] hover:brightness-110 active:translate-y-[2px] active:border-b-[2px] active:brightness-90"
            >
                Boka
            </button>
        </RouterLink>
    </li>
</template>
