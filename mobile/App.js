import React from "react";

//routes
import Routes from "./src/routes";

export default function App() {
  //remove warnings from expo
  console.disableYellowBox = true;
  console.ignoredYellowBox = ["Warning: Each", "Warning: Failed"];

  return <Routes></Routes>;
}
