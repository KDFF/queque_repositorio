const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const { request } = require("express");
const bcrypt = require('bcrypt')
const { PORT, JWT_SECRET } = require('./config')


// Middleware:
app.use(cors());
app.use(express.json()) // Used to access req.body with the info we need

app.listen(5000, () => {
	console.log("Server started on port 5000");
})

// Validate JWT tokens:
const authorization = async (req, res, next) => {
    try {
        // 1. Obtain the header token from request
        const jwToken = req.header("token")

        // 2. Return an error if there's no token
        if (!jwToken) {
            return res.status(403).json("No autorizado")
        }

        // 3. Validate the token and get the payload
        const payload = jwt.verify(jwToken, JWT_SECRET)

        // 4. Store the payload in req.user
        req.user = payload.user

        // 5. Continue with pipeline execution
        next()
    } catch (err) {
        console.error(err.message)
        return res.status(403).json("No autorizado")
    }
}

// ### JWT GENERATOR ### //

const jwt = require("jsonwebtoken")

const jwtSecret = JWT_SECRET;

const jwtGenerator = (userId) => {
	// Generate a JWT token
	if (userId) {
		const payload = {
			user: userId,
		}
		return jwt.sign(payload, jwtSecret, { expiresIn: "1hr" })
	}
	return "invalid token"
}

// ENCRYPT PASSWORD

const encrypt = async (contrasena) => {
	//  Encrypt password using bCrypt
	const saltRounds = 10
	const salt = await bcrypt.genSalt(saltRounds)
	const bcryptPassword = await bcrypt.hash(contrasena, salt)
	return bcryptPassword
}

// CHECK PASSWORD

const compare = async (plainPassword, contrasena) => {
	return await bcrypt.compare(plainPassword, contrasena)
}


// ### ROUTES ### //

// Get all users:

app.get("/usuarios", authorization, async (req, res) => {
	try {
		const allUsers = await pool.query("SELECT rut, nombres, apellidos, email, trabaja_desde_fecha FROM cakestore.Logins");

		res.json(allUsers.rows);
	} catch (err) {
		console.log(err.message);
	}

});

// Get a specific user:

app.get("/usuarios/:id", authorization, async (req, res) => {
	try {
		const { id } = req.params;
		const user = await pool.query("SELECT rut, nombres, apellidos, email, trabaja_desde_fecha FROM cakestore.Logins WHERE rut ILIKE $1 OR nombres ILIKE $1 OR apellidos ILIKE $1 OR email ILIKE $1 OR trabaja_desde_fecha::text ILIKE $1",
		['%' + id + '%']);
		res.json(user.rows);
	} catch (err) {
		console.error(err.message);
	}
});

// Get all clients:

app.get("/clientes", authorization, async (req, res) => {
	try {
		const allClients = await pool.query("SELECT rut, nombres, apellidos, email, fecha_de_nacimiento FROM cakestore.Clientes");

		res.json(allClients.rows);
	} catch (err) {
		console.log(err.message);
	}

});

// Get a specific client:

app.get("/clientes/:id", authorization, async (req, res) => {
	try {
		const { id } = req.params;
		const client = await pool.query("SELECT rut, nombres, apellidos, email, fecha_de_nacimiento FROM cakestore.Clientes WHERE rut ILIKE $1 OR nombres ILIKE $1 OR apellidos ILIKE $1 OR email ILIKE $1 OR fecha_de_nacimiento::text ILIKE $1",
		['%' + id + '%']);
		res.json(client.rows);
	} catch (err) {
		console.error(err.message);
	}
});

// Create a user:

app.post("/registrar_usuario", async (req, res) => {
	try {
		// 1. Get required info from req.body
		const { nombres, apellidos, email, contrasena, contrasena2, rut } = req.body

		// 2. Check if the user already exists
		const user = await pool.query(
			"SELECT * FROM cakestore.Logins WHERE email = $1 OR rut = $2",
			[email, rut]
			);

		if (user.rows.length !== 0) {
			return res.status(401).send("Usuario ya existe")
		};

		// 3. Verify if the password is valid
		if (contrasena != contrasena2) {
            return res.status(401).json("Contraseñas no coinciden")
        }

		if (contrasena.length <= 12) {
            return res.status(401).json("La contraseña debe tener al menos 12 dígitos")
        }

		// 4. Encrypt password using bCrypt
		bcryptPassword = await encrypt(contrasena)

		// 5. Add the new user to the database
		const timeElapsed = Date.now();
		const today = new Date(timeElapsed);
 		today.toLocaleDateString();
		const newUser = await pool.query(
			"INSERT INTO cakestore.Logins(nombres, apellidos, rut, email, contrasena, trabaja_desde_fecha) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
			[nombres, apellidos, rut, email, bcryptPassword, today]
			);

		token = jwtGenerator(newUser.rows[0].rut)
		res.json({ token })
	} catch (err) {
		console.log(err)
		res.status(500).send("Server error")
	}
});


// Create a client:

app.post("/registrar_cliente", async (req, res) => {
	try {
		const { nombres, apellidos, rut, email, fecha_de_nacimiento } = req.body;
		const newClient = await pool.query(
			"INSERT INTO cakestore.Clientes(rut, nombres, apellidos, email, fecha_de_nacimiento) VALUES ($1, $2, $3, $4, $5) RETURNING *",
			[nombres, apellidos, rut, email, fecha_de_nacimiento]
			);
		res.json(newClient.rows[0]);
	} catch (err) {
		console.log(err.message);
	}
});

// Login a user:

app.post("/iniciar_sesion", async (req, res) => {
    try {
        // 1. Destructure req.body
        const { email, contrasena } = req.body

        // 2. Check if the user exists
        const user = await pool.query(
			"SELECT * FROM cakestore.Logins WHERE email = $1",
			[email]
			);

        if (user.rows.length === 0) {
            return res.status(401).json("Password incorrecta o email no existe")
        }

        // 3. Password check
        const validPassword = await compare(contrasena, user.rows[0].contrasena)
        console.log("plain", contrasena, user.rows[0].contrasena)
        if (!validPassword) {
            return res.status(401).json("Password incorrecta o email no existe")
        }

        // 4. Return a JWT token 
        const token = jwtGenerator(user.rows[0].rut)
        res.json({ token })
    } catch (err) {
        console.log(err)
        res.status(500).send("Server error")
    }
})
