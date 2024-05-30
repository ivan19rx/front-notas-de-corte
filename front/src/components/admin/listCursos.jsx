import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';
import EditCurso from './editCurso'; // Importe o componente EditCurso

const ListCursos = () => {
  const [cursos, setCursos] = useState([]);
  const [editCursoId, setEditCursoId] = useState(null); // Estado para controlar o ID do curso em edição

  const [accessLevel, setAccessLevel] = useState(null);

  const fetchCursos = () => {
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
  };

  useEffect(() => {
    fetchCursos();

    // Busque o nível de acesso do localStorage quando o componente for montado
    const userAccessLevel = localStorage.getItem('accessLevel');
    setAccessLevel(userAccessLevel);
  }, []);

  const handleEdit = (cursoId) => {
    setEditCursoId(cursoId); // Define o ID do curso em edição
    fetchCursos()
  };

  const handleCloseEdit = () => {
    setEditCursoId(null); // Limpa o ID do curso em edição
    fetchCursos()
  };

  const handleDelete = (id) => {
    try {
      axios.delete(`http://localhost:8080/delete-curso/${id}`).then(() => {
        fetchCursos()
      })
    } catch (err) {
      console.log(err)
    }
  }


  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th scope='col'>Id</th>
            <th scope="col">Nome</th>
            <th scope="col">Nota de corte</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody>
          {cursos.map((curso) => (
            <tr key={curso.id}>
              <td>{curso.id}</td>
              <td>{curso.nome}</td>
              <td>{curso.notaDeCorte}</td>
              <td>
                <button className="btn btn-primary" onClick={() => handleEdit(curso.id)}><FaEdit /></button>
                <button className="btn btn-danger" onClick={() => handleDelete(curso.id)}><FaTrash /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mostra o componente de edição se o editCursoId estiver definido */}
      {editCursoId && <EditCurso cursoId={editCursoId} onClose={handleCloseEdit} />}
    </div>
  );
}

export default ListCursos;
