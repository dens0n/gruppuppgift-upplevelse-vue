interface Hotel {
    name: string
    city: string
    price_per_night: {
        adult: number
        child: number
    }
    beds: number
    img: string
    description: string
    max_guests: number
    available_dates: {
        start: string
        end: string
    }
}

interface SearchOptions {
    location: string
    fromDate: Date
    toDate: Date
    adults: number
    children: number
}
