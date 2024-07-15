import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import Context from "./Contexts";
import { GoogleOAuthProvider } from '@react-oauth/google';
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <GoogleOAuthProvider clientId="156132258453-ivt9um9u31hvmo775bvlbe6k0gkqrd7n.apps.googleusercontent.com">
    <Context>
      <App />
      </Context>
    </GoogleOAuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
