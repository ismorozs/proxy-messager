import { createContext, useMemo, useState, Dispatch, SetStateAction } from 'react';
import { IRouteConfig, IRouterProps } from '../routes';

type IRouterContext = {
  current: string;
  defaultRoute: string;
  setRoute: Dispatch<SetStateAction<string>>;
};

const DEFAULT_CONTEXT: IRouterContext = {
  current: "",
  defaultRoute: "",
  setRoute: () => {}
}

export const RouterContext = createContext<IRouterContext>(DEFAULT_CONTEXT);

export const RouterContextProvider = ({ routes }: IRouterProps) => {
  const defaultRoute = routes.find((page) => page.isDefault) as IRouteConfig;
  const [route, setRoute] = useState(defaultRoute.route);
  const currentRoute = routes.find((page) => page.route === route) as IRouteConfig;

  const routerContextValues = useMemo(() => ({
    current: route,
    defaultRoute: defaultRoute.route,
    setRoute,
  }), [defaultRoute.route, route]);

  
  const Page = currentRoute.component;

  return (
    <RouterContext value={routerContextValues}>
      <Page />
    </RouterContext>
  );
}
