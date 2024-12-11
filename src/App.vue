<script setup lang="ts">
import Navbar from "./components/Navbar.vue"
import { RouterView } from "vue-router";
</script>

<template>
    <div class="">
        <Navbar />
        <RouterView />
    </div>
</template>
