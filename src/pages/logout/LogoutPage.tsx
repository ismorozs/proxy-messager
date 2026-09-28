import { useContext, useEffect } from "react"
import { UserContext } from "../../context/user";
import { RouterContext } from "../../context/router";

export const LogoutPage = () => {
  const { setUser } = useContext(UserContext);
  const { setRoute, defaultRoute } = useContext(RouterContext);

  useEffect(() =>  {
    setRoute(defaultRoute);
    setUser(null);
  }, [setUser, setRoute, defaultRoute]);

  return <div></div>;
}