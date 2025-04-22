// import { StrictMode } from 'react'
import { createRoot } from "react-dom/client";
import "./../index.css";
import "./../tailwind.css";
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// impo

const queryClient = new QueryClient();


createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
      <App />
  </QueryClientProvider>

);
