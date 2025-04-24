// User types
export interface User {
  _id: string;
  email: string;
  username: string;
  profilePicture?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthUser {
  user: User;
}

// Message types
export interface Message {
  _id: string;
  senderId: string;
  receiverId: string;
  text?: string;
  image?: string;
  createdAt: string;
  updatedAt?: string;
}

// Store types
export interface ChatStore {
  messages: Message[];
  users: User[];
  selectedUser: User | null;
  isUsersLoading: boolean;
  isMessagesLoading: boolean;
  getUsers: () => Promise<void>;
  getMessages: (userId: string) => Promise<void>;
  sendMessage: (messageData: { text?: string; image?: string }) => Promise<void>;
  subscribeToMessages: () => void;
  unsubscribeFromMessages: () => void;
  setSelectedUser: (user: User | null) => void;
}

export interface AuthStore {
  authuser: AuthUser | null;
  isSigningUp: boolean;
  isLoggingIn: boolean;
  isUpdatingProfile: boolean;
  isCheckingAuth: boolean;
  socket: any;
  onlineUsers: string[];
  checkAuth: () => Promise<void>;
  signup: (data: { username: string; email: string; password: string }) => Promise<void>;
  login: (data: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: { profilePicture?: string }) => Promise<void>;
  connectSocket: () => void;
  disconnectSocket: () => void;
}

export interface ThemeStore {
  theme: string;
  setTheme: (theme: string) => void;
}