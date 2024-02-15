import Router from "./router/Router";
import Toasters from "./components/common/Toasters";
import { Loading } from "./components/common/loading";

function App() {
  return (
    <>
      <Toasters />
      <Loading />
      <Router />
    </>
  );
}

export default App;
