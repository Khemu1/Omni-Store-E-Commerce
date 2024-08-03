import axiosInstance from "./axiosInstance";
import {
  AccountInfoProps,
  AccountAddressesProps,
  AddressProps,
  AddressFormProps,
} from "../types";
import { UpdatePasswordProps } from "../types";

export const fetchAccountInfo = async (): Promise<AccountInfoProps> => {
  try {
    const response = await axiosInstance.get("/account/user-info");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch account info:", error);
    throw error;
  }
};

export const fetchAccountAddress = async (): Promise<AccountAddressesProps> => {
  try {
    const response = await axiosInstance.get("/account/addresses");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch account addresses:", error);
    throw error;
  }
};

export const updateUsername = async (username: string) => {
  try {
    const response = await axiosInstance.patch(
      "/account/update-user-username",
      { username }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to update account info:", error);
    throw error;
  }
};

export const updatePassword = async ({
  currentPassword,
  newPassword,
}: UpdatePasswordProps) => {
  try {
    const response = await axiosInstance.patch(
      "/account/update-user-password",
      { currentPassword, newPassword }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to update password:", error);
    throw error;
  }
};

export const updateEmail = async (email: string) => {
  try {
    const response = await axiosInstance.patch("/account/update-user-email", {
      email,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to update email:", error);
    throw error;
  }
};

export const updateMobileNumber = async (mobileNumber: string) => {
  try {
    const response = await axiosInstance.patch(
      "/account/update-user-mobile-number",
      { mobileNumber }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to update mobile number:", error);
    throw error;
  }
};

export const addAddress = async (address: AddressFormProps) => {
  try {
    const response = await axiosInstance.post("/account/add-address", address);
    return response.data;
  } catch (error) {
    console.error("Failed to add address:", error);
    throw error;
  }
};

export const getAddresses = async (): Promise<AddressProps[]> => {
  try {
    const response = await axiosInstance.get("/account/get-addresses");
    return response.data.addresses;
  } catch (error) {
    console.error("Failed to get addresses:", error);
    throw error;
  }
};

export const setAddressAsDefault = async (id: string) => {
  try {
    const response = await axiosInstance.post(
      `/account/set-address-default?id=${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to get addresses:", error);
    throw error;
  }
};
export const getAddress = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/account/get-address?id=${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to get addresses:", error);
    throw error;
  }
};

export const updateAddress = async (id: string, address: AddressFormProps) => {
  try {
    const response = await axiosInstance.patch(`/account/update-address`, {
      address,
      id,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to get addresses:", error);
    throw error;
  }
};

export const deleteAddress = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/account/delete-address?id=${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to get addresses:", error);
    throw error;
  }
};
