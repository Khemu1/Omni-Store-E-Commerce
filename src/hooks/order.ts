import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getOrders } from "../../utils/order";
import { OrderProps } from "../../types";
import axios from "axios";

export const useGetCheckoutData = () => {
  const navigateTo = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<OrderProps | null>(null);
  const [error, setError] = useState<string | null>(null);
  const handleGetCheckoutData = async () => {
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
  return { loading, error, handleGetCheckoutData, data };
};
