import { useState, useEffect, useRef } from "react";
import { combineChats, fetchAllUpdates } from "./utils";
import { isEmpty, recreateStructure } from '../../../utils';
import { IChats } from "../components/Chat";
import { IUser } from "../../../context/user";

export const useChats = (user: IUser, timeInterval: number): IChats => {
  const [chats, setChats] = useState<IChats>({});
  const chatsRef = useRef<IChats>({});
  const { apiInstance, apiTokenInstance } = user;
  const timeoutId = useRef({});

  useEffect(() => {
    async function getAllUpdates(apiInstance: string, apiTokenInstance: string) {
      const newChats = await fetchAllUpdates(apiInstance, apiTokenInstance);
      if (!isEmpty(newChats)) {
        chatsRef.current = combineChats(chatsRef.current, newChats);
        setChats(recreateStructure(chatsRef.current) as IChats);
      }

      timeoutId.current = setTimeout(async () => {
        await getAllUpdates(apiInstance, apiTokenInstance);
      }, timeInterval * 1000);
    }

    getAllUpdates(apiInstance, apiTokenInstance);

    return () => {
      clearTimeout(timeoutId.current as number)
    };
  }, [apiInstance, apiTokenInstance, setChats, timeInterval]);

  return chats;
}