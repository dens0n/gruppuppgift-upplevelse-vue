<script setup lang="ts">
import ArticleCard from "@/components/ArticleCard.vue";
import axios from "axios";
import { onMounted, reactive } from "vue";
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';

const state = reactive<{
    articles: Article[];
    isLoading: boolean;
}>({
    articles: [],
    isLoading: true
});

onMounted(async () => {
    try {
        const response = await axios.get('../../articles.json');
        state.articles = response.data;
    } catch (error) {
        console.error(error);
    } finally {
        state.isLoading = false;
    }
});


</script>
<template>
    <div class="container px-6 py-10 m-auto">
        <div v-if="state.isLoading" class="py-6 text-center text-gray-500">
            <PulseLoader />
        </div>
        <div v-else class="grid w-full grid-cols-3 gap-6 md:grid-cols-70/30 ">
            <ArticleCard v-for="article in state.articles" :key="article.id" :article="article" />
        </div>
    </div>
</template>