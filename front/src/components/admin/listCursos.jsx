import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import EditCurso from './editCurso';
import { api } from '../../services/api';
import { Link } from 'react-router-dom';
import swal from 'sweetalert'; // Importe o swal se ainda não estiver sendo importado
import { Modal, Button } from 'react-bootstrap';
import CadCurso from './cadCurso';

const ListCursos = () => {
  const [cursos, setCursos] = useState([]);
  const [editCursoId, setEditCursoId] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [show, setShow] = useState(false);
  const [cursoInfo, setCursoInfo] = useState({ nome: '', descricao: '' });
  const [showCadCurso, setShowCadCurso] = useState(false);
  const [ordenacao, setOrdenacao] = useState('asc');
  const [cursosOrdenados, setCursosOrdenados] = useState([]);
  const [pesquisa, setPesquisa] = useState('');
  const [ano, setAno] = useState('');
  const [faculdades, setFaculdades] = useState([]);
  const [faculdade, setFaculdade] = useState('');
  const [nomeCurso, setNomeCurso] = useState(''); // Novo estado para o filtro de nome de curso
  const [cursoOpcoes, setCursoOpcoes] = useState([]); // Estado para armazenar as opções de curso

  useEffect(() => {
    ordenarCursos();
  }, [cursos, ordenacao]);

  useEffect(() => {
    fetchCursos();
    fetchFaculdades();
    fetchCursoOpcoes(); // Buscar as opções de curso
    const user = JSON.parse(localStorage.getItem('@Auth:user'));
    const role = user ? user.nivelacesso : null;
    setUserRole(role);
  }, []);

  useEffect(() => {
    fetchCursos();
  }, [pesquisa, ano, faculdade, nomeCurso]); // Atualiza os cursos sempre que o termo de pesquisa, ano, faculdade ou nome do curso mudar

  const ordenarCursos = () => {
    const cursosOrdenados = [...cursos];
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
    setOrdenacao(event.target.value);
  };

  const fetchCursos = () => {
    const token = localStorage.getItem("@Auth:token");
    let query = pesquisa ? `?q=${pesquisa}` : '';
    if (ano) {
      query += pesquisa ? `&ano=${ano}` : `?ano=${ano}`;
    }
    if (faculdade) {
      query += (pesquisa || ano) ? `&faculdade=${faculdade}` : `?faculdade=${faculdade}`;
    }
    if (nomeCurso) { // Adiciona o filtro por nome de curso à query string
      query += (pesquisa || ano || faculdade) ? `&nome=${nomeCurso}` : `?nome=${nomeCurso}`;
    }

    api.get(`/list-cursos${query}`, {
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

  const fetchFaculdades = () => {
    const token = localStorage.getItem("@Auth:token");

    api.get('/faculdades', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      const data = response.data;
      if (!data.erro) {
        setFaculdades(data.data);
      } else {
        console.error(data.mensagem);
      }
    })
    .catch(error => {
      console.error('Erro ao buscar faculdades:', error);
    });
  };

  const fetchCursoOpcoes = () => { // Função para buscar as opções de curso
    const token = localStorage.getItem("@Auth:token");

    api.get('/cursos', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      const data = response.data;
      if (!data.erro) {
        setCursoOpcoes(data.data);
      } else {
        console.error(data.mensagem);
      }
    })
    .catch(error => {
      console.error('Erro ao buscar opções de curso:', error);
    });
  };

  const handleEdit = (cursoId) => {
    setEditCursoId(cursoId);
    fetchCursos();
  };

  const handleCloseEdit = () => {
    setEditCursoId(null);
    fetchCursos();
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
          className: "red-button",
          closeModal: true,
        },
      },
    }).then((willDelete) => {
      const token = localStorage.getItem("@Auth:token")
      if (willDelete) {
        try {
          api.delete(`/delete-curso/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`
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

  const handleShowCadCurso = () => setShowCadCurso(true);
  const handleCloseCadCurso = () => setShowCadCurso(false);

  const handleClose = () => setShow(false);
  const handleShow = (curso) => {
    setCursoInfo(curso);
    setShow(true);
  };

  const handlePesquisaChange = (event) => {
    setPesquisa(event.target.value);
  };

  const handleAnoChange = (event) => {
    setAno(event.target.value);
  };

  const handleFaculdadeChange = (event) => {
    setFaculdade(event.target.value);
  };

  const handleNomeCursoChange = (event) => { // Função para lidar com a mudança no nome do curso
    setNomeCurso(event.target.value);
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

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        
        <div>
        <span className='btn'>Filtrar por:</span>
          <select className='btn' value={ordenacao} onChange={handleOrdenacaoChange}>
            <option value="asc">Nota: menor para maior</option>
            <option value="desc">Nota: maior para menor</option>
          </select>
        </div>
        <div>
          <span className='btn'>Filtrar por ano</span>
          <select className='btn' value={ano} onChange={handleAnoChange}>
            <option value="">Sem filtros</option>
            {Array.from({ length: 14 }, (_, i) => 2010 + i).map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
        <div>
          <span className='btn'>Filtrar por faculdade</span>
          <select className='btn' value={faculdade} onChange={handleFaculdadeChange}>
            <option value="">Sem filtros</option>
            {faculdades.map(fac => (
              <option key={fac.faculdade} value={fac.faculdade}>{fac.faculdade}</option>
            ))}
          </select>
        </div>
        <div>
          <span className='btn'>Filtrar por curso</span>
          <select className='btn' value={nomeCurso} onChange={handleNomeCursoChange}>
            <option value="">Sem filtros</option>
            {cursoOpcoes.map(opcao => (
              <option key={opcao.id} value={opcao.nome}>{opcao.nome}</option>
            ))}
          </select>
        </div>
      </div>

      {cursos.length > 0 ? (
        <table className="table table-responsive" style={{ borderRadius: '15px' }}>
          <thead>
            <tr>
              <th scope="col">Curso</th>
              <th scope='col'>Faculdade</th>
              <th scope='col'>Ano</th>
              <th scope="col">Nota de corte</th>
              <th scope='col'>Ações</th>
            </tr>
          </thead>
          <tbody>
            {cursosOrdenados.map((curso) => (
              <tr key={curso.id}>
                <td>{curso.nome}</td>
                <td>{curso.faculdade}</td>
                <td>{curso.ano}</td>
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
        </table>
      ) : (
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
      <Modal show={showCadCurso} onHide={handleCloseCadCurso}>
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
