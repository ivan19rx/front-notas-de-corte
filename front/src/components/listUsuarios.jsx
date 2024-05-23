import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { FaEdit, FaTrash } from 'react-icons/fa';

const ListUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);

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

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
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
              <td>{usuario.nome}</td>
              <td>{usuario.email}</td>
              <td>{usuario.senha}</td>
              <td>{usuario.nivelacesso}</td>
              <td><button className="btn btn-primary"><FaEdit /></button>
                <button className="btn btn-danger"><FaTrash /></button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListUsuarios;
