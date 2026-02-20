import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Body from "./components/Body";
import Dashboard from "./components/Dashboard";
import Auth from "./components/Auth";
import ProfileEdit from "./components/ProfileEdit";
import { Provider } from "react-redux";
import NoteStore from "./utils/NoteStore";
import ProtectedRoute from "./utils/ProtectedRoute";

function App() {
  return (
    <Provider store={NoteStore}>
      <BrowserRouter basename="/">
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
    </Provider>
  );
}

export default App;
