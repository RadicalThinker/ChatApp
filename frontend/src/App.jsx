import { useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import { useAuthStore } from "./store/useAuthStore";
import { Loader } from "lucide-react";
import { useThemeStore } from "./store/useThemeStore";
import { useCustomNavigate } from "./hooks/useCustomNavigate";

function App() {
  const { authuser, checkAuth, isCheckingAuth } = useAuthStore();
  const { theme } = useThemeStore();
  // Setup the navigation function
  useCustomNavigate();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log(authuser);

  if (isCheckingAuth && !authuser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  return (
    <div data-theme={theme} className="App">
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            authuser ? (
              <HomePage key="home" />
            ) : (
              <Navigate to="/login" key="redirect-login" />
            )
          }
        />
        <Route
          path="/login"
          element={
            authuser ? (
              <Navigate to="/" key="redirect-home" />
            ) : (
              <LoginPage key="login" />
            )
          }
        />
        <Route
          path="/signup"
          element={
            authuser ? (
              <Navigate to="/" key="redirect-home-signup" />
            ) : (
              <SignupPage key="signup" />
            )
          }
        />
        <Route
          path="/profile"
          element={
            authuser ? (
              <ProfilePage key="profile" />
            ) : (
              <Navigate to="/login" key="redirect-login-profile" />
            )
          }
        />
        <Route
          path="/settings"
          element={
            authuser ? (
              <SettingsPage key="settings" />
            ) : (
              <Navigate to="/login" key="redirect-login-settings" />
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;
