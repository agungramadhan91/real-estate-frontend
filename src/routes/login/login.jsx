import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import apiRequest from "../../lib/apiRequest";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

function Login() {
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const {updateUser} = useContext(AuthContext);
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError("");

		const formdata = new FormData(e.target);

		const username = formdata.get("username");
		const password = formdata.get("password");

		try {
			const res = await apiRequest.post(
				"/auth/login",
				{
					username,
					password,
				}
			);

			updateUser(res.data);
			navigate("/");
		} catch (error) {
			console.log(error);
			setError(error.response.data.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="login">
			<div className="formContainer">
				<form onSubmit={handleSubmit}>
					<h1>Welcome back</h1>
					<input name="username" required type="text" placeholder="Username" minLength={3} maxLength={20} />
					<input name="password" required type="password" placeholder="Password" />
					<button disabled={loading} >Login</button>
					{error && <span>{error}</span>}
					<Link to="/register">{"Don't"} you have an account?</Link>
				</form>
			</div>
			<div className="imgContainer">
				<img src="/bg.png" alt="" />
			</div>
		</div>
	);
}

export default Login;
