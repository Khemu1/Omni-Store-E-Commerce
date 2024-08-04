import { useEffect, useState } from "react";
import {
  addProductToCart,
  changeCartAmount,
  clearCart,
  dsiplayCartItems,
} from "../../utils/cart";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { validateUser } from "../../utils/auth";
import { ProductProps } from "../../types";

export const useAddToCart = () => {
  const navigateTo = useNavigate();
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const handleAddToCart = async (productId: string,quantity?:number) => {
    setLoading(true);
    setError(null);
    try {
      setSuccess(false);
      await addProductToCart(productId, quantity);
      setSuccess(true);
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 401) {
        navigateTo("/login");
      } else if (
        error instanceof AxiosError &&
        error.response?.status === 400
      ) {
        setError(error.response.data.message);
      }
    } finally {
      setLoading(false);
    }
  };
  setTimeout(() => {
    setError(null);
  }, 6000);
  setTimeout(() => {
    setSuccess(false);
  }, 2000);
  return { handleAddToCart, success, loading, error };
};

export const useChangeCartAmount = () => {
  const navigateTo = useNavigate();

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const handleChangeCartAmount = async (
    productId: string,
    quantity: number
  ) => {
    setLoading(true);
    setError(null);
    try {
      await changeCartAmount(productId, quantity);
      setSuccess(true);
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 401) {
        navigateTo("/login");
      } else if (
        error instanceof AxiosError &&
        error.response?.status === 400
      ) {
        setError(error.response.data.message);
      }
    } finally {
      setLoading(false);
    }
  };
  return { handleChangeCartAmount, success, loading, error };
};

export const useClearCart = () => {
  const navigateTo = useNavigate();

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const handleClearCart = async () => {
    try {
      await validateUser();
      setLoading(true);
      await clearCart();
      setSuccess(true);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || "Something went wrong");
      }
      console.log(error);
    } finally {
      setLoading(false);
    }
    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  };
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        navigateTo("/myprofile");
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return { handleClearCart, success, loading, error };
};

export const useDisplayCartList = () => {
  const navigateTo = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<ProductProps[] | []>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleDisplayCartList = async () => {
    try {
      await validateUser();
      setLoading(true);
      setError(null);
      setData(await dsiplayCartItems());
      setSuccess(true);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setError(error.response.data.message || "Somthing Wrong Happened");
      }
    } finally {
      setLoading(false);
    }
    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  };
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        navigateTo("/myprofile");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);
  return { loading, error, handleDisplayCartList, success, data };
};
