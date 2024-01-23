import { Button } from "@mui/material";
import DrawerAppBar from "./components/AppBar";
import Router from "./router/Router";
import Toasters from "./components/common/Toasters";

function App() {
  return (
   <>
   <Toasters />
   <Router/>
   </>
  );
}

export default App;
