import { useContext, JSX } from 'react';
import { RouterContextProvider } from './context/router';
import { ChatsPage } from './pages/chats/ChatsPage';
import { LoginPage } from './pages/login/LoginPage';
import { LogoutPage } from './pages/logout/LogoutPage';
import { UserContext } from './context/user';

export type IRouteConfig = {
  name: string;
  icon: string;
  route: string;
  component: () => JSX.Element;
  isDefault?: boolean;
}

export type IRouterProps = {
  routes: IRouteConfig[]
}

export const routes: IRouteConfig[] = [
  { name: "All", icon: 'message', route: 'chats', component: ChatsPage, isDefault: true },
  { name: "Logout", icon: 'logout', route: 'logout', component: LogoutPage }
];

export const Router = ({ routes }: IRouterProps) => {
  const { user } = useContext(UserContext);

  if (!user) {
    return <LoginPage />;
  }

  return (
    <RouterContextProvider routes={routes} />
  );
}