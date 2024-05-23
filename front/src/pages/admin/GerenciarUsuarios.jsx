import React, { useState } from 'react';
import '../Template.css';

import ListUsuarios from '../../components/admin/listUsuarios';
import ListCursos from '../../components/admin/listCursos';
import CadCurso from '../../components/admin/cadCurso';
import CadUsuario from '../../components/admin/cadUsuario';

function GerenciarUsuarios() {




    return (
        <>
            <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">Sistema de notas de corte</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse"
                        aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <ul className="navbar-nav me-auto mb-2 mb-md-0">
                            <li className="nav-item">
                                <a className='nav-link btn' href='/admin/gerenciar-usuarios'>Gerenciar usuários</a>
                            </li>
                            <li className="nav-item">
                                <a className='nav-link btn' href='/admin/gerenciar-cursos'>Gerenciar cursos</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <h4 className='text-center'>Cadastrar usuário</h4>

            <section className="container mb-5">
                <div className="bg-light p-5 rounded">
                    <CadUsuario />
                </div>
            </section>
            <h4 className='text-center'>Gerenciar usuários cadastrados</h4>

            <section className="container">
                <div className="bg-light p-5 rounded">
                    <ListUsuarios />
                </div>
            </section>
        </>
    );
}

export default GerenciarUsuarios;
