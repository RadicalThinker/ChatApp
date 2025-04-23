import { create } from "zustand";
import { axiosinstance } from "../lib/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL = "http://localhost:5000";
export const useAuthStore = create((set,get) => ({
    authuser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    socket: null,
    onlineUsers: [],

    checkAuth: async () => {
        try {
            const res = await axiosinstance.get('/auth/protected')
            set({ authuser: res.data})
            toast.success("Logged in successfully")
            get().connectSocket()
        } catch (error) {
            set({ authuser: null })
            console.log(error)
        } finally {
            set({ isCheckingAuth: false })
        }
    },

    signup: async (data) => {
        try {
            set({ isSigningUp: true })
            const res = await axiosinstance.post('/auth/signup', data)
            set({ authuser: res.data })
            toast.success("Account created successfully")
            get().connectSocket()
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            set({ isSigningUp: false })
        }
    },

    logout: async () => {
        try {
          await axiosinstance.post("/auth/logout");
          set({ authuser: null });
          toast.success("Logged out successfully");
          get().disconnectSocket();
        } catch (error) {
          toast.error(error.response.data.message);
        }
      },

    login: async (data) => {
        try {
            set({ isLoggingIn: true })
            const res = await axiosinstance.post('/auth/login', data)
            set({ authuser: res.data })
            toast.success("Logged in successfully")
            get().connectSocket()
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            set({ isLoggingIn: false })
        }
    },

    updateProfile: async (data) => {
        try {
            set({ isUpdatingProfile: true })
            console.log(data)
            const res = await axiosinstance.put('/auth/update-profile', data)
            set({ authuser: res.data })
            toast.success("Profile updated successfully")
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            set({ isUpdatingProfile: false })
        }

    }
    ,
    connectSocket: () => {
        const { authuser } = get()
        if (!authuser || get().socket?.connected) return
        // console.log("auth id", authuser.user._id)
        const socket = io(BASE_URL, {
            query: {
                userId: authuser.user._id,
            },
            autoConnect: true  // This is default but explicitly setting it
        })
        
        // Set up event listeners before setting the socket in state
        socket.on("connect", () => {
            console.log("Socket connected successfully")
        })
        
        socket.on("getOnlineUsers", (userIds) => {
            console.log("Online users received:", userIds)
            set({ onlineUsers: userIds })
        })
        
        // Save the socket instance
        set({ socket: socket })
    },
    
    disconnectSocket: () => {
        if (get().socket?.connected) {
            get().socket.disconnect()
            set({ socket: null })
        }
    },
}));