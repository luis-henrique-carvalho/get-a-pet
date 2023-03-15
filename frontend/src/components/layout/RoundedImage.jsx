import { RoundImageStyled } from "../../styles";

const RoundedImage = ({ src, alt, width }) => {
  return (
    <RoundImageStyled
      src={`${src}`}
      alt={`${alt}`}
      width={`${width}`}/>
  );
};

export default RoundedImage;
