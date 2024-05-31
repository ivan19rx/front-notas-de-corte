// UsuarioForm.js

import React, { useState } from 'react';
import axios from 'axios';
import { api } from '../../services/api';


function UsuarioForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [accessLevel, setAccessLevel] = useState('Cliente');

    



    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("@Auth:token")

        try {
            const response = await api.post('/cad-usuario', {
                nome: name,
                email: email,
                senha: senha,
                nivelacesso: accessLevel,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setName('');
            setEmail('');
            setSenha('');
            setAccessLevel('Cliente');
            console.log('Resposta da API:', response.data);
            window.location.reload()
            
            

        } catch (error) {
            console.error('Erro ao enviar requisição:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className='row'>
                <div className='col-md-6 offset-md-3'>
                    <input
                        className='form-control'
                        type="text"
                        placeholder="Nome"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    /> <br></br>
                    <input
                        className='form-control'
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    /> <br></br>
                    <input
                        className='form-control'
                        type="text"
                        placeholder="Senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                    /> <br></br>
                    <select className='form-control' value={accessLevel} onChange={(e) => setAccessLevel(e.target.value)}>
                        <option value={'Cliente'}>Cliente</option>
                        <option value={'Admin'}>Admin</option>
                    </select>  <br></br>
                    <button className='btn btn-primary mt-2' type="submit">Enviar</button>
                </div>
            </div>

        </form>
    );
}

export default UsuarioForm;
