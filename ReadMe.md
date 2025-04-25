# Suno Sunao Chat Application

## 🚀 Overview

Suno Sunao is a modern, real-time chat application built with a React frontend and Node.js backend. The application enables users to connect instantly, share messages and images, and stay in touch with a clean, intuitive interface.

<!-- ![Suno Sunao Screenshot](./screenshots/app-preview.png) -->

## ✨ Features

- **Real-time messaging** powered by Socket.IO
- **User authentication** with JWT
- **Image sharing** capabilities with preview and modal view
- **Message date dividers** showing "Today", "Yesterday", or specific dates
- **Online user status** indicators
- **Responsive design** that works on mobile and desktop
- **Theme support** with light and dark modes
- **TypeScript integration** for type safety and better development experience

## 🛠️ Tech Stack

### Frontend
- React with TypeScript
- Zustand for state management
- TailwindCSS with DaisyUI for styling
- Socket.IO client for real-time communication
- React Router for navigation
- Axios for API requests

### Backend
- Node.js & Express
- MongoDB with Mongoose
- Socket.IO for WebSocket connections
- JSON Web Token for authentication
- Bcrypt for password hashing
- Multer for file uploads

## 📋 Prerequisites

- Node.js (v14.0.0 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- NPM or Yarn package manager

## 🚀 Installation & Setup

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/suno-sunao-chat.git
cd suno-sunao-chat
```

2. **Install dependencies**

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. **Environment Configuration**

Create `.env` files in both frontend and backend directories:

**Backend .env**
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/suno-sunao-chat
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

**Frontend .env**
```
VITE_API_BASE_URL=http://localhost:5000/api
```

4. **Run the application**

```bash
# Start backend server
cd backend
npm run dev

# In a new terminal, start frontend
cd frontend
npm run dev
```

The application should now be running at `http://localhost:5173`

## 📱 Usage

1. **Sign up** for a new account or log in with existing credentials
2. **Select a user** from the sidebar to start a conversation
3. **Send messages** using the message input at the bottom of the screen
4. **Share images** by clicking the attachment button
5. **View larger images** by clicking on image thumbnails in the chat

## 🔄 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Log in existing user
- `GET /api/auth/me` - Get current user info
- `POST /api/auth/logout` - Log out user

### Messages
- `GET /api/messages/:userId` - Get conversation with specific user
- `POST /api/messages/send-message/:receiverId` - Send message to user
- `GET /api/messages/users` - Get all users with conversations

## 👨‍💻 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- [Socket.IO](https://socket.io/) for real-time communication
- [React](https://reactjs.org/) for the UI library
- [TailwindCSS](https://tailwindcss.com/) for styling
- [DaisyUI](https://daisyui.com/) for UI components
- [MongoDB](https://www.mongodb.com/) for database
- [Express](https://expressjs.com/) for API framework

---

Created with ❤️ by Yash Vardhan Rawat

*Suno... Sunao... Stay connected 🔗*