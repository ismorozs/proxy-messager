import { Router, routes } from './routes';
import { UserContextProvider } from "./context/user";

function App() {
  return (
    <UserContextProvider>
      <Router routes={routes} />
    </UserContextProvider>
  );
}

export default App;
