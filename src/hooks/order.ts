import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getOrders } from "../../utils/order";
import { CreateOrderProps, OrderProps } from "../../types";
import axios from "axios";
import { createOrder } from "../../utils/order";
import { validateUser } from "../../utils/auth";

export const useGetOrders = () => {
  const navigateTo = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<OrderProps[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const handleGetOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      setData(await getOrders());
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
      const timer = setTimeout(() => {
        navigateTo("/myprofile");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);
  return { loading, error, handleGetOrders, data };
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
