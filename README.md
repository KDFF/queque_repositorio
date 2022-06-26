# Gestionador de ventas, Cake Store Santiago

## Información general
Dashboard en línea creado con utilizando un stack PERN. Existe con el fin de permitir a la empresa un mayor control respecto a sus clientes, notificando respecto a ventas totales para distintos periodos, junto con datos de cumpleaños, etc.

### Tecnologías Utilizadas:
- [PG](https://www.npmjs.com/package/pg)
  * Para conectarse a PostgresSQL
- [Express.js](https://expressjs.com/)
  * Framework para el servidor API
- [React.js](https://facebook.github.io/react/)
  * Utilizado para el lado del cliente
- [Webpack](http://webpack.github.io/docs/)
  * Bundler de aplicación para el cliente React
- [Dotenv](https://github.com/motdotla/dotenv)
  * Carga variables `ENV` desde un archivo `.env`
- [EJS](https://ejs.co/)
  * Generar markup HTML con JavaScript (utilizado en forma de prueba para el backend)

## Características Principales:
- Inicio de sesión requerido para acceder a los datos.

- Tabla con datos con registro de trabajadores de Cake Store Santiago.

- Tabla con datos con un historial de clientes, incluyendo fecha de nacimiento, R.U.N., entre otros.

- Registro de ventas comprehensivo; se detallan datos respecto a las compras realizadas, incluyendo:
	* Número de gestión
	* Nombre completo del usuario
	* R.U.N.
	* Producto(s) comprado(s)
	* Monto del pago
	* Fecha de compra
	* Método de pago
	* Calificación para cada usuario (determinado en base de su comportamiento relacionado al negocio)

## Uso del Programa:
- Luego de un inicio de sesión, el cliente tendrá acceso a una planilla conteniendo los datos de las compras realizadas y otra para el perfíl de los clientes. Para ambos casos, el cliente será capaz de añadir datos nuevos en caso de ser necesario.
