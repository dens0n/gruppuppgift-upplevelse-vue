<script setup lang="ts">
import Navbar from "./components/Navbar.vue"
import { RouterView } from "vue-router"
</script>

<template>
    <div class="flex flex-col bg-gradient-to-b from-slate-100 to-sky-500 h-screen">
        <Navbar />
        <RouterView />
    </div>
</template>
