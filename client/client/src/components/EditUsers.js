import React, {Fragment, useState} from "react";

const EditUser = ({user}) => {

	const editText = async (id_usuario) => {
		try {

			const body = {nombres, apellidos, rut, email, contrasena, trabaja_desde_fecha}
			await fetch(`http://localhost:3001/users/${id_usuario}`, {
				method: "PUT",
				headers: {"Content-Type": "application/json"},
				body: JSON.stringify(body)
			});

			window.location = "/";
		} catch (err) {
			console.error(err.message)
		}
	}

	const [nombres, setNombres, id_usuario, setID] = useState (user.id_usuario, user.rut, user.nombres, user.apellidos, user.email);
	return ( <Fragment>
	<button
	  type="button"
	  className="btn btn-warning"
	  data-bs-toggle="modal"
	  data-bs-target={`#id_usuario${user.id_usuario}`}
	>
	  Editar
	</button>

	<div
	  className="modal"
	  id_usuario={`id_usuario${user.id_usuario}`}
	  onClick={() => setNombres(user.nombres)}
	>
	  <div className="modal-dialog">
		<div className="modal-content">
		  <div className="modal-header">
			<h4 className="modal-title">Editar Usuario</h4>
			<button
			  type="button"
			  className="close"
			  data-bs-dismiss="modal"
			  onClick={() => setNombres(user.nombres)}
			>
			  &times;
			</button>
		  </div>

		  <div className="modal-body">
			<input
			  type="text"
			  className="form-control"
			  value={nombres}
			  onChange={e => setNombres(e.target.value)}
			/>
		  </div>

		  <div className="modal-footer">
			<button
			  type="button"
			  className="btn btn-warning"
			  data-bs-dismiss="modal"
			  onClick={() => editText(user.id_usuario)}
			>
			  Edit
			</button>
			<button
			  type="button"
			  className="btn btn-danger"
			  data-bs-dismiss="modal"
			  onClick={() => setID(user.id_usuario)}
			>
			  Close
			</button>
		  </div>
		</div>
	  </div>
	</div>
  </Fragment> )
  }
export default EditUser;