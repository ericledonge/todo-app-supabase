import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.tsx";
import {
  QueryProvider,
  QueryProviderDevtools,
} from "./providers/query/query-client-provider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryProvider>
      <App />
      <QueryProviderDevtools />
    </QueryProvider>
  </React.StrictMode>,
);
