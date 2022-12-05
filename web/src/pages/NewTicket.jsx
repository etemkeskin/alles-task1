import React from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

const NewTicket = () => {
  const navigate = useNavigate();

  const subjectInputRef = useRef();
  const messageInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredSubject = subjectInputRef.current.value;
    const enteredMessage = messageInputRef.current.value;

    async function postNewTicket() {
      try {
        let response = await fetch("http://127.0.0.1:5000/tickets", {
          method: "POST",
          mode: "cors",
          body: JSON.stringify({
            subject: enteredSubject,
            message: enteredMessage,
          }),
          headers: {
            "Content-Type": "application/json",
            user: localStorage.getItem("userId")
          },
        });
        return response.json();
      } catch (e) {
        return null;
      }
    }

    const response = postNewTicket().then((payload) => {
      if (payload.success) {
        navigate("/");
      } else {
        navigate("/login");
      }
    });
  };

  return (
    <>
      <div className="container mt-3">
        <h3>New Ticket</h3>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="formBasicName" className="mb-2">
            <Form.Label>Subject</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter subject"
              ref={subjectInputRef}
            />
          </Form.Group>
          <Form.Group controlId="formBasicSurname">
            <Form.Label>Message</Form.Label>
            <Form.Control
              type="text"
              placeholder="Message"
              ref={messageInputRef}
            />
          </Form.Group>
          <br />
          <Button variant="primary" type="submit" className="float-right">
            Create New Ticket
          </Button>
        </Form>
      </div>
    </>
  );
};

export default NewTicket;
