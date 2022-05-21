import React, { useEffect, useState } from "react";
import { Input } from "antd";
import "antd/dist/antd.css";
import "font-awesome/css/font-awesome.min.css";
import Header from "./Header";
import Messages from "./Messages";
import List from "./List";
import {
  ChatContainer,
  StyledContainer,
  ChatBox,
  StyledButton,
  SendIcon,
} from "../pages/chat/styles";

function ChatRoom(props) {
  const { username, room, joinData } = props; //Fetch from strapi
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);

  // useEffect(() => {
  //   if (Object.keys(joinData).length > 0) {
  //     setMessages([joinData]);

  //     socket.on("message", (message, error) => {
  //       setMessages((msgs) => [...msgs, message]);
  //     });

  //     socket.on("roomInfo", (users) => {
  //       setUsers(users);
  //     });
  //   } else {
  //     history.push("/join");
  //   }
  // }, [joinData]);

  const sendMessage = (message) => {
    if (message) {
      socket.emit(
        "sendMessage",
        { userId: joinData.userData.id, message },
        (error) => {
          if (error) {
            alert(error);
            history.push("/join");
          }
        }
      );
      setMessage("");
    } else {
      alert("Message can't me empty");
    }
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleClick = () => {
    sendMessage(message);
  };

  return (
    <ChatContainer>
      <Header room={room} />
      <StyledContainer>
        <List users={users.users} />
        <ChatBox>
          <Messages messages={messages} username={username} />
          <Input
            type="text"
            placeholder="Type your message"
            value={message}
            onChange={handleChange}
          />
          <StyledButton onClick={handleClick}>
            <SendIcon>
              <i className="fa fa-paper-plane" />
            </SendIcon>
          </StyledButton>
        </ChatBox>
      </StyledContainer>
    </ChatContainer>
  );
}

export default ChatRoom;
