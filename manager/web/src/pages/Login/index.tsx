import React, { useState, FormEvent, useContext } from 'react';
import { useHistory } from 'react-router-dom';


import Input from '../../components/Input';
import PageHeader from '../../components/PageHeader';
import warningIcon from '../../assets/images/icons/warning.svg';

import './styles.css';
import StoreContext from '../../components/Store/Context';
//import { Link } from 'react-router-dom';

function Login(userName: string, password: string) {
  if (userName === 'admin' && password === 'admin') {
    return { token: '1234' }
  }
  return { error: 'Usuário ou senha inválidos' }
}

function UserLogin() {
  const history = useHistory();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [erro, setErro] = useState('');
  const { setToken } = useContext(StoreContext);

  async function handleLogin(e: FormEvent) {
    e.preventDefault();

    const { token, error } = Login(userName, password);

    if (token) {
      setToken(token);
      return history.push('/main');
    }
    if (error) {
      setToken('');
      setErro(error);
      setUserName('');
      setPassword('');
    }
  }
  return (
    <div id="page-login" className="page-container">
      <PageHeader />
      <main>
        <form onSubmit={handleLogin}>
          <fieldset>
            <legend>Login</legend>
            <Input
              name='username'
              placeholder='Usuário'
              value={userName}
              onChange={e => {
                setUserName(e.target.value);
              }}
            />
            <Input
              name='password'
              type="password"
              placeholder='Senha'
              value={password}
              onChange={e => {
                setPassword(e.target.value);
              }}
            />
          </fieldset>
          {erro && (
            <div className="user-login__error">{erro}</div>
          )}
          <footer>
            <p>
              <img src={warningIcon} alt="Aviso importante" />
              Importante! <br />
              Preencha os dados
            </p>

            <button type='submit'>Entrar</button>
          </footer>
        </form>
      </main>
    </div>
  );
}

export default UserLogin;