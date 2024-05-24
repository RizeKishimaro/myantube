import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { SkeletonTheme } from "react-loading-skeleton";
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
<QueryClientProvider client={queryClient}>
  <BrowserRouter>
    <SkeletonTheme baseColor="#d9d9d9">
      <App />
    </SkeletonTheme>
  </BrowserRouter>
</QueryClientProvider>,
);
