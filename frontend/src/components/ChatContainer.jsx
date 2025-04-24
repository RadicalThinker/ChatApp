import { useChatStore } from "../store/useChatStore";

import { useEffect, useRef, useState } from "react";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime, isSameDay, formatDateDivider } from "../lib/utils";
import ImageModal from "./ImageModal.tsx";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authuser } = useAuthStore();
  const messageEndRef = useRef(null);
  
  // State for the image modal
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  // Function to handle image clicks
  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setModalOpen(false);
    setSelectedImage(null);
  };

  useEffect(() => {
    getMessages(selectedUser._id);

    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  // Function to render messages with date dividers
  const renderMessagesWithDateDividers = () => {
    let result = [];
    let lastMessageDate = null;
    
    messages.forEach((message, index) => {
      // Check if we need to add a date divider
      if (!lastMessageDate || !isSameDay(message.createdAt, lastMessageDate)) {
        // Add a date divider
        result.push(
          <div key={`date-divider-${message.createdAt}`} className="flex justify-center my-4">
            <div className="bg-base-300 text-xs px-3 py-1 rounded-full text-base-content/70 font-medium">
              {formatDateDivider(message.createdAt)}
            </div>
          </div>
        );
      }
      
      // Add the message
      result.push(
        <div
          key={message._id ? `${message._id}-${index}` : `msg-${index}`}
          className={`chat ${message.senderId === authuser.user._id ? "chat-end" : "chat-start"}`}
          ref={index === messages.length - 1 ? messageEndRef : null}
        >
          <div className=" chat-image avatar">
            <div className="size-10 rounded-full border">
              <img
                src={
                  message.senderId === authuser.user._id
                    ? authuser.user.profilePicture || "/avatar.png"
                    : selectedUser.profilePicture || "/avatar.png"
                }
                alt="profile pic"
              />
            </div>
          </div>
          <div className="chat-header mb-1">
            <time className="text-xs opacity-50 ml-1">
              {formatMessageTime(message.createdAt)}
            </time>
          </div>
          <div className="chat-bubble flex flex-col">
            {message.image && (
              <img
                src={message.image}
                alt="Attachment"
                className="sm:max-w-[200px] rounded-md mb-2 cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => handleImageClick(message.image)}
              />
            )}
            {message.text && <p>{message.text}</p>}
          </div>
        </div>
      );
      
      // Update last message date
      lastMessageDate = message.createdAt;
    });
    
    return result;
  };

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {renderMessagesWithDateDividers()}
      </div>

      {/* Image Modal */}
      <ImageModal 
        isOpen={modalOpen} 
        onClose={closeModal} 
        imageUrl={selectedImage} 
      />

      <MessageInput />
    </div>
  );
};
export default ChatContainer;