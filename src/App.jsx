import { useForm } from "react-hook-form";
import { useState } from 'react';

import './App.css';

function App() {

  const { register, handleSubmit } = useForm();
  const [welcome, setWelcome] = useState(false);
  const [name, setName] = useState('');

  const checkUser = () => {
    const userName = localStorage.getItem("name");
    
    if(userName){
      setWelcome(true);
      const userNameConverted = JSON.parse(userName);
      setName(userNameConverted.name);
    } else{
      setWelcome(false);
    }
  }

  const sendDataLocalStorage = (data) => {

    const dataString = JSON.stringify(data); // Converted to string

    localStorage.setItem("name", dataString);

    checkUser();
  }

  const remove = ()=>{
    localStorage.removeItem("name");
    setName('');
    checkUser();
  }

  return (
    <div className="container">
      <h1>Entendendo os dados no Local Storage</h1>
      {!welcome ? (
        <>
          <p>
            Para entender de maneira prática, digite seu nome no input abaixo.
          </p>
          <div className="container_form">
            <form className="form" onSubmit={ handleSubmit(sendDataLocalStorage) }>
              <label>Nome:</label>
              <input
                  type="text"
                  placeholder="Digite seu nome"
                  { ...register("name") }
                  required
                />
              <button type="submit">Enviar</button>
            </form>
          </div>
        </>
      ):
      (
        <div className="container_welcome">
          <p>Seja bem-vindo <span><b>{name}</b></span>!</p>
          <span>
            De maneira sucinta a diferença entre Local e Session Storage é a persistência de dados! <br/>
            <strong>Local:</strong> Persiste os dados no navegador, mesmo após fechar a aba ou navegador. PATH: Inspect &gt; Application &gt; Local Storage.
            <br/>
            <strong>Session:</strong> Persiste os dados no navegador, mas após fechar aba ou navegador eles são perdidos. PATH: Inspect &gt; Application &gt; Session Storage.
          </span>
          <br/>
          <p>Após clicar em <b>Sair</b> os seus dados serão removidos do Local Storage.</p>

          <button onClick={ remove }>
            Sair
          </button>
        </div>
      )}
    </div>
  );
}

export default App
