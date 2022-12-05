import React from "react";
import { Table, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Tickets = () => {
  //   const navigation = useNavigation();
  const badge = {
    open: "badge badge-info",
    inprogress: "badge badge-warning",
    closed: "badge badge-dark",
  };
  const [tickets, setTickets] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const response = getAllTickets().then((payload) => {
      console.log(payload);

      if (payload.success) {
        setTickets(payload.data);
      }
    });
  }, []);

  async function getAllTickets() {
    try {
      let response = await fetch("http://127.0.0.1:5000/tickets", {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          user: localStorage.getItem("userId"),
        },
      });
      return response.json();
    } catch (e) {
      return null;
    }
  }

  return (
    <>
      <div className="container mt-3">
      <h3>Tickets</h3>
        <Button
          title="Done"
          className="float-right mb-2"
          onClick={() => {
            // Pass and merge params back to home screen
            navigate(`/newTicket`);
          }}
        >
          New Ticket
        </Button>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Subject</th>
              <th>Created Date</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket, index) => (
              <tr key={ticket._id}>
                <td>{index + 1}</td>
                <td>{ticket.subject}</td>
                <td>{ticket.createdAt}</td>
                <td>
                  <span className={badge[ticket.status]}>{ticket.status}</span>
                </td>
                <td>
                  <Button
                    title="Done"
                    onClick={() => {
                      // Pass and merge params back to home screen
                      navigate(`/ticket/${ticket._id}`);
                    }}
                  >
                    Detail
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default Tickets;
