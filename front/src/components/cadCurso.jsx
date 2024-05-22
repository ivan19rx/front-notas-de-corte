// CourseForm.js

import React, { useState } from 'react';
import axios from 'axios';

function CourseForm() {
    const [name, setName] = useState('');
    const [cutoff, setCutoff] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/cad-curso', {
                nome: name,
                notaDeCorte: parseFloat(cutoff), // Convert to a number if needed
            });

            setName('');
            setCutoff('');
            console.log('Resposta da API:', response.data);
        } catch (error) {
            console.error('Erro ao enviar requisição:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Nome do curso"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="number"
                placeholder="Nota de corte"
                value={cutoff}
                onChange={(e) => setCutoff(e.target.value)}
            />
            <button type="submit">Enviar</button>
        </form>
    );
}

export default CourseForm;
