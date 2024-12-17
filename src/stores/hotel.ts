import { defineStore } from "pinia"
import { ref } from "vue"

export const useHotelStore = defineStore("hotel", () => {
    const hotels = ref<Hotel[]>([])
    const checkout = ref<CheckoutType>({} as CheckoutType)

    async function getHotels() {
        try {
            const response = await fetch("/hotels.json")
            const data: Hotel[] = await response.json()
            hotels.value = data
        } catch (error) {
            console.error(error)
        }
    }

    async function getHotel(name: string) {
        try {
            const response = await fetch("/hotels.json")
            const data: Hotel[] = await response.json()

            const hotelValue: Hotel = data.find((hotel) =>
                hotel.name.includes(name),
            ) as Hotel

            return hotelValue
        } catch (error) {
            throw error
        }
    }

    async function getHotelLocations() {
        try {
            if (!hotels.value.length) {
                await getHotels()
            }

            const uniqueLocations = Array.from(
                new Set(hotels.value.map((hotel) => hotel.city)),
            )

            return uniqueLocations
        } catch (error) {
            console.error("Failed to get hotel locations:", error)
            throw error
        }
    }

    function addToCheckout(checkoutItem: CheckoutType) {
        checkout.value = { ...checkoutItem };
    }

    return {
        checkout,
        hotels,
        addToCheckout,
        getHotels,
        getHotel,
        getHotelLocations,
    }
})
