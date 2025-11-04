import React from "react";
import ReactDOM from "react-dom/client";
import { WagmiProvider } from "wagmi";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import { wagmiConfig } from "./wagmi.ts";
import App from "./App.tsx";
import { SolanaProvider } from "./solanaProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={new QueryClient()}>
        <SolanaProvider>
          <App />
        </SolanaProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
);
