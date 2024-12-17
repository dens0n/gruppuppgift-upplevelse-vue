<script setup lang="ts">

import { Article } from "@/types";

const props = defineProps<{
    article: Article;
}>();
</script>

<template>
    <div class="max-w-sm rounded overflow-hidden shadow-lg">
        <img class="w-full" :src="'../../public/img/'+props.article.img" alt="pic">
        <div class="px-6 py-4">
            <div class="font-bold text-xl mb-2">{{ props.article.city }}</div>
            <p class="text-gray-700 text-base">
                {{ props.article.article }}
            </p>
        </div>
        <div class="px-6 pt-4 pb-2">
            <span v-for="hashtag in props.article.hashtags" :key="hashtag.index" class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                #{{hashtag}}
            </span>
        </div>
    </div>
</template>