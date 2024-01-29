import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';import { Row, Col, Container } from 'react-bootstrap';
import WaitingRoom from './components/waitingroom';
import { useState } from 'react';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';


function App() {
  const[conn,setConnection] = useState();
  const joinChatRoom = async (username,chatroom) => {
    try {
      //initiate a connection
      const conn = new HubConnectionBuilder()
                    .withUrl("https://localhost:7135/")
                    .configureLogging(LogLevel.Information)
                    .build();

      //set up builder
      conn.on("JoinSpecificChatRoom",(username,msg) => {
        console.log("msg: ",msg);
      })

      await conn.start();
      await conn.Invoke("JoinSpecificChatRoom",{username,chatroom});

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
          <WaitingRoom joinChatRoom={joinChatRoom}></WaitingRoom>
        </Container>
      </main>
    </div>
  );
}

export default App;
