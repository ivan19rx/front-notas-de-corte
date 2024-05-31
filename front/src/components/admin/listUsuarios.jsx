import React, { useEffect, useState } from 'react';

import { FaEdit, FaTrash } from 'react-icons/fa';
import { Modal } from 'react-bootstrap';

import EditUsuario from './editUsuario';
import CadUsuario from './cadUsuario'

import { api } from '../../services/api';

const ListUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [editUserId, setEditUserId] = useState(null); // Estado para controlar o ID do usuário em edição

  const [showModal, setShowModal] = useState(false);

  const handleNew = () => {
    setShowModal(true); // Exibe o modal quando o botão "Novo" é clicado
  };

  const handleCloseModal = () => {
    setShowModal(false); // Fecha o modal
    fetchUsuarios(); // Atualiza a lista de usuários
  };



  const fetchUsuarios = () => {
    const token = localStorage.getItem("@Auth:token")

    api.get('/list-usuarios', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
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
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const handleEdit = (userId) => {
    setEditUserId(userId); // Define o ID do usuário em edição
  };

  const handleCloseEdit = () => {
    setEditUserId(null); // Limpa o ID do usuário em edição
    fetchUsuarios()
  };

  const handleDelete = (id) => {
    swal({
      title: "Confirmação",
      text: "Você está prestes a excluir este usuário. Deseja continuar?",
      icon: "warning",
      buttons: {
        cancel: {
          text: "Cancelar",
          value: null,
          visible: true,
          className: "",
          closeModal: true,
        },
        confirm: {
          text: "Prosseguir",
          value: true,
          visible: true,
          className: "red-button", // Add a custom CSS class for the red button
          closeModal: true,
        },
      },
    }).then((willDelete) => {
      if (willDelete) {
        try {
          const token = localStorage.getItem("@Auth:token")

          api.delete(`/delete-usuario/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }).then(() => {
            fetchUsuarios();
          });
        } catch (err) {
          console.log(err);
        }
      }
    });
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h4 className='mb-3'>Veja aqui os principais cursos e suas notas de cortes </h4>
        <button className='btn btn-success mb-4' onClick={handleNew}>Novo</button>
      </div>
      <table className="table" style={{ borderRadius: '15px' }}>
        <thead>
          <tr>
            <th scope="col">Nome</th>
            <th scope="col">Email</th>
            <th scope="col">Nível de Acesso</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.nome}</td>
              <td>{usuario.email}</td>
              <td>{usuario.nivelacesso}</td>
              <td>
                <button className="btn btn-primary" onClick={() => handleEdit(usuario.id)}><FaEdit /></button>
                <button className="btn btn-danger" onClick={() => handleDelete(usuario.id)}><FaTrash /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>



      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Cadastrar Novo Usuário</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CadUsuario onClose={handleCloseModal} />
        </Modal.Body>
      </Modal>

      {/* Mostra o componente de edição se o editUserId estiver definido */}
      {editUserId && <EditUsuario usuarioId={editUserId} onClose={handleCloseEdit} />}
    </div>
  );
};

export default ListUsuarios;
