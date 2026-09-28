import { IUser } from "../context/user";
import { API_URL, WAITING_RESPONSE_TIME } from "./constants";

export const getStateInstance = async (apiInstance: string, apiTokenInstance: string) => {
  return fetch(
    `${API_URL}/waInstance${apiInstance}/getStateInstance/${apiTokenInstance}`,
  );
};

export const fetchLastUpdate = async (apiInstance: string, apiTokenInstance: string) => {
  return fetch(
    `${API_URL}/waInstance${apiInstance}/receiveNotification/${apiTokenInstance}?receiveTimeout=${WAITING_RESPONSE_TIME}`,
  );
};

export const removeUpdate = async (
  apiInstance: string,
  apiTokenInstance: string,
  receiptId: string,
) => {
  return fetch(
    `${API_URL}/waInstance${apiInstance}/deleteNotification/${apiTokenInstance}/${receiptId}`,
    {
      method: "DELETE",
    },
  );
};

export const sendMessage = async (
  user: IUser,
  chatId: string,
  message: string,
) => {
  const { apiInstance, apiTokenInstance } = user;
  const res = await fetch(
    `${API_URL}/waInstance${apiInstance}/sendMessage/${apiTokenInstance}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ chatId, message }),
    },
  );
  return await res.json();
};

export const checkAccount = async (
  user: IUser,
  phoneNumber: string,
  force?: boolean,
) => {
  const { apiInstance, apiTokenInstance } = user;
  const res = await fetch(
    `${API_URL}/waInstance${apiInstance}/checkAccount/${apiTokenInstance}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phoneNumber, force }),
    },
  );
  return await res.json();
};