import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./input.css";
import App from "./App";
import { QueryClient, QueryClientProvider } from "react-query";
import store from "./redux/store";
import { Provider } from "react-redux";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <App />
    </Provider>
  </QueryClientProvider>
  // {/* <React.StrictMode> */}
  // </React.StrictMode>
);
