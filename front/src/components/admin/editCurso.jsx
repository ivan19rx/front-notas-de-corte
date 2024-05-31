import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { api } from '../../services/api';

function EditCurso({ cursoId, onClose }) {
    const [nome, setNome] = useState('');
    const [faculdade, setFaculdade] = useState('');
    const [notaDeCorte, setNotaDeCorte] = useState('');
    const [descricao, setDescricao] = useState('')

    useEffect(() => {
        // Recuperar as informações do curso para edição
        const token = localStorage.getItem("@Auth:token"); // Recupere o token do local onde ele está armazenado
        api.get(`/get-curso/${cursoId}`, {
            headers: {
                Authorization: `Bearer ${token}`, // Substitua 'token' pelo seu token
            }
        })
            .then(response => {
                const curso = response.data;
                setNome(curso.nome);
                setFaculdade(curso.faculdade);
                setNotaDeCorte(curso.notaDeCorte);
                setDescricao(curso.descricao)
            })
            .catch(error => {
                console.error('Erro ao buscar curso para edição:', error);
            });
    }, [cursoId]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Enviar solicitação para atualizar o curso
            const token = localStorage.getItem("@Auth:token"); // Recupere o token do local onde ele está armazenado
            await api.put(`/edit-curso/${cursoId}`, {
                nome: nome,
                faculdade: faculdade,
                notaDeCorte: notaDeCorte,
                descricao: descricao
            }, {
                headers: {
                    Authorization: `Bearer ${token}`, // Substitua 'token' pelo seu token
                }
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
                        placeholder="Faculdade"
                        value={faculdade}
                        onChange={(e) => setFaculdade(e.target.value)}
                    /> <br />
                    <input
                        className='form-control'
                        type="text"
                        placeholder="Nota de corte"
                        value={notaDeCorte}
                        onChange={(e) => setNotaDeCorte(e.target.value)}
                    /> <br />
                    <textarea
                        className='form-control'
                        type="text"
                        placeholder="Descrição do curso"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                    /> <br />
                    <button className='btn btn-primary mt-2' type="submit">Salvar</button>
                    <button className='btn btn-secondary mt-2 ms-2' onClick={onClose}>Cancelar</button>
                </div>
            </div>
        </form>
    );
}

export default EditCurso;
