import { useCallback, useEffect, useState } from "react";
import { validateUser } from "../../utils/auth";
import { addCard, deleteCard, getCard, getCards, setCardDefault, updateCard } from "../../utils/Card";
import axios, { AxiosError } from "axios";
import { CardFormProps, CardProps, Cards } from "../../types";
import { useNavigate } from "react-router-dom";

export const useAddCard = () => {
  const navigateTo = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddCard = async (card: CardFormProps) => {
    try {
      setError(null);
      setLoading(true);
      await addCard(card); // Remove the setTimeout
      setSuccess(true);
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
    if (success) {
      const timer = setTimeout(() => {
        navigateTo("/myprofile/payment");
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [success, navigateTo]);

  return { loading, error, handleAddCard, success };
};
export const useGetCards = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<Cards | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGetCards = useCallback(async () => {
    const controller = new AbortController();
    const signal = controller.signal;

    try {
      setLoading(true);
      const fetchedData = await getCards(signal);
      setData(fetchedData);
    } catch (error) {
      if ((error as AxiosError).name === "CanceledError") {
        console.log("Request was canceled");
      } else if (error instanceof AxiosError && error.response?.data.message) {
        setError(error.response?.data.message);
      } else {
        setError("Server Error");
        console.log(error);
      }
    } finally {
      setLoading(false);
    }

    return () => {
      controller.abort();
    };
  }, []);

  return { loading, error, handleGetCards, data };
};

export const useSetCardDefault = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSetCardDefault = async (id: string) => {
    try {
      setError(null);
      setLoading(true);
      await setCardDefault(id);
      setSuccess(true);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || "Something went wrong");
      }
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, handleSetCardDefault, success };
};

export const useGetCard = (id: string) => {
  const navigateTo = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<CardProps | null>(null);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (id.length !== 24) {
      console.log("no");
      return;
    }
    const handleGetCard = async () => {
      try {
        await validateUser();
        setLoading(true);
        setError(null);
        setData(await getCard(id));
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(error.response?.data?.message || "Something went wrong");
        }
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    handleGetCard();
  }, [id]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        navigateTo("/myprofile/payment");
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [error]);
  return { loading, error, data };
};

export const useUpdateCard = () => {
  const navigateTo = useNavigate();
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const handleUpdateCard = async (id: string, card: CardFormProps) => {
    try {
      await validateUser();
      setLoading(true);
      setError(null);
      await updateCard(id, card);
      setSuccess(true);
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
    if (success) {
      if (success) {
        const timer = setTimeout(() => {
          navigateTo("/myprofile/payment");
        }, 1000);
        return () => clearTimeout(timer);
      }
    }
  }, [success]);
  return { loading, error, handleUpdateCard, success };
};

export const useDeleteCard = () => {
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const handleDeleteCard = async (id: string) => {
    try {
      await validateUser();
      setLoading(true);
      setError(null);
      await deleteCard(id);
      setSuccess(true);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || "Something went wrong");
      }
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return { loading, error, handleDeleteCard, success };
};
