import { Link } from "react-router-dom";

export const Navbar = () => {

	function logout(){
		sessionStorage.removeItem('jwt-token');
		alert("Logged out!")
	}

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">Home</span>
				</Link>
				<div className="ml-auto">
					<Link to="/signup">
						<button className="btn btn-primary mx-3">Sign Up</button>
					</Link>
					<Link to="/login">
						<button className="btn btn-primary mx-3">Login</button>
					</Link>
					<Link to="/">
						<button className="btn btn-primary mx-3" onClick={()=>logout()}>Log Out</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};