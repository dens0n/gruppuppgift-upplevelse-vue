<script setup lang="ts">
import Navbar from "./components/Navbar.vue"
import { RouterView } from "vue-router"
</script>

<template>
    <div class="flex flex-col h-screen">
        <Navbar />
        <RouterView />
    </div>
</template>
