import './Header.css';
function Header(){
	return(
		<>
			<div class="header-container">
                <a href="https://kaushikghorai.in" class="logo">Kaushik Ghorai<span>.</span></a>
                
                <div class="menu-toggle" id="mobile-menu">
                    <i class="fa-solid fa-bars"></i>
                </div>

                <nav>
                    <ul class="nav-menu">
                        <li><a href="https://kaushikghorai.in/" class="nav-link active">Home</a></li>
                        <li><a href="https://kaushikghorai.in/notes/" class="nav-link">Notes</a></li>
                        <li><a href="mailto:contact@kaushikghorai.in" class="btn-cta">Contact Me</a></li>
                    </ul>
                </nav>
            </div>
		</>
	);
}

export default Header;
