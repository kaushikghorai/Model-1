import Header from './Header.js';
import Footer from './Footer.js';
import './App.css';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Registration from './Registration.js';
import Show_users from './Show_users.js';
import Products from './Products.js';
function Sidebar() {
  return (
    <div class="sidebar">
      <h2>This is a sidebar section.</h2>
    </div>
  );
}


const Counter = () => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");
  return (
    <>
      <p>Counter: {count}</p>
      <button onClick={() => { setCount(count + 1) }}>Increment</button>
      <button onClick={() => { setCount(count - 1) }}>Decrement</button>
      <button onClick={() => { setCount(0) }}>Reset</button><br /><br />
      <input type="text" value={name} onChange={(e) => { setName(e.target.value) }} />
      <p>You typed: {name}</p>
    </>

  );
}

function Mainbody(props) {
  return (
    <div class="mainbody">
      <h1>This is my first react project.</h1>
      <p>Hello, {props.fname} {props.lname}!</p>
      <Counter></Counter>
    </div>
  );
}

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header></Header>
        <div class="main">
          <Sidebar></Sidebar>
          <Routes>
            <Route path="/" element={<Mainbody></Mainbody>}>Home</Route>
            <Route path="/about" element={<div><h1>Welcome to Our Company</h1><p>We are a team of dedicated professionals who strive to provide top-notch solutions to our customers. With years of experience in the industry, we have developed a reputation for excellence and reliability.</p></div>}>Homes | About Us</Route>
            <Route path="/gallery" element={<div><h1>Our Portfolio</h1></div>}>Gallery</Route>
            <Route path="/products" element={<Products></Products>}>Products</Route>
            <Route path="/show" element={<Show_users></Show_users>}>Show</Route>
            <Route path="/signup" element={<Registration></Registration>}>Registration</Route>

          </Routes>
        </div>
        <Footer></Footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
