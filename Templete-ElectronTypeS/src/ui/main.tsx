// import { StrictMode } from 'react'
import { createRoot } from "react-dom/client";
import "./index.css";
import App from './App.tsx'
import Curso from "./Curso.tsx";
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// impo


createRoot(document.getElementById("root")!).render(
  <>
    <Curso />
    {/* <a></a> */}
  </>

);
