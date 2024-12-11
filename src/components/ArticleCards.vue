<script setup lang="ts">
import ArticleCard from "@/components/ArticleCard.vue";
import { reactive } from "vue";

const state = reactive({
        articles: [],
        isLoding: true
    });

</script>
<template>
    <div class="container m-auto py-10 px-6">
        <div class="grid grid-cols-3 md:grid-cols-70/30 w-full gap-6">
            <ArticleCard />
        </div>
    </div>
</template>