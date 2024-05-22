import React, { useEffect, useState } from 'react';
import axios from 'axios';

const listCursos = () => {
  const [cursos, setCursos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/list-cursos')
      .then(response => {
        const data = response.data;
        if (!data.erro) {
          setCursos(data.data);
        } else {
          console.error(data.mensagem);
        }
      })
      .catch(error => {
        console.error('Erro ao buscar dados:', error);
      });
  }, []);


  return (
    <div>
      {cursos.map((curso) => (
        <div key={curso.id}>
          <p>Curso: {curso.nome}</p>
          <p>nota de corte: {curso.notaDeCorte}</p>
        </div>
      ))}
    </div>
  )
}

export default listCursos