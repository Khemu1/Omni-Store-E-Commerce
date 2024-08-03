import { useEffect, useState } from "react";
import { getAllCheckoutData } from "../../utils/checkout";
import { CheckOutProps, CreateOrderProps } from "../../types";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { validateUser } from "../../utils/auth";
import { createOrder } from "../../utils/checkout";

export const useGetCheckoutData = () => {
  const navigateTo = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<CheckOutProps | null>(null);
  const [error, setError] = useState<string | null>(null);
  const handleGetCheckoutData = async () => {
    try {
      setLoading(true);
      setError(null);
      setData(await getAllCheckoutData());
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || "Something went wrong");
      }
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (error) {
      navigateTo("/myprofile");
    }
  }, [error]);
  return { loading, error, handleGetCheckoutData, data };
};

export const useCreateOrder = () => {
  const navigateTo = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const handleCreateOrder = async (data: CreateOrderProps) => {
    try {
      await validateUser();
      setLoading(true);
      setError(null);
      await createOrder(data);
      setSuccess(true);
    } catch (error) {
      setSuccess(false);
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || "Something went wrong");
      }
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        navigateTo("/myprofile/display-orderlist");
      }, 1000);
      return () => clearTimeout(timer);
    }
    if (error) {
      const timer = setTimeout(() => {
        navigateTo("/myprofile");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [success, error]);
  return { loading, error, handleCreateOrder, success };
};
