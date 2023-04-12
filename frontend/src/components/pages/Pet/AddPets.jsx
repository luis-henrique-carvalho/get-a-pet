import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useFlashMessage from "../../../hooks/useFlashMessage";

import api from "../../../utils/api";

import { AddPetsStyled } from "../../../styles";

import PetForm from "../../form/PetForm";


const AddPets = () => {
  return (
    <AddPetsStyled>
      <div >
        <h1>Cadastre seu PET</h1>
        <p>Depois ele ficará disponivel para adoção</p>
      </div>
      <PetForm/>
    </AddPetsStyled>
  );
};

export default AddPets;
