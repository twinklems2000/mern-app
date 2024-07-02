import "./App.css";
import RootRoutes from "./components/routes/RootRoutes";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="App">
      <Toaster />
      <RootRoutes />
    </div>
  );
}

export default App;
