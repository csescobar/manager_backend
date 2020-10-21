import React, { FormEvent } from 'react';
import { useHistory } from 'react-router-dom';

const Main = () => {
  const history = useHistory();

  function handleButton(e: FormEvent) {
    e.preventDefault();
    history.push('/celulas');
  }
  return (
    <div>
      <h1>Usuário logado</h1>
      <button onClick={handleButton} >Seguir</button>
    </div>
  )
}

export default Main;
