import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { DarkModeContextProvider } from "./context/darkModeContext";
import {AuthContextProvider} from '../src/context//AuthContext'
import axios from 'axios'
// axios.defaults.baseURL = "http://localhost:8800/api";

ReactDOM.render(
  <React.StrictMode>
    <DarkModeContextProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </DarkModeContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
