import { Row,Col } from "react-bootstrap";
import MessageContainer from "./MessageContainer";

const ChatRoom = ({messages}) => <div>
    <Row className="ps-5 py-5">
        <Col sm={10}>
            <h2>ChatRoom</h2>
        </Col>

        <Col>
        </Col>
    </Row>
    <Row className="ps-5 py-5">
        <Col sm={12}>
            <MessageContainer messages = {messages}></MessageContainer>
        </Col>
    </Row>
</div>



export default ChatRoom;