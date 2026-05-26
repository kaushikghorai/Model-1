import './Header.css';
import {Link} from 'react-router-dom';
function Header(){
	return(
		<div class="myheader">
			<ul>
				<li><Link to="/">Home</Link></li>
				<li><Link to="/about">AboutUs</Link></li>
				<li><Link to="/gallery">Gallery</Link></li>
                <li><Link to="/products">Products</Link></li>
				<li><Link to="/signup">Sign Up></Link></li>
			</ul>	
		</div>
	);
}

export default Header;
