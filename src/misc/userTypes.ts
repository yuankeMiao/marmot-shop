import { BaseDto, BaseQueryOptionType } from "./generalTypes";

export type UserCredential = {
  email: string;
  password: string;
};

export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
}

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
  role: "Customer" | "Admin";
  searchName: string;
  sortBy: "Name" | "CreatedDate" | "UpdatedDate";
}



// address
export interface AddressBase {
  recipient: string;
  phone: string;
  line1: string;
  line2?: string;
  postalCode: string;
  city: string;
  userId: string;
}

export interface AddressReadDto extends AddressBase, BaseDto {}

export interface AddressCreateDto extends Omit<AddressBase, 'userId'> {}

export interface AddressUpdateDto extends Partial<AddressCreateDto> {}

