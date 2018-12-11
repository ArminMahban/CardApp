import React from "react";
import { render } from "react-dom";

import "./styles.scss";
import CardGame from "./CardGame.jsx";

// const App = () => (
//   <div>
//     <h1>Hello</h1>
//   </div>
// );

render(<CardGame />, document.getElementById("app"));
