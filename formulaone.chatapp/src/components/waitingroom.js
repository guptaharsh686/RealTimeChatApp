import { useState } from "react";
import { Form,Button, Col, FormControl, FormGroup, Row } from "react-bootstrap";

const WaitingRoom = ({joinChatRoom}) => {
    const[username,serUsername] = useState();
    const[chatroom,setChatroom] = useState();

    return <Form onSubmit={ e => {
        e.preventDefault();
        joinChatRoom(username,chatroom);
    }}>

        <Row className="px-5 py-5">
            <Col sm={12}>
                <FormGroup>
                    <FormControl placeholder="Username" onChange={e => serUsername(e.target.value)}></FormControl>
                    <FormControl placeholder="ChatRoom" onChange={e => serUsername(e.target.value)}></FormControl>
                </FormGroup>
            </Col>

            <Col sm={12}>
                <hr/>
                <Button variant="success" type="submit">Join</Button>
            </Col>
        </Row>
    </Form>
}


export default WaitingRoom;