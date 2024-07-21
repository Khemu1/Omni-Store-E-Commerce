// src/utils/auth.ts
import axiosInstance from "./axiosInstance";
import { LoginProps, RegisterProps } from "../types/index";

export interface ResponseProps {
  id: string;
  username: string;
}

export const loginUser = async (data: LoginProps): Promise<ResponseProps> => {
  try {
    const response = await axiosInstance.post("/account/login", {
      data,
    });
    const result: ResponseProps = response.data;
    return result;
  } catch (error) {
    console.error("Unexpected error:", error);
    throw error;
  }
};

export const registerUser = async (
  data: RegisterProps
): Promise<ResponseProps> => {
  try {
    const response = await axiosInstance.post("/account/register", {
      data,
    });
    const result: ResponseProps = response.data;
    return result;
  } catch (error) {
    console.error("Unexpected error:", error);
    throw error;
  }
};
export const validateUser = async (): Promise<ResponseProps> => {
  try {
    const response = await axiosInstance.get("/account/user-info", {
      headers: {
        "Cache-Control": "no-cache",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Unexpected error:", error);
    throw error;
  }
};
