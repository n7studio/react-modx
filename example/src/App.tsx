import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { useHelloWorld } from "./store/hello/useHelloWorld";

function App() {
  const { helloWorldValue, actions } = useHelloWorld();
 
  useEffect(() => {
    actions.getHelloWorld();
  }, [actions]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{helloWorldValue && helloWorldValue.example.title}</p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
