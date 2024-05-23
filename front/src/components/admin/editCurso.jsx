import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EditCurso({ cursoId, onClose }) {
    const [nome, setNome] = useState('');
    const [notaDeCorte, setNotaDeCorte] = useState('');

    useEffect(() => {
        // Recuperar as informações do curso para edição
        axios.get(`http://localhost:8080/get-curso/${cursoId}`)
            .then(response => {
                const curso = response.data;
                setNome(curso.nome);
                setNotaDeCorte(curso.notaDeCorte);
            })
            .catch(error => {
                console.error('Erro ao buscar curso para edição:', error);
            });
    }, [cursoId]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Enviar solicitação para atualizar o curso
            await axios.put(`http://localhost:8080/edit-curso/${cursoId}`, {
                nome: nome,
                notaDeCorte: notaDeCorte,
            });

            console.log('Curso atualizado com sucesso');
            onClose(window.location.reload());
        } catch (error) {
            console.error('Erro ao editar curso:', error);
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
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    /> <br />
                    <input
                        className='form-control'
                        type="text"
                        placeholder="Nota de corte"
                        value={notaDeCorte}
                        onChange={(e) => setNotaDeCorte(e.target.value)}
                    /> <br />
                    <button className='btn btn-primary mt-2' type="submit">Salvar</button>
                    <button className='btn btn-secondary mt-2 ms-2' onClick={onClose}>Cancelar</button>
                </div>
            </div>
        </form>
    );
}

export default EditCurso;
