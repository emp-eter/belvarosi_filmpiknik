import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
/* A globális stílus az App előtt, hogy a modulok felül tudják írni. */
import "./styles/global.css";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
