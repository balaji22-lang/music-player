import Home from "./pages/Home";
import Callback from "./pages/Callback";

function App() {

  const path = window.location.pathname;

  if (path === "/callback")
    return <Callback />;

  return <Home />;
}

export default App;