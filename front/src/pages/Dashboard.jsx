import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './Template.css'

import ListUsuarios from '../components/listUsuarios';
import ListCursos from '../components/listCursos';
import CadCurso from '../components/cadCurso';


function App() {


  return (
    <>
      <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <div className="container-fluid">
          <div>
            <a className="navbar-brand" href="#">Sistema de notas de corte</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse"
              aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
              <li className="nav-item">
                <a className="nav-link " aria-current="page" href="/dashboard">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" href="/list-usuarios">Lista de usuários</a>
              </li>
              <li className="nav-item">
                <a className="nav-link " href="/list-cursos" tabIndex="-1" aria-disabled="true">Lista de cursos</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <main className="container">
        <div className="bg-light p-5 rounded">
          <ListUsuarios />
        </div>
      </main>
    </>
  );
}

export default App;
