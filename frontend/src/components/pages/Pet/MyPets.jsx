import { useState, useEffect } from "react";
import { MyPetsStyled } from "../../../styles";
import { Link } from "react-router-dom";

const MyPets = () => {
  const [pets, setPets] = useState([]);

  return (
    <MyPetsStyled>
      <h1>my pets</h1>
      <Link to="/pet/add">Cadastrar Pets</Link>
      <div>
        {pets.length > 0 && <p>Meus Pets cadastrados</p>}
        {pets.length === 0 && <p>Não há Pets cadastrados</p>}
      </div>
    </MyPetsStyled>
  );
};

export default MyPets;
