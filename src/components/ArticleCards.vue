<script setup lang="ts">
import ArticleCard from "@/components/ArticleCard.vue";
import axios from "axios";
import { onMounted, reactive } from "vue";
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import { Article } from "@/types";

const state = reactive<{
    articles: Article[];
    isLoading: boolean;
}>({
    articles: [],
    isLoading: true
});

onMounted(async () => {
    try {
        const response = await axios.get('../../public/articles.json');
        state.articles = response.data;
    } catch (error) {
        console.error(error);
    } finally {
        state.isLoading = false;
    }
});
console.log(state.articles);

</script>
<template>
    <div class="container m-auto py-10 px-6">
        <div v-if="state.isLoading" class="text-center text-gray-500 py-6">
            <PulseLoader />
        </div>
        <div v-else class="grid grid-cols-3 md:grid-cols-70/30 w-full gap-6">
            <ArticleCard v-for="article in state.articles" :key="article.id" :article="article" />
        </div>
    </div>
</template>