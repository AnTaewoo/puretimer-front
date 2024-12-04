import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";

import { router } from "@/router/Router";
import { LandingContextProvider } from "./provider/context/LandingContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <LandingContextProvider>
    <RouterProvider router={router} />
  </LandingContextProvider>
);
