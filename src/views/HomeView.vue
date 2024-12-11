<script setup lang="ts">
import Search from "@/components/Search.vue"

</script>

<template>
  <main class="flex h-screen flex-col items-center justify-center bg-gradient-to-b from-slate-100 to-sky-500 p-4">
    <header class="pb-16 text-center">
      <h1 class="text-5xl font-extrabold text-gray-800 md:text-7xl">
        Live like a local
      </h1>
      <h2 class="mt-4 text-4xl font-semibold text-gray-700 md:text-6xl">
        Travel like a star
      </h2>
    </header>
    <Search />
  </main>
</template>
