import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';import { Row, Col, Container } from 'react-bootstrap';
import WaitingRoom from './components/waitingroom';


function App() {
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
          <WaitingRoom></WaitingRoom>
        </Container>
      </main>
    </div>
  );
}

export default App;
