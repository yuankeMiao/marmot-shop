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
  address?: AddressType;
  password?: string;
  confirmPassword?: string;
};



export type CurrentUserStateType= {
  user: CurrentUserType | null;
  isLoading: boolean;
  error: number | null | string;
};

export type CurrentUserType = {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    image: string;
    role: "user" | "admin";
    address: AddressType | null;
    };

export type RegisterType = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  image: string;
};
