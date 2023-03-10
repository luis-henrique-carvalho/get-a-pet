import { useContext, useState } from "react";
import { Link } from "react-router-dom";

import { Context } from "../../../context/UserContext";
import { FormStyled } from "../../../styles";

import Input from "../../form/Input";

const Login = () => {
  const [user, setUser] = useState({});
  const { login } = useContext(Context);


  const handleSubmit = (e) => {
    e.preventDefault()
    login(user)
  }

  const handleChange = (e) => {
    setUser({...user, [e.target.name]: e.target.value})
  };

  return (
    <FormStyled>
      <h1>login</h1>
      <form onSubmit={handleSubmit}>
        <Input
          text="E-mail"
          type="email"
          name="email"
          placeholder="Digite seu email"
          handleOnChange={handleChange}
        />

        <Input
          text="Senha"
          type="password"
          name="password"
          placeholder="Digite sua senha"
          handleOnChange={handleChange}
        />

        <input type="submit" value="Entrar" />
      </form>
      <p>
        Não tem conta? <Link to={"/register"}>Clique aqui</Link>
      </p>
    </FormStyled>
  );
};

export default Login;
