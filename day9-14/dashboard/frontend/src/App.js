import Header from './Header.js';
import Footer from './Footer.js';
import './App.css';
import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Registration from './Registration.js';
import Show_users from './Show_users.js';
import Products from './Products.js';

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Dashboard Menu</h2>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About Us</Link></li>
        <li><Link to="/products">Products API</Link></li>
        <li><Link to="/show">Show Users</Link></li>
        <li><Link to="/signup">Sign Up</Link></li>
      </ul>
    </div>
  );
}

const Counter = () => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");
  return (
    <div className="counter-container">
      <p>Counter: {count}</p>
      <div className="btn-group">
        <button onClick={() => setCount(count + 1)}>Increment</button>
        <button onClick={() => setCount(count - 1)}>Decrement</button>
        <button onClick={() => setCount(0)}>Reset</button>
      </div>
      <br />
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Type preview name..." />
      {name && <p>You typed: {name}</p>}
    </div>
  );
}

function AboutUs() {
  return (
    <div className="about-us-container">
      <h1>About Our Portal</h1>
      <p className="lead">
        Welcome to Admin Flow! We are a team of dedicated professionals who strive to provide top-notch solutions to our customers. With years of experience in the industry, we have developed a reputation for excellence and reliability.
      </p>
      <div className="about-grid">
        <div className="about-card">
          <h3>Our Vision</h3>
          <p>Designing modern, accessible, and fast interfaces for administrative control of backend services and database operations.</p>
        </div>
        <div className="about-card">
          <h3>Portal Features</h3>
          <p>Equipped with theme customizers, visual analytics widgets, user registration systems, and third-party API listings.</p>
        </div>
      </div>
    </div>
  );
}

function Mainbody(props) {
  return (
    <div className="mainbody">
      <h1>This is my first react project.</h1>
      <p>Hello, {props.fname || "Kaushik"} {props.lname || "Ghorai"}!</p>
      <Counter></Counter>
    </div>
  );
}

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header></Header>
        <div className="main">
          <Sidebar></Sidebar>
          <Routes>
            <Route path="/" element={<Mainbody fname="Kaushik" lname="Ghorai"></Mainbody>} />
            <Route path="/about" element={<AboutUs></AboutUs>} />
            <Route path="/gallery" element={<div><h1>Our Portfolio</h1><p>Welcome to our highlights and company gallery.</p></div>} />
            <Route path="/products" element={<Products></Products>} />
            <Route path="/show" element={<Show_users></Show_users>} />
            <Route path="/signup" element={<Registration></Registration>} />
          </Routes>
        </div>
        <Footer></Footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
