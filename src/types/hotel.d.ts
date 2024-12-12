interface Hotel {
    name: string;
    city: string;
    price_per_night: {
        adult: number;
        child: number;
    };
    beds: number;
    img: string;
}

interface searchParams {
    name: string,
    from: string,
    to: string,
    adults: string,
    children: string,
}