import React, { useState } from 'react';
import './Template.css';

import ListUsuarios from '../components/listUsuarios';
import ListCursos from '../components/listCursos';
import CadCurso from '../components/cadCurso';
import CadUsuario from '../components/cadUsuario';

function App() {
  const [selectedComponent, setSelectedComponent] = useState('ListUsuarios');

  const handleMenuClick = (componentName) => {
    setSelectedComponent(componentName);
  };

  const renderSelectedComponent = () => {
    switch (selectedComponent) {
      case 'ListUsuarios':
        return <ListUsuarios />;
      case 'ListCursos':
        return <ListCursos />;
      case 'CadCurso':
        return <CadCurso />;
      case 'CadUsuario':
        return <CadUsuario />;
      default:
        return <p>olá, seja bem vindo a dashboard</p>;
    }
  };

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
                <button className={`nav-link btn ${selectedComponent === 'ListUsuarios' ? 'active' : ''}`} onClick={() => handleMenuClick('ListUsuarios')}>Lista de usuários</button>
              </li>
              <li className="nav-item">
                <button className={`nav-link btn ${selectedComponent === 'ListCursos' ? 'active' : ''}`} onClick={() => handleMenuClick('ListCursos')}>Lista de cursos</button>
              </li>
              <li className="nav-item">
                <button className={`nav-link btn ${selectedComponent === 'CadCurso' ? 'active' : ''}`} onClick={() => handleMenuClick('CadCurso')}>Cadastrar curso</button>
              </li>
              <li className="nav-item">
                <button className={`nav-link btn ${selectedComponent === 'CadUsuario' ? 'active' : ''}`} onClick={() => handleMenuClick('CadUsuario')}>Cadastrar usuário</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <main className="container">
        <div className="bg-light p-5 rounded">
          {renderSelectedComponent()}
        </div>
      </main>
    </>
  );
}

export default App;
