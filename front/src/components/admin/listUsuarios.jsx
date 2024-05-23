import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';
import EditUsuario from './editUsuario';

const ListUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [editUserId, setEditUserId] = useState(null); // Estado para controlar o ID do usuário em edição

  useEffect(() => {
    axios.get('http://localhost:8080/list-usuarios')
      .then(response => {
        const data = response.data;
        if (!data.erro) {
          setUsuarios(data.data);
        } else {
          console.error(data.mensagem);
        }
      })
      .catch(error => {
        console.error('Erro ao buscar dados:', error);
      });
  }, []);

  const handleEdit = (userId) => {
    setEditUserId(userId); // Define o ID do usuário em edição
  };

  const handleCloseEdit = () => {
    setEditUserId(null); // Limpa o ID do usuário em edição
  };

  const handleDelete = (id) => {
    try {
      axios.delete(`http://localhost:8080/delete-usuario/${id}`).then(() => {
        window.location.reload()
      })
    } catch(err) {
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
            <th scope="col">Email</th>
            <th scope="col">Senha</th>
            <th scope="col">Nível de Acesso</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.id}</td>
              <td>{usuario.nome}</td>
              <td>{usuario.email}</td>
              <td>{usuario.senha}</td>
              <td>{usuario.nivelacesso}</td>
              <td>
                <button className="btn btn-primary" onClick={() => handleEdit(usuario.id)}><FaEdit /></button>
                <button className="btn btn-danger" onClick={() => handleDelete(usuario.id)}><FaTrash /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mostra o componente de edição se o editUserId estiver definido */}
      {editUserId && <EditUsuario usuarioId={editUserId} onClose={handleCloseEdit} />}
    </div>
  );
};

export default ListUsuarios;
