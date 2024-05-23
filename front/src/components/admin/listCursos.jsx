import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit,FaTrash  } from 'react-icons/fa'; // Importando o ícone de edição do React Icons

const ListCursos = () => {
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
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Nome</th>
            <th scope="col">Nota de corte</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody>
          {cursos.map((curso) => (
            <tr key={curso.id}>
              <td>{curso.nome}</td>
              <td>{curso.notaDeCorte}</td>
              <td>
                <button className="btn btn-primary"><FaEdit /></button>
                <button className="btn btn-danger"><FaTrash /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListCursos;
