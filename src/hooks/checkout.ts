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

