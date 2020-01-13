import React from "react";

//routes
import Routes from "./routes";

//css
import "./App.css";

//logo
import logo from "./assets/logo.svg";

function App() {
  return (
    <div className="container">
      <img src={logo} alt="logo" />
      <div className="content">
        <Routes></Routes>
      </div>
    </div>
  );
}

export default App;
