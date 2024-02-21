

export type LoginType = {
    username: string;
    password: string;
};

export type AddressType = {
    address: string;
    city: string;
    coordinates: {
        lat: number;
        lng: number;
    };
    postalCode: string;
    state: string;
};

export type UserType = {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    image: string;
    address: AddressType;
};
