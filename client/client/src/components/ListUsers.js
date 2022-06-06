import React, {Fragment, useState, useEffect} from "react";
import EditUser from "./EditUsers";

const ListUsers = () => {

	const [users, setUsers] = useState([]);

	// deleteUser func:

	async function deleteUser(rut) {
		try {
			await fetch(`http://localhost:3001/users/${rut}`, {
				method: "DELETE"
			});

			setUsers(users.filter(user => user.rut !== rut));
		} catch (err) {
			console.error(err.message);
		}
	}

	async function getUsers() {
		const res = await fetch("http://localhost:3001/users");

		const userArray = await res.json();
		
		setUsers(userArray);
	}

	useEffect(() => {
		getUsers();
	}, [])

	return (
		<Fragment>
		{" "}
		<h3> <table className="table">
		<thead>
		<tr>
		  <th>RUT</th>
		  <th>Nombres</th>
		  <th>Apellidos</th>
		  <th>Correo</th>
		  <th>Trabaja desde</th>
		</tr>
		</thead>
		<tbody>
		{
			users.map(user => (
				<tr key={user.rut}>
				<td>{user.rut}</td>
				<td>{user.nombres}</td>
				<td>{user.apellidos}</td>
				<td>{user.email}</td>
				<td>{user.trabaja_desde_fecha}</td>
				<td><EditUser user={user}/></td>
				<td><button className="btn btn-danger" onClick={() => deleteUser(user.rut)}>Eliminar</button></td>
				</tr>
			))
		}
		</tbody>
	  </table> </h3>
	  
	  </Fragment>
	)
}

export default ListUsers;
