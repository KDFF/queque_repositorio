import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext, useState } from "react";
import { DarkModeContext } from "./context/darkModeContext";

function App() {
	const { darkMode } = useContext(DarkModeContext);
	const [token, setToken] = useState();
	if (!token) {
	return <Login setToken={setToken} />;
	}
	return (
	<div className={darkMode ? "app dark" : "app"}>
		<BrowserRouter>
		<Routes>
			<Route path="/">
			<Route index element={<Home />} />
			<Route path="login" element={<Login />} />
			<Route path="users">
				<Route index element={<List />} />
				<Route path=":userId" element={<Single />} />
				<Route
				path="new"
				element={
					<New inputs={userInputs} title="Agregar Nuevo Usuario" />
				}
				/>
			</Route>
			<Route path="products">
				<Route index element={<List />} />
				<Route path=":productId" element={<Single />} />
				<Route
				path="new"
				element={
					<New inputs={productInputs} title="Agregar Nuevo Producto" />
				}
				/>
			</Route>
			<Route path="Estadisticas">
				<Route index element={<List />} />
			</Route>
			</Route>
		</Routes>
		</BrowserRouter>
	</div>
	);
}

export default App;
