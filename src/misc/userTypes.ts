import { BaseDto, BaseQueryOptionType } from "./generalTypes";

export type UserCredential = {
  email: string;
  password: string;
};

export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
}

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

export type CurrentUserStateType = {
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

export interface RegisterType extends Omit<UserBase, "role"> {
  confirmPassword: string;
}

export interface UserBase {
  firstname: string;
  lastname: string;
  email: string;
  avatar?: string;
  role: "Customer" | "Admin";
  password: string;
}

export interface UserReadDto extends Omit<UserBase, "password">, BaseDto {}

export interface UserCreateDto extends UserBase {}

export interface UserUpdateDto extends Partial<UserBase> {}

export interface UserQueryOptionType extends BaseQueryOptionType {
  role: "customer" | "admin";
  searchName: string;
  sortBy: "Name" | "Created_Date" | "Updated_Date";
}
