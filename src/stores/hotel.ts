import { defineStore } from 'pinia'
import { ref } from 'vue';

export const useHotelStore = defineStore('hotel', () => {
    const hotels = ref<Hotel[]>([])

    async function getHotels() {
        try {
            const response = await fetch('/hotels.json');
            const data: Hotel[] = await response.json();
            hotels.value = data;

        } catch (error) {
            console.error(error);
        }
    }

    async function getHotel(name: string) {
        try {
            const response = await fetch('/hotels.json');
            const data: Hotel[] = await response.json();

            const hotelValue: Hotel = data.find((hotel) => hotel.name.includes(name)) as Hotel

            return hotelValue;
        } catch (error) {
            throw error;
        }
    }

    return {
        hotels,
        getHotels,
        getHotel,
    }
})