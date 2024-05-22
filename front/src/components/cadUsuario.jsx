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
        } catch (error) {
            console.error('Erro ao enviar requisição:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="text"
                placeholder="Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
            />
            <select value={accessLevel} onChange={(e) => setAccessLevel(parseInt(e.target.value))}>
                <option value={1}>Nível de Acesso 1</option>
                <option value={2}>Nível de Acesso 2</option>
                <option value={3}>Nível de Acesso 3</option>
            </select>
            <button type="submit">Enviar</button>
        </form>
    );
}

export default UsuarioForm;
