import { useState } from "react";
import { PetFormStyled } from "../../styles";

import Input from "./Input";

const PetForm = ({ handleSubmit, petData, btnText }) => {
  const [pet, setPet] = useState(petData || {});
  const [preview, setPreview] = useState([]);
  const colors = ["Branco", "Preto", "Cinza", "Caramelo", "Mesclado"];

  function onFileChange(e) {}

  return (
    <PetFormStyled>
      <Input
        text="Imagens do Pet"
        type="file"
        name="images"
        handleOnChange={onFileChange}
        multiple={true}
      />
       <Input
        text="Imagens do Pet"
        type="file"
        name="images"
        handleOnChange={onFileChange}
      />
       <Input
        text="Imagens do Pet"
        type="file"
        name="images"
        handleOnChange={onFileChange}
      />
    </PetFormStyled>
  );
};

export default PetForm;
