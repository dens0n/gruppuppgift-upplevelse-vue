import { defineStore } from 'pinia'
import { ref } from 'vue';

export const useAirbnbStore = defineStore('airbnb', () => {
    const airbnbs = ref<AirBnb[]>([])

    async function getAirBnbs() {
        try {
            const response = (await fetch('hotels.json')).json();
            airbnbs.value = await response;
            console.log(airbnbs.value)
        } catch (error) {
            console.error(error);
        }
    }

    return {
        airbnbs,
        getAirBnbs
    }
})