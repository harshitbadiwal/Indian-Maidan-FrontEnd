import React, { useState } from "react";
import Avatar from "boring-avatars";
import styles from "./Messages.module.scss";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";

const Messages = () => {
  const [chats, setChats] = useState([
    {
      id: 1,
      name: "Harshit Badiwal (You)",
      messages: [
        { sender: "Harshit Badiwal", text: "Hello!", time: "10:00 AM" },
        { sender: "You", text: "Hey! What's up?", time: "10:05 AM" },
      ],
    },
    {
      id: 2,
      name: "Testing",
      messages: [{ sender: "Testing", text: "Check this out!", time: "09:29 AM" }],
    },
    {
      id: 3,
      name: "Happy",
      messages: [{ sender: "Happy", text: "Hardik: 1) Old post edit done 2) Valid...", time: "18:08 PM" }],
    },
    {
      id: 4,
      name: "Mad Peoples 😉😊😅",
      messages: [{ sender: "Happy", text: "Waah!", time: "14:49 PM" }],
    },
    {
      id: 5,
      name: "Darshan",
      messages: [{ sender: "Darshan", text: "Pure din Pareshan mat kiya kar", time: "11:13 AM" }],
    },
  ]);

  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState("");

  const handleChatClick = (chat) => {
    setSelectedChat(chat);
  };

  const handleSendMessage = () => {
    if (selectedChat && message.trim()) {
      const newMessage = { sender: "You", text: message, time: "Now" };

      const updatedChats = chats.map((chat) =>
        chat.id === selectedChat.id
          ? { ...chat, messages: [...chat.messages, newMessage] }
          : chat
      );

      setChats(updatedChats);
      setSelectedChat(updatedChats.find((chat) => chat.id === selectedChat.id));
      setMessage("");
    }
  };

  return (
    <div className={styles.mainConatiner}>
      {/* Header */}
      <div style={{ borderBottom: "2px solid white" }}>
        <Header />
      </div>

      <div className={styles.container}>
        {/* Sidebar */}
        <div className={styles.sidebar}>
          <div className={styles.chatList}>
            {chats.map((chat) => (
              <div key={chat.id} className={styles.chatItem} onClick={() => handleChatClick(chat)}>
                <Avatar size={40} name={chat.name} variant="beam" />
                <div className={styles.chatContent}>
                  <span className={styles.chatName}>{chat.name}</span>
                  <span className={styles.chatMessage}>{chat.messages[chat.messages.length - 1]?.text}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Chat Area */}
        <div className={styles.mainContent}>
          {selectedChat ? (
            <div className={styles.chatWindow}>
              {/* Chat Header */}
              <div className={styles.chatHeader}>
                <Avatar size={40} name={selectedChat.name} variant="beam" />
                <h2 className={styles.chatTitle}>{selectedChat.name}</h2>
              </div>

              {/* Messages */}
              <div className={styles.messagesContainer}>
                {selectedChat.messages.map((msg, index) => (
                  <div key={index} className={`${styles.message} ${msg.sender === "You" ? styles.sent : styles.received}`}>
                    <p className={styles.messageText}>{msg.text}</p>
                    <span className={styles.messageTime}>{msg.time}</span>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className={styles.messageInput}>
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                />
                <button onClick={handleSendMessage}>Send</button>
              </div>
            </div>
          ) : (
            <div className={styles.emptyState}>
              <p>Select a chat to start messaging</p>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Messages;
