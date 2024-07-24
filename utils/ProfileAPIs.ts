import axiosInstance from "./axiosInstance";
import { AccountInfoProps, AccountAddressesProps } from "../types";
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
