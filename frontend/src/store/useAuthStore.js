import { create } from "zustand";
import { axiosinstance } from "../lib/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";
import { customNavigate } from "../hooks/useCustomNavigate";

const BASE_URL = import.meta.env.MODE ==="development"? "http://localhost:5000" : "/";
export const useAuthStore = create((set, get) => ({
  authuser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  socket: null,
  onlineUsers: [],

  checkAuth: async () => {
    try {
      const res = await axiosinstance.get("/auth/protected");
      set({ authuser: res.data });
      toast.success("Logged in successfully");
      get().connectSocket();
    } catch (error) {
      set({ authuser: null });
      console.log(error);
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    try {
      set({ isSigningUp: true });
      const res = await axiosinstance.post("/auth/signup", data);
      set({ authuser: res.data });
      toast.success("Account created successfully");
      get().connectSocket();
      // Navigate to home page after successful signup
      customNavigate("/", { replace: true });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  logout: async () => {
    try {
      // First, reset the chat store to clear all chat-related state
      const { resetState } = await import("./useChatStore").then((module) =>
        module.useChatStore.getState()
      );
      resetState();

      // Then disconnect socket
      get().disconnectSocket();

      // Clear auth state
      set({
        authuser: null,
        onlineUsers: [],
      });

      // Make API call to logout (do this after clearing state to ensure UI is responsive)
      await axiosinstance.post("/auth/logout");

      // Show success message
      toast.success("Logged out successfully");

      // Navigate to login page after logout
      customNavigate("/login", { replace: true });
    } catch (error) {
      toast.error(error.response.data.message || "Error during logout");
    }
  },

  login: async (data) => {
    try {
      set({ isLoggingIn: true });
      const res = await axiosinstance.post("/auth/login", data);
      set({ authuser: res.data });
      toast.success("Logged in successfully");
      get().connectSocket();
      // Navigate to home page after successful login
      customNavigate("/", { replace: true });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  updateProfile: async (data) => {
    try {
      set({ isUpdatingProfile: true });

      const res = await axiosinstance.put("/auth/update-profile", data);

      // Update only the user property while keeping the rest of authuser intact
      set((state) => ({
        authuser: {
          ...state.authuser,
          user: {
            ...state.authuser.user,
            profilePicture: res.data.user.profilePicture,
          },
        },
      }));

      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(error.response.data.message || "Failed to update profile");
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
  connectSocket: () => {
    const { authuser } = get();
    if (!authuser || get().socket?.connected) return;
    // console.log("auth id", authuser.user._id)
    const socket = io(BASE_URL, {
      query: {
        userId: authuser.user._id,
      },
      autoConnect: true, // This is default but explicitly setting it
    });

    // Set up event listeners before setting the socket in state
    socket.on("connect", () => {
      console.log("Socket connected successfully");
    });

    socket.on("getOnlineUsers", (userIds) => {
      console.log("Online users received:", userIds);
      set({ onlineUsers: userIds });
    });

    // Save the socket instance
    set({ socket: socket });
  },

  disconnectSocket: () => {
    if (get().socket?.connected) {
      get().socket.disconnect();
      set({ socket: null });
    }
  },
}));
