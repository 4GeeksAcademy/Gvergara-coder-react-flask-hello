import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
	const navigate = useNavigate()
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto">
					<>
						<button className="btn btn-primary me-4"
							onClick={() => { navigate("/login") }}
						>Login</button>

						<button className="btn btn-success"
						onClick={() => { navigate("/register") }}
						>Register</button>
					</>
				</div>

			</div>
		</nav>
	);
};