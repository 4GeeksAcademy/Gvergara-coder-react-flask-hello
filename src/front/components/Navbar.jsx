import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {
	const { store, dispatch } = useGlobalReducer()
	const navigate = useNavigate()

	useEffect(() => {

	}, [store.currenUser])
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto">
					{store.currenUser == null &&
						<>
							<button className="btn btn-primary me-4"
								onClick={() => { navigate("/login") }}
							>Login</button>

							<button className="btn btn-success"
								onClick={() => { navigate("/register") }}
							>Register</button>

						</>
					}
					{store.currenUser &&
						<button className="btn btn-danger"
							onClick={() => {
								localStorage.removeItem("token")
								dispatch({
									type: "set_current_user",
									payload: null
								})
								navigate("/")
							}}
						>Logout</button>
					}
				</div>

			</div>
		</nav>
	);
};