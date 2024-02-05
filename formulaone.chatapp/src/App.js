import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';import { Row, Col, Container } from 'react-bootstrap';
import WaitingRoom from './components/waitingroom';
import { useState } from 'react';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import ChatRoom from './components/ChatRoom';


function App() {
  const[conn,setConnection] = useState();
  const[messages,setMessages] = useState();

  const joinChatRoom = async (username,chatroom) => {
    try {
      //initiate a connection
      const conn = new HubConnectionBuilder()
                    .withUrl("https://localhost:7135/chat")
                    .configureLogging(LogLevel.Information)
                    .build(); 

      //set up builder
      conn.on("JoinSpecificChatRoom",(username,msg) => {
        console.log("msg: ",msg);
      })

      conn.on("RecieveSpecificMessage",(username,msg) => {
        setMessages(messages => [...messages, {username,msg}]);
      })

      await conn.start();
      await conn.invoke("JoinSpecificChatRoom",{username,chatroom});

      setConnection(conn);

    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div>
      <main>
        <Container>
          <Row class='px-5 my-5'>
            <Col sm='12'>
              <h1 className='font-weight-light'>
                Welcome to my F1 Chat App
              </h1>
            </Col>
          </Row>
          
          {
            !conn 
            ? <WaitingRoom joinChatRoom={joinChatRoom}></WaitingRoom>
            : <ChatRoom messages={messages}></ChatRoom>
          }
        </Container>
      </main>
    </div>
  );
}

export default App;
