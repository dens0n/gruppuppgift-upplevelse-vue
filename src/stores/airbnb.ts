import { defineStore } from 'pinia'
import { ref } from 'vue';

export const useAirbnbStore = defineStore('airbnb', () => {
    const airbnbs = ref<AirBnb[]>([])

    async function getAirBnbs() {
        try {
            const response = await fetch('/hotels.json');
            const data: AirBnb[] = await response.json();
            airbnbs.value = data;

        } catch (error) {
            console.error(error);
        }
    }

    async function getAirBnb(name: string) {
        try {
            const response = await fetch('/hotels.json');
            const data: AirBnb[] = await response.json();

            const airbnbValue: AirBnb = data.find((hotel) => hotel.name.includes(name)) as AirBnb

            return airbnbValue;
        } catch (error) {
            throw error;
        }
    }

    return {
        airbnbs,
        getAirBnbs,
        getAirBnb,
    }
})