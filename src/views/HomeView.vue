<script setup lang="ts">
import Search from "@/components/Search.vue"
import ArticleCards from "@/components/ArticleCards.vue"
</script>

<template>
    <header
        class="flex min-h-screen flex-col items-center justify-center  p-4 pb-40"
    >
        <div class="pb-16 text-center">
            <h1 class="text-5xl font-extrabold text-gray-800 md:text-7xl">
                Live like a local
            </h1>
            <h2 class="mt-4 text-4xl font-semibold text-gray-700 md:text-6xl">
                Travel like a star
            </h2>
        </div>
        <Search />
    </header>
    <section
        class="min-h-screen bg-gradient-to-t from-slate-100 to-sky-500 p-4"
    >
        <div class="flex justify-center">
            <h1 class="text-5xl text-gray-700">Popular Destinations</h1>
        </div>
        <ArticleCards />
    </section>
</template>
<style></style>
