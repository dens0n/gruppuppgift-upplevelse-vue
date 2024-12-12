import { defineStore } from 'pinia'
import { ref } from 'vue';

export const useHotelStore = defineStore('hotel', {
    state: () => ({
        hotels: ref<Hotel[]>([]),
        loading: false,
    }),
    getters: {},
    actions: {
        async getHotels() {
            try {
                this.loading = true;
                const response = await fetch('/hotels.json');
                const data: Hotel[] = await response.json();

                this.hotels = data;

                this.loading = false;
            } catch (error) {
                console.error(error);
            }
        },


    }

})