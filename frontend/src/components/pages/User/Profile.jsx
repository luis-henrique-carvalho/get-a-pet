import { useState, useEffect } from "react";

import { FormStyled } from "../../../styles";
import api from '../../../utils/api'
import Input from "../../form/Input";

const Profile = () => {
  const [user, setUser] = useState({});
  const [token] = useState(localStorage.getItem("token") || "");
  
  useEffect(()=>{
    api.get('users/checkuser', {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    }).then((response) => {
      setUser(response.data)
    })
  },[token])

  function onFileChange(e) {
    setUser({ ...user, [e.target.name]: e.target.files[0] });
  }

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault()

  }

  return (
    <FormStyled>
      <h1>Perfil</h1>
      <p>Preview Imagem</p>
      <form onSubmit={handleSubmit}>
        <Input
          text="imagem"
          type="file"
          name="image"
          handleOnChange={onFileChange}
        />
        <Input
          text="E-mail"
          type="email"
          name="email"
          placeholder="Digite o seu e-mail"
          handleOnChange={handleChange}
          value={user.email || ""}
        />
        <Input
          text="Nome"
          type="text"
          name="name"
          placeholder="Digite o seu nome"
          handleOnChange={handleChange}
          value={user.name || ""}
        />

        <Input
          text="Telefone"
          type="text"
          name="phone"
          placeholder="Digite o seu telefone"
          handleOnChange={handleChange}
          value={user.phone || ""}
        />

        <Input
          text="Senha"
          type="password"
          name="password"
          placeholder="Digite a sua senha"
          handleOnChange={handleChange}
          value={user.password || ""}
        />

        <Input
          text="Confirmação de senha"
          type="password"
          name="confirmpassword"
          placeholder="Confirme sua senha"
          handleOnChange={handleChange}
          value={user.confirmpassword || ""}
        />
        <input type="submit" value="Editar" />
      </form>
    </FormStyled>
  );
};

export default Profile;
