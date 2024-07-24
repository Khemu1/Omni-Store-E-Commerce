import { useMutation, useQuery } from "@tanstack/react-query";
import {
  loginUser,
  registerUser,
  ResponseProps,
  validateUser,
} from "../../utils/auth";
import { useDispatch } from "react-redux";
import {
  login,
  registerUser as registerUserAction,
  logout,
  setUser,
} from "../store/authSlice";
import { LoginProps, RegisterProps } from "../../types";
import { useEffect } from "react";

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
  const dispatch = useDispatch();

  const query = useQuery({
    queryKey: ["validateUser"],
    queryFn: validateUser,
    retry: false,
  });

  useEffect(() => {
    if (query.isSuccess) {
      const { username, id, email, mobileNumber } = query.data;
      dispatch(setUser({ username, id, email, mobileNumber }));
    } else if (query.isError) {
      const error = query.error as Error;
      if (error.message.includes("401")) {
        dispatch(logout());
      }
    }
  }, [query.data, query.error, query.isSuccess, query.isError, dispatch]);

  return query;
};
