import { useMutation, useQuery } from "@tanstack/react-query";
import {
  loginUser,
  registerUser,
  ResponseProps,
  validateUser,
} from "../../utils/auth";
import { useDispatch } from "react-redux";
import { login, registerUser as registerUserAction } from "../store/authSlice";
import { LoginProps, RegisterProps } from "../../types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";

export const useLogin = () => {
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: (data: LoginProps) => loginUser(data),
    onError: (error: AxiosError) => {
      console.error("Login Error:", error);
    },
    onSuccess: (response: ResponseProps) => {
      const { username, id, email, mobileNumber } = response;
      dispatch(login({ username, id, email, mobileNumber }));
    },
  });
};

export const useRegister = () => {
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleUseRegister = async (data: RegisterProps) => {
    try {
      setError(null);
      setLoading(true);
      const response = await registerUser(data);
      // Dispatch action with user data from response
      dispatch(registerUserAction(response));
      setSuccess(true);
    } catch (error:AxiosError | unknown) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || "Something went wrong");
      } else {
        setError("An unexpected error occurred");
      }
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        navigateTo("/");
      }, 1000); 
      return () => clearTimeout(timer);
    }
  }, [success, navigateTo]);

  return { loading, error, handleUseRegister, success };
};

export const useValidateUser = () => {
  const navigateTo = useNavigate();

  const query = useQuery({
    queryKey: ["validateUser"],
    queryFn: validateUser,
    retry: false,
  });

  useEffect(() => {
    if (query.isError) {
      navigateTo("/login");
    }
  }, [navigateTo, query.isError]);

  return query; // provides access to the query's state and methods in the component that calls the hook
};
