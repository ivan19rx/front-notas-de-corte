import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './pages/Dashboard.jsx'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import GerenciarUsuarios from './pages/admin/GerenciarUsuarios.jsx'
import GerenciarCursos from './pages/admin/GerenciarCursos.jsx'
import Login from './pages/login/Login.jsx'

import { AuthProvider } from '../context/authContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<App />} />
          <Route path='/admin/gerenciar-usuarios' element={<GerenciarUsuarios />} />
          <Route path='/admin/gerenciar-cursos' element={<GerenciarCursos />} />

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)
