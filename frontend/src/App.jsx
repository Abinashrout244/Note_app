import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Body from "./components/Body";
import Dashboard from "./components/Dashboard";
import Auth from "./components/Auth";
import ProfileEdit from "./components/ProfileEdit";
import { Provider } from "react-redux";
import Store from "./utils/Store";
import ProtectedRoute from "./utils/ProtectedRoute";
import ThemeProvider from "./utils/ThemeContext";
import { Toaster } from "react-hot-toast";
import Error from "./utils/Error";
import ChatBot from "./components/Chat";
import Community from "./components/Community";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import ChangePassword from "./components/ChangePassword";

function App() {
  return (
    <Provider store={Store}>
      <ThemeProvider>
        <BrowserRouter basename="/">
          <Toaster position="bottom-right" />
          <Routes>
            <Route path="/" element={<Body />}>
              <Route
                index
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />

              <Route
                path="profile"
                element={
                  <ProtectedRoute>
                    <ProfileEdit />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="login" element={<Auth />} />
            <Route path="*" element={<Error />} />
            <Route
              path="community"
              element={
                <ProtectedRoute>
                  <Community />
                </ProtectedRoute>
              }
            />
            <Route
              path="chat"
              element={
                <ProtectedRoute>
                  <ChatBot />
                </ProtectedRoute>
              }
            />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route
              path="/change-password"
              element={
                <ProtectedRoute>
                  <ChangePassword />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
