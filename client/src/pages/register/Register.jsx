import React,{useState} from "react";
import PropTypes from 'prop-types';
import "./register.scss";
import { textAlign } from "@mui/system";

async function registerUser(credentials) {
	return fetch('http://localhost:5000/registrar_usuario', {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json'
	},
	body: JSON.stringify(credentials)
	})
	.then(data => data.json())
	}

export default function Register({setToken}) {
	const [nombres, setNames] = useState();
	const [apellidos, setSecondNames] = useState();
	const [rut, setRut] = useState();
	const [email, setEmail] = useState();
	const [contrasena, setPassword] = useState();
	
	const handleSubmit = async e => {
	e.preventDefault();
	const token = await registerUser({
		nombres,
		apellidos,
		rut,
		email,
		contrasena
	});
	setToken(token);
	}

	const onSubmitForm = async e => {
	e.preventDefault();
	try {
		const body = { email, contrasena };
		await fetch("http://localhost:5000/iniciar_sesion", {method: "POST", headers: {"content-type": "application/json"}, body: JSON.stringify(body)})
		window.location = "/iniciar_sesion";
	} catch (err) {
		console.log(err.message);
	}
}

	return (
	<div className="login-wrapper">
		<img src ="https://cdn.shopify.com/s/files/1/0554/4892/8441/files/Nuevo_600x.png?v=1626894264" alt = "" />
		<h1>Inicie Sesión</h1>
		<form onSubmit={handleSubmit}>
		<label>
			<p>Correo Electrónico</p>
			<input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} />
		</label>
		<label>
			<p>Contraseña</p>
			<input type="password" className="form-control" value={contrasena} onChange={e => setPassword(e.target.value)} />
		</label>
		<div classname= "badge">
			<button type="submit" style = {{color:"Black",textAlign:"center"}} >Ingresar</button>
		</div>
		</form>
	</div>
	);

}
Register.propTypes = {
	setToken: PropTypes.func.isRequired
}