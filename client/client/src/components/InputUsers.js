import React, {Fragment, useState} from "react";

const InputUser = () => {

	const [rut, setRut, nombres, setNombres, apellidos, setApellidos, email, setEmail, contrasena, setContrasena, date, setDate] = useState ("");
	const onSubmitForm = async e => {
		e.preventDefault();
		try {
			const body = { rut, nombres, apellidos, email, contrasena, date };
			await fetch("http://localhost:3001/users", {method: "POST", headers: {"content-type": "application/json"}, body: JSON.stringify(body)})
			window.location = "/";
		} catch (err) {
			console.log(err.message);
		}
	}
	return (
	<Fragment>
		<h1 className="text-center my-5">Usuarios</h1>
		<form className="d-flex" onSubmit={onSubmitForm}>
			<input type="text" placeholder="RUT..." className="form-control" value={rut} onChange={e => setRut(e.target.value)}/>
		</form>
		<br></br>
		<form className="d-flex" onSubmit={onSubmitForm}>
			<input type="text" placeholder="Nombres..." className="form-control" value={nombres} onChange={e => setNombres(e.target.value)}/>
		</form>
		<br></br>
		<form className="d-flex" onSubmit={onSubmitForm}>
			<input type="text" placeholder="Apellidos..." className="form-control" value={apellidos} onChange={e => setApellidos(e.target.value)}/>
		</form>
		<br></br>
		<form className="d-flex" onSubmit={onSubmitForm}>
			<input type="text" placeholder="Correo..." className="form-control" value={email} onChange={e => setEmail(e.target.value)}/>
		</form>
		<br></br>
		<form className="d-flex" onSubmit={onSubmitForm}>
			<input type="password" placeholder="Contraseña..." className="form-control" value={contrasena} onChange={e => setContrasena(e.target.value)}/>
		</form>
		<br></br>
		<form className="d-flex" onSubmit={onSubmitForm}>
			<input type="date" placeholder="Fecha de inicio..." className="form-control" value={date} onChange={e => setDate(e.target.value)}/>
		</form>
		<button>Agregar</button>
	</Fragment>
	);
};

export default InputUser;