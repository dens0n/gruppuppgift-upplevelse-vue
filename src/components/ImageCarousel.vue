<script setup lang="ts">
import { ref } from 'vue';
import { Article } from "@/types";

const props = defineProps<{
    article: Article;
}>();

const currentImageIndex = ref(0);

const nextImage = () => {
    currentImageIndex.value = (currentImageIndex.value + 1) % props.article.img.length;
};

const prevImage = () => {
    currentImageIndex.value = (currentImageIndex.value - 1 + props.article.img.length) % props.article.img.length;
};
</script>

<template>
    <div class="relative w-full h-64">
        <img :src="'../../img/' + props.article.img[currentImageIndex]" alt="Image" class="w-full h-full object-cover rounded-lg">
        <button @click="prevImage" class="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full">‹</button>
        <button @click="nextImage" class="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full">›</button>
    </div>
</template>

<style scoped>
button {
    background-color: rgba(0, 0, 0, 0.5);
    border: none;
    cursor: pointer;
    padding: 10px;
    border-radius: 50%;
    color: white;
}
</style>

