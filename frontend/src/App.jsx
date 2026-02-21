import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Body from "./components/Body";
import Dashboard from "./components/Dashboard";
import Auth from "./components/Auth";
import ProfileEdit from "./components/ProfileEdit";
import { Provider } from "react-redux";
import NoteStore from "./utils/NoteStore";
import ProtectedRoute from "./utils/ProtectedRoute";
import ThemeProvider from "./utils/ThemeContext";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <Provider store={NoteStore}>
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
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
