import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './pages/Dashboard.jsx'
import './index.css'
import { BrowserRouter, Routes, Route} from 'react-router-dom'

import GerenciarUsuarios from './pages/admin/GerenciarUsuarios.jsx'
import GerenciarCursos from './pages/admin/GerenciarCursos.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/dashboard' element={<App/>}/>
        <Route path='/dashboard/gerenciar-usuarios' element={<GerenciarUsuarios/>}/>
        <Route path='/dashboard/gerenciar-cursos' element={<GerenciarCursos/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
