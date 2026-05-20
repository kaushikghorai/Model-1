import Header from './Header.js';
import Footer from './Footer.js';
import './App.css';

function Sidebar(){
	return(
		<div class="sidebar">
			<h2>This is a sidebar section.</h2>
		</div>
	);
}

function Mainbody(){
	return(
		<div class="mainbody">
			<h1>This is my first react project.</h1>
		</div>
	);
}

function App() {
  return (
	<div>
		<Header></Header>
		<div class="main">
		<Sidebar></Sidebar>
		<Mainbody></Mainbody>
		<Footer></Footer>
	</div>
  );
}

export default App;
