import React, { useEffect, useState } from 'react';
import axios from 'axios';

const listUsuarios = () => {
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
      {usuarios.map((usuario) => (
        <div key={usuario.id}>
          <p>Email: {usuario.email}</p>
          <p>Nível de Acesso: {usuario.nivelacesso}</p>
        </div>
      ))}
    </div>
  )
}

export default listUsuarios