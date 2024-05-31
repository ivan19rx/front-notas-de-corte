import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Template.css';

import ListUsuarios from '../../components/admin/listUsuarios';     
import CadUsuario from '../../components/admin/cadUsuario';
import swal from 'sweetalert';
import '../Dash.css'

function GerenciarUsuarios() {

    function logOut() {
        const user = JSON.parse(localStorage.getItem('@Auth:user'));
        const nome = user.nome;

        swal({
            title: "Confirmação",
            text: `${nome}, você está prestes a fazer logout do sistema! Deseja continuar?`,
            icon: "warning",
            buttons: {
                cancel: {
                    text: "Cancelar",
                    value: null,
                    visible: true,
                    className: "",
                    closeModal: true,
                },
                confirm: {
                    text: "Logout",
                    value: true,
                    visible: true,
                    className: "red-button", // Add a custom CSS class for the red button
                    closeModal: true,
                },
            },
        }).then((willLogout) => {
            if (willLogout) {
                localStorage.clear();
                window.location.reload();
            }
        });
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
                            <Link className="navbar-brand" onClick={logOut}>Sair</Link>
                        </li>
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
