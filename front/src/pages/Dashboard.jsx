import React, { useState } from 'react';
import './Template.css';

import ListUsuarios from '../components/admin/listUsuarios';
import ListCursos from '../components/admin/listCursos';
import CadCurso from '../components/admin/cadCurso';
import CadUsuario from '../components/admin/cadUsuario';
import { Link } from 'react-router-dom';

function App() {




  return (
    <>
      <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Sistema de notas de corte</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse"
            aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
              <li className="nav-item">
                <Link className='nav-link btn' to='/admin/gerenciar-usuarios'>Gerenciar usuários</Link>
              </li>
              <li className="nav-item">
                <Link className='nav-link btn' to='/admin/gerenciar-cursos'>Gerenciar cursos</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <section className="container mt-5">
        <div className="bg-light p-5 rounded">
          <h1>Olá, Seja Bem Vindo a dashboard</h1>
        </div>
      </section>
    </>
  );
}

export default App;
