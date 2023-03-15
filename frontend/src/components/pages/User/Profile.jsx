import { useState, useEffect } from "react";

import { FormStyled } from "../../../styles";
import api from "../../../utils/api";
import Input from "../../form/Input";

import useFlashMessage from '../../../hooks/useFlashMessage'

const Profile = () => {
  const [user, setUser] = useState({});
  const [preview, setPreview] = useState('');
  const [token] = useState(localStorage.getItem("token") || "");
  const { setFlashMessage } = useFlashMessage();

  useEffect(() => {
    api
      .get("users/checkuser", {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setUser(response.data);
      });
  }, [token]);

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value })
  }


  function onFileChange(e) {
    setPreview(e.target.files[0])
    setUser({ ...user, [e.target.name]: e.target.files[0] })
  }

  async function handleSubmit(e) {
    e.preventDefault();

    let msgType = "success";

    const formData = new FormData();

    const userFormData = await Object.keys(user).forEach((key) =>
      formData.append(key, user[key]),
    )

    formData.append('user', userFormData)

    const data = await api
      .patch(`/users/edit/${user._id}`, formData, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        console.log(response.data)
        return response.data
      })
      .catch((err) => {
        console.log(err)
        msgType = 'error'
        return err.response.data
      })


    setFlashMessage(data.message, msgType);
  }

  return (
    <FormStyled>
      <h1>Perfil</h1>
      {(user.image || preview) && (
          <img
            src={
              preview
                ? URL.createObjectURL(preview)
                : `${process.env.REACT_APP_API}/images/users/${user.image}`
            }
            alt={user.name}
          />
        )}
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
