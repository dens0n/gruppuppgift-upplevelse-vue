interface AirBnb {
    name: string;
    city: string;
    price_per_night: {
        adult: number;
        child: number;
    };
    beds: number;
    img: string;
}