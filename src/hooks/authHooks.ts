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
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: (data: LoginProps) => loginUser(data),
    onError: (error: any) => {
      console.error("Login Error:", error);
    },
    onSuccess: (response: ResponseProps) => {
      const { username, id, email, mobileNumber } = response;
      dispatch(login({ username, id, email, mobileNumber }));
    },
  });
};

export const useRegister = () => {
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: (data: RegisterProps) => registerUser(data),
    onError: (error: any) => {
      console.error("Register Error:", error);
    },
    onSuccess(response: ResponseProps) {
      const { username, id, email, mobileNumber } = response;
      dispatch(registerUserAction({ username, id, email, mobileNumber }));
    },
  });
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
