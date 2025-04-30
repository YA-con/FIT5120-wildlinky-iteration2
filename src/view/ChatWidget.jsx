import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import styles from "./ChatWidget.module.css";
import MovaBanner from "../assets/mova-banner.svg";
import BotAvatar from "./BotAvatar";

const ChatWidget = () => {
  const messagesEndRef = useRef(null);

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showOptions, setShowOptions] = useState(true); // NEW

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, loading, isOpen]);

  const handleSend = async (customInput = null) => {
    const messageToSend = customInput !== null ? customInput : input;
    if (!messageToSend.trim()) return;

    const newMessages = [...messages, { text: messageToSend, sender: "user" }];
    setMessages(newMessages);
    setInput("");
    setShowOptions(false);
    setLoading(true);

    try {
      const response = await axios.post("http://127.0.0.1:5000/api/chat", {
        message: messageToSend,
      });
      setMessages([
        ...newMessages,
        { text: response.data.reply, sender: "bot" },
      ]);
    } catch (err) {
      console.error(err);
      setMessages([
        ...newMessages,
        { text: "Error, please try again later...", sender: "bot" },
      ]);
    }
    setLoading(false);
  };

  const handleOptionClick = (optionText) => {
    handleSend(optionText);
    setShowOptions(false);
  };

  const handleOpenChat = () => {
    setIsOpen(true);
    if (messages.length === 0) {
      setMessages([
        {
          sender: "bot",
          text: "Hi, welcome back!\nMay I help you?",
        },
      ]);
    }
    setShowOptions(true);
  };

  return (
    <div className={styles.chatWidget}>
      {!isOpen && (
        <button className={styles.toggleButton} onClick={handleOpenChat}>
          <BotAvatar />
        </button>
      )}

      {isOpen && (
        <div className={styles.chatBox}>
          <div className={styles.header}>
            <div className={styles.avatar}>
              <img
                src={MovaBanner}
                alt="Bot Avatar"
                className={styles.avatarImg}
              />
            </div>
            <div className={styles.title}>Chat with Koala</div>
            <div className={styles.more}>⋯</div>
          </div>

          <button
            className={styles.closeButton}
            onClick={() => setIsOpen(false)}
          >
            ×
          </button>

          <div className={styles.messages}>
             {messages.map((msg, idx) => (
              <React.Fragment key={idx}>
                <div className={styles.messageRow}>
                  {msg.sender === "bot" && (
                    <div className={styles.avatarBubble}>
                      <BotAvatar />
                    </div>
                  )}
                  <div
                    className={msg.sender === "user" ? styles.user : styles.bot}
                  >
                    {msg.text.split("\n").map((line, i) => (
                      <div key={i}>{line}</div>
                    ))}
                  </div>
                </div>
                {idx === 0 && showOptions && (
                  <div className={styles.optionsArea}>
                    <div
                      className={styles.optionBubble}
                      onClick={() =>
                        handleOptionClick("Endangered species information")
                      }
                    >
                      Endangered species information
                    </div>
                    <div
                      className={styles.optionBubble}
                      onClick={() => handleOptionClick("Protection Policy")}
                    >
                      Protection Policy
                    </div>
                  </div>
                )}
              </React.Fragment>
            ))}

            {loading && (
              <div className={styles.messageRow}>
                <div className={styles.avatarBubble}>
                  <BotAvatar />
                </div>
                <div className={styles.bot}>Typing...</div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className={styles.inputArea}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type a message..."
            />
            <button onClick={() => handleSend()}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
