// this is a provider file so if you use any other library which have to include provider just include it here and it will be included in the layout.js

'use client'
import React from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReduxProvider } from "../store/reduxProvider";


// example for other library provider (this is not in pacakage.json)

// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

function Providers({ children }) {
  const [client] = React.useState(new QueryClient());

  return (
    <ReduxProvider>
      <QueryClientProvider client={client}>
        {/* Toast provider, no need to use multiple provider in layout */}

        {children}
      </QueryClientProvider>
    </ReduxProvider>
  );
}

export default Providers;