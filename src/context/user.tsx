import { createContext, useMemo, useState, JSX, Dispatch, SetStateAction } from 'react';

export type IUser = {
  apiInstance: string;
  apiTokenInstance: string;
}

type IUserContext = {
  user: IUser | null;
  setUser: Dispatch<SetStateAction<IUser | null>>;
}

type IUserContextProviderProps = {
  children: JSX.Element
};

const DEFAULT_CONTEXT: IUserContext = {
  user: null,
  setUser: () => {}
}

export const UserContext = createContext<IUserContext>(DEFAULT_CONTEXT);

export const UserContextProvider = ({ children }: IUserContextProviderProps) => {
  const [user, setUser] = useState<IUser|null>(null);

  const contextValues = useMemo(() => ({
    user,
    setUser
  }), [user, setUser]);

  return (
    <UserContext value={contextValues}>
      {children}
    </UserContext>
  );
}