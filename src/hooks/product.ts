import { useState } from "react";
import {
  toggleWishListProduct,
  removeWishListItem,
} from "../../utils/wishlist";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { addProductToCart, changeCartAmount } from "../../utils/cart";

export const useToggleWishList = () => {
  const navigateTo = useNavigate();
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleToggle = async (id: string) => {
    setLoading(true);
    try {
      setSuccess(false);
      await toggleWishListProduct(id);
      setSuccess(true);
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 401) {
        setSuccess(false);
        navigateTo("/login", { replace: true });
      }
    } finally {
      setLoading(false);
    }
  };

  return { handleToggle, success, loading };
};

export const useRemoveWishListItem = () => {
  const navigateTo = useNavigate();
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRemove = async (id: string) => {
    setLoading(true);
    try {
      const response = await removeWishListItem(id);
      console.log(response.status);
      setSuccess(true);
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 401) {
        setSuccess(false);
        navigateTo("/login", { replace: true });
      }
    } finally {
      setLoading(false);
    }
  };

  return { handleRemove, success, loading };
};

export const useAddToCart = () => {
  const navigateTo = useNavigate();
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const handleAddToCart = async (productId: string) => {
    setLoading(true);
    setError(null);
    try {
      setSuccess(false);
      await addProductToCart(productId);
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
