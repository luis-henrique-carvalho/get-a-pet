import { useState, useContext } from "react";
import { Link } from "react-router-dom";

import { RegisterStyled } from "../../../styles";

import Input from "../../form/Input";

import { Context } from "../../../context/UserContext";

const Register = () => {
  const [user, setUser] = useState({});
  const { register } = useContext(Context);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    register(user);
    // enviando o usuário
  };

  return (
    <RegisterStyled>
      <h1>Registrar</h1>
      <form onSubmit={handleSubmit}>
        <Input
          text="Nome"
          type="text"
          name="name"
          placeholder="Digite o seu nome"
          handleOnChange={handleChange}
        />

        <Input
          text="Telefone"
          type="text"
          name="phone"
          placeholder="Digite o seu telefone"
          handleOnChange={handleChange}
        />

        <Input
          text="E-mail"
          type="email"
          name="email"
          placeholder="Digite o seu e-mail"
          handleOnChange={handleChange}
        />

        <Input
          text="Senha"
          type="password"
          name="password"
          placeholder="Digite a sua senha"
          handleOnChange={handleChange}
        />

        <Input
          text="Confirmação de senha"
          type="password"
          name="confirmpassword"
          placeholder="Confirm sua senha"
          handleOnChange={handleChange}
        />

        <input type="submit" value={"Cadastrar"} />
      </form>
      <p>
        Já tem conta <Link to={"login"}>Clique aqui</Link>
      </p>
    </RegisterStyled>
  );
};

export default Register;
