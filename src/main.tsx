import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";

import { router } from "@/router/Router";
import { ContextProvider } from "./provider/context";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ContextProvider>
    <RouterProvider
        router={router}
      />
  </ContextProvider>    
);
