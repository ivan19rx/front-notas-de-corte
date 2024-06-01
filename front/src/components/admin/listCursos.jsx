import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import EditCurso from './editCurso';
import { api } from '../../services/api';
import { Link } from 'react-router-dom';

import { Modal, Button } from 'react-bootstrap';
import CadCurso from './cadCurso'

const ListCursos = () => {
  const [cursos, setCursos] = useState([]);
  const [editCursoId, setEditCursoId] = useState(null);
  const [userRole, setUserRole] = useState(null); // Adicione este estado

  const [show, setShow] = useState(false);
  const [cursoInfo, setCursoInfo] = useState({ nome: '', descricao: '' });

  const [showCadCurso, setShowCadCurso] = useState(false);
  const handleShowCadCurso = () => setShowCadCurso(true);
  const handleCloseCadCurso = () => setShowCadCurso(false);

  const [ordenacao, setOrdenacao] = useState('asc'); // Estado para controlar a ordenação
  const [cursosOrdenados, setCursosOrdenados] = useState([]);

  useEffect(() => {
    ordenarCursos(); // Ordenar os cursos quando o componente for montado
  }, [cursos, ordenacao]);

  const ordenarCursos = () => {
    const cursosOrdenados = [...cursos]; // Clonar o array de cursos para evitar mutações indesejadas

    cursosOrdenados.sort((cursoA, cursoB) => {
      if (ordenacao === 'asc') {
        return cursoA.notaDeCorte - cursoB.notaDeCorte;
      } else {
        return cursoB.notaDeCorte - cursoA.notaDeCorte;
      }
    });

    setCursosOrdenados(cursosOrdenados);
  };

  const handleOrdenacaoChange = (event) => {
    setOrdenacao(event.target.value); // Definir a nova ordenação
  };

  const handleClose = () => setShow(false);
  const handleShow = (curso) => {
    setCursoInfo(curso);
    setShow(true);
  };

  const fetchCursos = () => {
    const token = localStorage.getItem("@Auth:token")

    api.get('/list-cursos', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
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
    swal({
      title: "Confirmação",
      text: "Você está prestes a excluir este curso. Deseja continuar?",
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
      const token = localStorage.getItem("@Auth:token")
      if (willDelete) {
        try {
          api.delete(`/delete-curso/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`, // Substitua 'token' pelo seu token
            }
          }).then(() => {
            fetchCursos();
          });
        } catch (err) {
          console.log(err);
        }
      }
    });
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h4 className='mb-3'>Veja aqui os principais cursos e suas notas de cortes </h4>
        {userRole === 'Admin' && (
          <React.Fragment>
            <button className='btn btn-success mb-4' onClick={handleShowCadCurso}>Novo</button>
          </React.Fragment>
        )}

      </div>
      {cursos.length > 0 && (
        <React.Fragment>
          <select className='btn' value={ordenacao} onChange={handleOrdenacaoChange}>
            <option value="asc">Nota: menor para maior</option>
            <option value="desc">nota: maior para menor</option>
          </select>
        </React.Fragment>
      )}

      {cursos.length > 0 ? (<table className="table" style={{ borderRadius: '15px' }}>

        <thead>
          <tr>
            <th scope="col">Curso</th>
            <th scope='col'>Faculdade</th>
            <th scope="col">Nota de corte</th>
            <th scope='col'>Ações</th>
          </tr>
        </thead>
        <tbody>
          {cursosOrdenados.map((curso) => (
            <tr key={curso.id}>
              <td>{curso.nome}</td>
              <td>{curso.faculdade}</td>
              <td>{curso.notaDeCorte}</td>
              {userRole === 'Cliente' && (
                <React.Fragment>
                  <td><Link onClick={() => handleShow(curso)}>Sobre o curso</Link></td>
                </React.Fragment>
              )}

              {userRole === 'Admin' && (
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
      </table>) : (
        <p className='text-danger'>Não há nenhum curso a ser exibido</p>
      )}


      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{cursoInfo.nome}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {cursoInfo.descricao ? (
            cursoInfo.descricao
          ) : (
            <p>A descrição para este curso ainda não foi informada.</p>
          )}


        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>



      <Modal show={showCadCurso} onHide={handleCloseCadCurso}> {/* Adicione este modal */}
        <Modal.Header closeButton>
          <Modal.Title>Cadastrar curso</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CadCurso />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCadCurso}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
      {editCursoId && <EditCurso cursoId={editCursoId} onClose={handleCloseEdit} />}
    </div>
  );
}

export default ListCursos;
