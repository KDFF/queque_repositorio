import React, { Fragment } from "react"
import InputUser from "./components/InputUsers";
import './App.css';
//components
import ListUsers from "./components/ListUsers";

function App() {
  return (
    <Fragment>
		<div className="container">
		  <InputUser />
		  <br/>
		  <br/>
		  <br/>
		  <ListUsers />
		</div>
    </Fragment>
  );
}

export default App;
