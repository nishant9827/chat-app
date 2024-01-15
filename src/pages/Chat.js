import React,{useState,useEffect,useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import {io} from 'socket.io-client';
import styled from 'styled-components';
import axios from 'axios';
import Contacts from './Contacts';
import Welcome from './Welcome';
import ChatContainer from './ChatContainer';

const Chat = () => {
  const socket = useRef();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);
  const fetchData = async () => {
    try {
      if (!localStorage.getItem('userData')) {
        navigate('/login');
      } else {
        const userData = await JSON.parse(localStorage.getItem('userData'));
        setCurrentUser(userData);
        setIsLoaded(true)
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  const fetchContacts = async () => {
    try {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          const { data } = await axios.get(`https://chat-app-api-9yr1.vercel.app/allUsers/${currentUser._id}`);
          setContacts(data);
        } else {
          navigate('/setAvatar');
        }
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };
  useEffect(()=>{
    if(currentUser){
      socket.current = io('https://chat-app-api-9yr1.vercel.app');
      socket.current.emit("add-user",currentUser._id);
    }
  },[currentUser]);
  useEffect(()=>{
    fetchData();
  },[])
  useEffect(()=>{
    fetchContacts();
  },[currentUser])
  // console.log(currentUser);
  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <Container>
      <div className="container">
        <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChange} />
        {isLoaded && currentChat === undefined? (
          <Welcome currentUser={currentUser} />
        ) : (
          currentUser &&
          <ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket}/>
        )}
      </div>
    </Container>
  );
};

const Container = styled.div`
  box-sizing:border-box;
  height:100vh;
  width:100vw;
  display:flex;
  flex-direction:column;
  justify-content:center;
  gap:1rem;
  align-items:center;
  background-color:#131324;
  .container{
    height:85vh;
    width:85%;
    background-color:#00000076;
    display:grid;
    grid-template-columns:25% 75%;
    padding:0;
    @media screen and (min-width:720px) and (max-width:1080px){
      grid-template-columns:35% 65%; 
    }
  }
`;

export default Chat;
