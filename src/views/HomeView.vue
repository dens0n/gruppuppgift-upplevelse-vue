<script setup lang="ts">
import Search from "@/components/Search.vue"
</script>

<template>
    <main
        class="flex h-screen flex-col items-center justify-center bg-gradient-to-b from-slate-100 to-sky-500"
    >
        <div>
            <h1 class="text-6xl font-bold">
                Live like a local
            </h1>
            <h2 class="text-6xl font-bold">
                 travel like a star
            </h2>
        </div>
        <Search />
    </main>
</template>
