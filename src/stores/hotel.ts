import { defineStore } from "pinia"
import { computed, ref } from "vue"

export const useHotelStore = defineStore("hotel", () => {
    const hotels = ref<Hotel[]>([])
    const checkout = ref<CheckoutType>({} as CheckoutType)
    const checkoutAmount = computed<number>(() => {
        if (checkout.value && Object.keys(checkout.value).length > 0) return 1

        return 0;
    })

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

    function removeFromCheckout() {
        checkout.value = {} as CheckoutType;
    }

    return {
        checkout,
        hotels,
        checkoutAmount,
        addToCheckout,
        removeFromCheckout,
        getHotels,
        getHotel,
        getHotelLocations,
    }
})
