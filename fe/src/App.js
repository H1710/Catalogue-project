import HomePage from "./pages/HomePage";
import router from "./router";
import { RouterProvider } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="App min-h-[100vh]">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
