import { useQuery } from "@tanstack/react-query";
import { fetchAccountInfo } from "../../utils/ProfileAPIs";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { logout } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import {
  updateUsername,
  updateEmail,
  updateMobileNumber,
  updatePassword,
} from "../../utils/ProfileAPIs";
import axios from "axios";

import { useValidateUser } from "./authHooks";
import { UpdatePasswordProps } from "../../types";
interface ErrorObject {
  message: string;
}

export const useAccountInfo = () => {
  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  const query = useQuery({
    queryKey: ["getAccountInfo"],
    queryFn: fetchAccountInfo,
    retry: false,
  });

  useEffect(() => {
    if (query.isError) {
      const error = query.error as Error;
      if (error.message.includes("401")) {
        dispatch(logout());
        navigateTo("/");
      }
    }
  }, [query.data, query.error, query.isSuccess, query.isError, dispatch]);
  return query;
};

export const useUpdateUsername = () => {
  const navigateTo = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorObject | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleUpdateUsername = async (username: string) => {
    try {
      setSuccess(false);
      setLoading(true);
      setError(null);
      await updateUsername(username);
      setSuccess(true);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setError({ message: error.response.data.message });
      } else {
        setError({ message: "Server Error" });
      }
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useValidateUser();
  useEffect(() => {
    if (success) {
      setTimeout(() => {
        navigateTo("/myprofile/login-security");
      }, 3000);
    }
  }, [success]);
  return { loading, error, handleUpdateUsername, success };
};

export const useUpdateEmail = () => {
  const navigateTo = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorObject | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleUpdateEmail = async (email: string) => {
    try {
      setLoading(true);
      setError(null);
      await updateEmail(email);
      setSuccess(true);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setError({ message: error.response.data.message });
      } else {
        setError({ message: "Server Error" });
      }
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useValidateUser();
  useEffect(() => {
    if (success) {
      setTimeout(() => {
        navigateTo("/myprofile/login-security");
      }, 3000);
    }
  }, [success]);
  return { loading, error, handleUpdateEmail, success };
};

export const useUpdatePassword = () => {
  const navigateTo = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorObject | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleUpdatePassword = async ({
    currentPassword,
    newPassword,
  }: UpdatePasswordProps) => {
    try {
      setLoading(true);
      setError(null);
      await updatePassword({ currentPassword, newPassword });
      setSuccess(true);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setError({ message: error.response.data.message });
      } else {
        setError({ message: "Server Error" });
      }
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        navigateTo("/myprofile/login-security");
      }, 3000);
    }
  }, [success, navigateTo]);

  return { loading, error, handleUpdatePassword, success };
};

export default useUpdatePassword;

export const useUpdateMobileNumber = () => {
  const navigateTo = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorObject | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleUpdateMobileNumber = async (mobileNumber: string) => {
    try {
      setLoading(true);
      setError(null);
      await updateMobileNumber(mobileNumber);
      setSuccess(true);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setError({ message: error.response.data.message });
      } else {
        setError({ message: "Server Error" });
      }
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useValidateUser();
  useEffect(() => {
    if (success) {
      setTimeout(() => {
        navigateTo("/myprofile/login-security");
      }, 3000);
    }
  }, [success]);
  return { loading, error, handleUpdateMobileNumber, success };
};
