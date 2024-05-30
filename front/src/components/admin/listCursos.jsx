import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';
import EditCurso from './editCurso';

const ListCursos = () => {
  const [cursos, setCursos] = useState([]);
  const [editCursoId, setEditCursoId] = useState(null);
  const [userRole, setUserRole] = useState(null); // Adicione este estado

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

    // Busque o papel do usuário do localStorage quando o componente for montado
    const user = JSON.parse(localStorage.getItem('@Auth:user'));
    const role = user ? user.nivelacesso : null; // Altere esta linha
    setUserRole(role);
  }, []);

  const handleEdit = (cursoId) => {
    setEditCursoId(cursoId);
    fetchCursos()
  };

  const handleCloseEdit = () => {
    setEditCursoId(null);
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
      <h4 className='mb-3'>Veja aqui os principais cursos e suas notas de cortes</h4>
      <table className="table" style={{ borderRadius: '15px' }}>
        
        <thead>
          <tr>
            <th scope='col'>Id</th>
            <th scope="col">Nome</th>
            <th scope='col'>Faculdade</th>
            <th scope="col">Nota de corte</th>
            {userRole === 'Admin' && <th scope="col">Ações</th>} {/* Renderize condicionalmente a coluna Ações */}
          </tr>
        </thead>
        <tbody>
          {cursos.map((curso) => (
            <tr key={curso.id}>
              <td>{curso.id}</td>
              <td>{curso.nome}</td>
              <td>{curso.faculdade}</td>
              <td>{curso.notaDeCorte}</td>
              {userRole === 'Admin' && ( // Renderize condicionalmente as linhas correspondentes
                <React.Fragment>
                  <td>
                    <button className="btn btn-primary" onClick={() => handleEdit(curso.id)}><FaEdit /></button>
                    <button className="btn btn-danger" onClick={() => handleDelete(curso.id)}><FaTrash /></button>
                  </td>
                </React.Fragment>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {editCursoId && <EditCurso cursoId={editCursoId} onClose={handleCloseEdit} />}
    </div>
  );
}

export default ListCursos;
