// UsuarioForm.js

import React, { useState } from 'react';
import axios from 'axios';


function UsuarioForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [accessLevel, setAccessLevel] = useState(1);

    



    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/cad-usuario', {
                nome: name,
                email: email,
                senha: senha,
                nivelacesso: accessLevel,
            });

            setName('');
            setEmail('');
            setSenha('');
            setAccessLevel(1);
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
                    <select className='form-control' value={accessLevel} onChange={(e) => setAccessLevel(parseInt(e.target.value))}>
                        <option value={1}>Cliente</option>
                        <option value={2}>Admin</option>
                    </select>  <br></br>
                    <button className='btn btn-primary mt-2' type="submit">Enviar</button>
                </div>
            </div>

        </form>
    );
}

export default UsuarioForm;
