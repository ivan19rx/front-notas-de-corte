import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './pages/Dashboard.jsx'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import GerenciarUsuarios from './pages/admin/GerenciarUsuarios.jsx'
import GerenciarCursos from './pages/admin/GerenciarCursos.jsx'
import Login from './pages/login/Login.jsx'

import { AuthProvider } from './context/auth.jsx'
import { PrivateRoute } from './privateRoutes.jsx'
import Autenticado from './autenticado/autenticado.jsx'
import NotFound from './components/notFound.jsx'
import Register from './pages/register/Register.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<Autenticado><App /></Autenticado>} />
          <Route path='/admin/gerenciar-usuarios' element={<Autenticado><GerenciarUsuarios /></Autenticado>} />
          <Route path='/admin/gerenciar-cursos' element={<Autenticado><GerenciarCursos /></Autenticado>} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />

          <Route path='*' element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)
