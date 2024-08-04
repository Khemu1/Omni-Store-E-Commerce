import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  clearWishList,
  displayWishList,
  removeWishListItem,
  toggleWishListProduct,
} from "../../utils/wishlist";
import { ProductProps } from "../../types";
import { validateUser } from "../../utils/auth";

export const useDsiplayWithList = () => {
  const navigateTo = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<ProductProps[] | []>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleDisplayWithList = async () => {
    try {
      setLoading(true);
      setError(null);
      setData(await displayWishList());
      setSuccess(true);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 401) {
          navigateTo("/login");
        }
        setError(error.response.data.message || "Somthing Wrong Happened");
      }
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return { loading, error, handleDisplayWithList, success, data };
};

export const useToggleWishList = () => {
  const navigateTo = useNavigate();
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleToggle = async (id: string) => {
    setLoading(true);
    try {
      await validateUser();
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
      await validateUser();
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

export const useClearWishList = () => {
  const navigateTo = useNavigate();

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const handleClearWishList = async () => {
    try {
      await validateUser();
      setLoading(true);
      await clearWishList();
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

  return { handleClearWishList, success, loading, error };
};