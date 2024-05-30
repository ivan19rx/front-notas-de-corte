import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Template.css';

import ListUsuarios from '../../components/admin/listUsuarios';
import ListCursos from '../../components/admin/listCursos';
import CadCurso from '../../components/admin/cadCurso';
import CadUsuario from '../../components/admin/cadUsuario';

function GerenciarCursos() {

    function logOut() {
        const user = JSON.parse(localStorage.getItem('@Auth:user'));
        let nome = user.nome
        const confirmLogout = window.confirm(nome + ", Você está prestes a fazer logout do sistema! Deseja continuar?");
        if (confirmLogout) {
          localStorage.clear();
          window.location.reload();
        }
      }
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
                        <li className="nav-item">
                            <button onClick={logOut} >Sair</button>
                        </li>
                    </div>
                </div>
            </nav>
            <h4 className='text-center'>Cadastrar curso</h4>
            <section className="container mb-5">
                <div className="bg-light p-5 rounded">
                    <CadCurso />
                </div>
            </section>

            <h4 className='text-center'>Gerenciar cursos cadastrados</h4>
            <section className="container">
                <div className="bg-light p-5 rounded">
                    <ListCursos />
                </div>
            </section>
        </>
    );
}

export default GerenciarCursos;
