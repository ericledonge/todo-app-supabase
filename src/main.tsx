import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.tsx";
import { queryClient, QueryProvider, QueryProviderDevtools } from "./providers";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryProvider client={queryClient}>
      <App />
      <QueryProviderDevtools />
    </QueryProvider>
  </React.StrictMode>,
);
