import React from 'react'
import ReactDOM from 'react-dom/client'
import { AuthProvider } from "@propelauth/react";
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider authUrl={import.meta.env.VITE_AUTH_URL}>
    <App />
    </AuthProvider>
  </React.StrictMode>,
)
