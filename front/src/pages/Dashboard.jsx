import React, { useEffect, useState } from 'react';
import axios from 'axios';

import ListUsuarios from '../components/listUsuarios';
import ListCursos from '../components/listCursos';
import CadCurso from '../components/cadCurso';

function App() {


  return (
    <>
      <CadCurso/>
      <ListCursos/>
    </>
  );
}

export default App;
