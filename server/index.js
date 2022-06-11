const express = require("express")
const app = express()
const cors = require("cors")
const pool = require("./db")

var path = require('path')
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')

const initializePassport = require('./passport-config')
initializePassport(
	passport,
	email => users.find(user => user.email === email)
)

const users = []

// require('dotenv').config(); // leer .env
const { PORT } = require('./config')
const { query } = require("express")


//middleware
app.set('view-engine', 'ejs')
app.set('views', path.join(__dirname, '../client/client/views'))
app.use(express.urlencoded({ extended: false}))
app.use(flash())
app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

app.use(cors())
app.use(express.json())

app.get("/", (req, res) =>{
	res.render("mainMenu.ejs")
})

//login
app.get("/login", (req, res) => {
    res.render('login.ejs')
})

app.post("/login", passport.authenticate('local', {
	successRedirect: '/',
	failureRedirect: '/login',
	failureFlash: true
}))

//register
app.get("/register", (req, res) => {
    res.render('register.ejs')
})

app.post("/register", async (req, res) => {
    try {
		var { nombres, apellidos, rut, email } = req.body;
		const timeElapsed = Date.now();
		const today = new Date(timeElapsed);
		today.toLocaleDateString();
		const hashedPassword = await bcrypt.hash(req.body.contrasena, 10)
        var newUser = await pool.query(
			"INSERT INTO cakestore.Logins(nombres, apellidos, rut, email, contrasena, trabaja_desde_fecha) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
			[nombres, apellidos, rut, email, hashedPassword, today]
		);
        // res.json(newUser.rows[0]); // debug

		if(res.headersSent !== true) {
			res.redirect('/login');
		}
	} catch (err) {
		if(res.headersSent !== true) {
			res.redirect('/register');
		}
		console.error(err.message);
	}
})

//get all "users"
app.get("/users", async (req, res) => {
    try {
        const allUsers = await pool.query(
            "SELECT rut, nombres, apellidos, email, trabaja_desde_fecha FROM cakestore.Logins"
        )
        res.json(allUsers.rows)
    } catch (err) {
        console.error(err.message)
    }
})

//get a single "user"
app.get("/users/:id_usuario", async (req, res) => {
    try {
        const { id_usuario } = req.params
        const user = await pool.query(
            "SELECT rut, nombres, apellidos, email, trabaja_desde_fecha FROM cakestore.Logins WHERE id_usuario = $1",
            [id_usuario]
        )
        res.json(user.rows[0])
    } catch (err) {
        console.log(err)

    }
})

//create a "user"
app.post("/users", async (req, res) => {
    try {
        const { nombres, apellidos, rut, email, contrasena, trabaja_desde_fecha } = req.body
        const newUser = await pool.query(
            "INSERT INTO cakestore.Logins(nombres, apellidos, rut, email, contrasena, trabaja_desde_fecha) VALUES ($1, $2, $3, $4, $5, $6);",
            [nombres, apellidos, rut, email, contrasena, trabaja_desde_fecha]
        )
        res.json(newUser.rows[0])
    } catch (err) {
        console.error(err.message)
    }
})

//update a "user"
app.put("/users/:id_usuario", async (req, res) => {
    try {
        const { id_usuario } = req.params
        const { description } = req.body
        const updateUser = await pool.query(
            "UPDATE cakestore.nombres SET description = $1 WHERE id_usuario = $2",
            [description, id_usuario]
        )
        console.log(updateUser)
        res.json("Usuario actualizado")
    } catch (err) {
        console.log(err)

    }
})

//delete a "user"
app.delete("/users/:id_usuario", async (req, res) => {
    try {
        const { id_usuario } = req.params
        const deleteUser = await pool.query(
            "DELETE FROM cakestore.Logins WHERE id_usuario LIKE $1",
            [id_usuario]
        )
        console.log(deleteUser)
        res.json("user was deleted")
    } catch (err) {
        console.error(err)

    }
})

app.listen(PORT, () => {
	console.log("servidor iniciado en puerto " + PORT)
})
