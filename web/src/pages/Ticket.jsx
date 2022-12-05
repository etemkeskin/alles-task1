import React from "react";
import { Card, Form, Button } from "react-bootstrap";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

const Ticket = () => {
  let { id } = useParams();
  const userId = localStorage.getItem("userId");
  const [messages, setMessages] = useState([]);

  const messageInputRef = useRef();
  const url = "http://127.0.0.1:5000/tickets/" + id;

  useEffect(() => {
    const response = getAllTickets().then((payload) => {
      console.log(payload);

      if (payload.success) {
        setMessages(payload.data.messages);
      }
    });
  }, []);
  
  async function getAllTickets() {
   
    try {
      let response = await fetch(url, {
        method: "GET",
        mode: "cors",
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

  /** New Message*/
  const submitHandler = (event) => {
    event.preventDefault();
    const enteredMessage = messageInputRef.current.value;

    async function postMessage() {
      try {
        let response = await fetch(url, {
          method: "PUT",
          mode: "cors",
          body:JSON.stringify({
            id:id, 
            message: enteredMessage,
          }),
          headers:{
            'Content-Type':'application/json',
            user: localStorage.getItem("userId")
          }
        });
        return response.json();
      } catch (e) {
        return null;
      }
    }
    
    const response = postMessage().then(payload => {
        if (payload.success) {
          setMessages([...messages, payload.data])
        }else{

        }
    });   
  };

  return (
    <>
      <div className="container mt-3">
        <h3>Ticket</h3>
        {messages.map((msg, index) => (
          <Card body className="mb-4">
            <strong>{msg.user === userId ? "You :" : "Supporter :"}</strong>{" "}
            {msg.message}
          </Card>
        ))}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="formBasicEmail" className="mb-2 mt-2">
            <Form.Label>Enter a new message</Form.Label>
            <Form.Control type="text" placeholder="Enter message" ref={messageInputRef} required/>
          </Form.Group>
          <div className="row col-12 justify-content-end">
            <Form.Group>
              <Button variant="info" type="submit">
                Send New Message
              </Button>
            </Form.Group>
          </div>
        </Form>
      </div>
    </>
  );
};

export default Ticket;
