import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Layout from "./components/Layout/Layout";
import Tickets from './pages/Tickets';
import Ticket from './pages/Ticket';
import NewTicket from './pages/NewTicket';


function App() {
  return (
    <BrowserRouter>
    <link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
  integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l"
  crossorigin="anonymous"
/>
      <Layout>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/tickets" element={<Tickets />}></Route>
          <Route exact path="/ticket/:id" element={<Ticket />}></Route>
          <Route exact path="/newTicket" element={<NewTicket />}></Route>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
