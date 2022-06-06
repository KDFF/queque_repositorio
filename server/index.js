// index.js
const express = require("express")
const app = express()
const cors = require("cors")
const pool = require("./db")

// require('dotenv').config(); // leer .env
const { PORT } = require('./config')


//middleware
app.use(cors())
app.use(express.json())

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
        const { rut } = req.params
        const deleteuser = await pool.query(
            "DELETE FROM cakestore.Logins WHERE rut LIKE $1",
            [rut]
        )
        console.log(deleteuser)
        res.json("user was deleted")
    } catch (err) {
        console.error(err)

    }
})

app.listen(PORT, () => {
	console.log("servidor iniciado en puerto " + PORT)
})
