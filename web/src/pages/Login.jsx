import React from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

const Login = () => {
  const navigate = useNavigate();

  const nameInputRef = useRef();
  const passwordInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    async function postLogin() {
      try {
        let response = await fetch("http://127.0.0.1:5000/auth/login", {
          method: "POST",
          mode: "cors",
          body:JSON.stringify({
            name: enteredName,
            password: enteredPassword
          }),
          headers:{
            'Content-Type':'application/json'
          }
        });
        return response.json();
      } catch (e) {
        return null;
      }
    }
    
    const response = postLogin().then(payload => {
        if (payload.success) {
            localStorage.setItem('name', payload.data.name);
            localStorage.setItem('userId', payload.data._id);
            localStorage.setItem('role', payload.data.role);
            console.log(payload.data._id);
            navigate('/');
        }else{
            navigate('/login');
        }
    });   
  };

  return (
    <>
      <div className="container mt-3">
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              ref={nameInputRef}
            />
          </Form.Group>
          <Form.Group controlId="formBasicSurname">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              ref={passwordInputRef}
            />
          </Form.Group>
          <br />
          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
      </div>
    </>
  );
};

export default Login;
