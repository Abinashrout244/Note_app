import { createRoot } from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";

import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="23717391573-vp0tu4e7vk1goaacnvmkrs25r3kvd8o8.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>,
);
