import { useQuery } from "@tanstack/react-query";
import {
  addAddress,
  fetchAccountInfo,
  getAddress,
  setAddressAsDefault,
  updateAddress,
} from "../../utils/ProfileAPIs";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { logout, setUser } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import {
  updateUsername,
  updateEmail,
  updateMobileNumber,
  updatePassword,
} from "../../utils/ProfileAPIs";
import axios, { AxiosError } from "axios";
import { displayWishList } from "../../utils/wishlist";

import { useValidateUser } from "./authHooks";
import {
  AddressFormProps,
  AddressProps,
  ProductProps,
  UpdatePasswordProps,
} from "../../types";
import { dsiplayCartItems } from "../../utils/cart";
import { validateUser } from "../../utils/auth";
import { getAddresses } from "../../utils/ProfileAPIs";
import { getCheckoutData } from "../../utils/checkout";
interface ErrorObject {
  message: string;
}

export const useAccountInfo = () => {
  const dispatch = useDispatch();

  const query = useQuery({
    queryKey: ["getAccountInfo"],
    queryFn: fetchAccountInfo,
    retry: false,
  });

  useEffect(() => {
    if (query.isSuccess) {
      const { username, id, email, mobileNumber } = query.data;
      dispatch(setUser({ username, id, email, mobileNumber }));
    }
    if (query.isError) {
      const error = query.error as Error;
      if (error.message.includes("401")) {
        dispatch(logout());
      }
    }
  }, [query.data, query.error, query.isSuccess, query.isError, dispatch]);
  return query;
};

export const useUpdateUsername = () => {
  const navigateTo = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorObject | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleUpdateUsername = async (username: string) => {
    try {
      await validateUser();
      setSuccess(false);
      setLoading(true);
      setError(null);
      await updateUsername(username);
      setSuccess(true);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 401) {
          navigateTo("/login");
        }
        setError({ message: error.response.data.message });
      } else {
        setError({ message: "Server Error" });
      }
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useValidateUser();
  useEffect(() => {
    if (success) {
      setTimeout(() => {
        navigateTo("/myprofile/login-security");
      }, 1000);
    }
  }, [success]);
  return { loading, error, handleUpdateUsername, success };
};

export const useUpdateEmail = () => {
  const navigateTo = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorObject | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleUpdateEmail = async (email: string) => {
    try {
      setLoading(true);
      setError(null);
      await updateEmail(email);
      setSuccess(true);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 401) {
          navigateTo("/login");
        }
        setError({ message: error.response.data.message });
      } else {
        setError({ message: "Server Error" });
      }
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useValidateUser();
  useEffect(() => {
    if (success) {
      setTimeout(() => {
        navigateTo("/myprofile/login-security");
      }, 1000);
    }
  }, [success]);
  return { loading, error, handleUpdateEmail, success };
};

export const useUpdatePassword = () => {
  const navigateTo = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorObject | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleUpdatePassword = async ({
    currentPassword,
    newPassword,
  }: UpdatePasswordProps) => {
    try {
      setLoading(true);
      setError(null);
      await updatePassword({ currentPassword, newPassword });
      setSuccess(true);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 401) {
          navigateTo("/login");
        }
        setError({ message: error.response.data.message });
      } else {
        setError({ message: "Server Error" });
      }
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        navigateTo("/myprofile/login-security");
      }, 1000);
    }
  }, [success, navigateTo]);

  return { loading, error, handleUpdatePassword, success };
};

export default useUpdatePassword;

export const useUpdateMobileNumber = () => {
  const navigateTo = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorObject | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleUpdateMobileNumber = async (mobileNumber: string) => {
    try {
      setLoading(true);
      setError(null);
      await updateMobileNumber(mobileNumber);
      setSuccess(true);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 401) {
          navigateTo("/login");
        }
        setError({ message: error.response.data.message });
      } else {
        setError({ message: "Server Error" });
      }
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useValidateUser();
  useEffect(() => {
    if (success) {
      setTimeout(() => {
        navigateTo("/myprofile/login-security");
      }, 1000);
    }
  }, [success]);
  return { loading, error, handleUpdateMobileNumber, success };
};

export const useDsiplayWithList = () => {
  const navigateTo = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<ProductProps[] | []>([]);
  const [error, setError] = useState<ErrorObject | null>(null);
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
        setError({ message: error.response.data.message });
      } else {
        setError({ message: "Server Error" });
      }
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return { loading, error, handleDisplayWithList, success, data };
};

export const useDsiplayCartList = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<ProductProps[] | []>([]);
  const [error, setError] = useState<ErrorObject | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleDisplayCartList = async () => {
    try {
      setLoading(true);
      setError(null);
      setData(await dsiplayCartItems());
      setSuccess(true);
    } catch (error) {
      console.log(error);
      setError({ message: "Server Error" });
    } finally {
      setLoading(false);
    }
  };
  return { loading, error, handleDisplayCartList, success, data };
};

export const useAddAddress = () => {
  const navigateTo = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const handleAddAddress = async (address: AddressFormProps) => {
    try {
      await validateUser();
      setLoading(true);
      setError(null);
      await addAddress(address);
      setSuccess(true);
    } catch (error) {
      if (error instanceof AxiosError && error.response?.data.message) {
        setError(error.response?.data.message);
      } else {
        setError("Server Error");
      }
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (success) {
      setTimeout(() => {
        navigateTo("/myprofile/addresses");
      }, 1000);
    }
  }, [success]);
  return { loading, error, handleAddAddress, success };
};

export const useGetAddresses = () => {
  const [data, setData] = useState<AddressProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const handleGetAddresses = async () => {
    try {
      await validateUser();
      setLoading(true);
      setError(null);
      setData(await getAddresses());
      setSuccess(true);
    } catch (error) {
      if (error instanceof AxiosError && error.response?.data.message) {
        setError(error.response?.data.message);
      } else {
        setError("Server Error");
      }
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return { loading, error, handleGetAddresses, success, data };
};

export const useSetAddressesAsDefault = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const handleSetAddressesAsDefault = async (id: string) => {
    try {
      await validateUser();
      setLoading(true);
      setError(null);
      await setAddressAsDefault(id);
      setSuccess(true);
    } catch (error) {
      if (error instanceof AxiosError && error.response?.data.message) {
        setError(error.response?.data.message);
      } else {
        setError("Server Error");
      }
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return { loading, error, handleSetAddressesAsDefault, success };
};

export const useGetAddress = (id: string) => {
  const navigateTo = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<AddressProps | null>(null);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (id.length === 0) return;
    const handleGetAddress = async () => {
      try {
        await validateUser();
        setLoading(true);
        setError(null);
        setData(await getAddress(id));
        console.log("handle called", data);
      } catch (error) {
        if (error instanceof AxiosError && error.response?.data.message) {
          setError(error.response?.data.message);
        } else {
          setError("Server Error");
        }
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    handleGetAddress();
  }, [id]);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        navigateTo("/myprofile/addresses");
      }, 1000);
    }
  }, [error]);
  return { loading, error, data };
};

export const useUpdateAddress = () => {
  const navigateTo = useNavigate();
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const handleUpdateAddress = async (id: string, address: AddressFormProps) => {
    try {
      await validateUser();
      setLoading(true);
      setError(null);
      await updateAddress(id, address);
      setSuccess(true);
    } catch (error) {
      if (error instanceof AxiosError && error.response?.data.message) {
        setError(error.response?.data.message);
      } else {
        setError("Server Error");
      }
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (success) {
      setTimeout(() => {
        navigateTo("/myprofile/addresses");
      }, 1000);
    }
  }, [success]);
  return { loading, error, handleUpdateAddress, success };
};

export const useGetCheckoutData = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState<string | null>(null);
  const handleGetcheckoutData = async () => {
    try {
      setLoading(true);
      setData(await getCheckoutData());
    } catch (error) {
      if (error instanceof AxiosError && error.response?.data.message) {
        setError(error.response?.data.message);
      }
      setError("Server Error");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return { loading, error, handleGetcheckoutData, data };
};
