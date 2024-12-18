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


interface searchParams {
    name: string,
    from: string,
    to: string,
    adults: string,
    children: string,
}

interface OfferType {
    icon: FunctionalComponent<LucideProps, {}, any, {}>;
    name: "wifi" | "breakfast" | "cleaning";
    checked: boolean;
    price: number
}

interface CheckoutType {
    hotel: Hotel,
    offers: Record<"wifi" | "breakfast" | "cleaning", number>,
    total_price: number,
    date_range: {
        start: string,
        end: string
    }
    adults: number
    children: number
}