import React from "react";
import {InputStyled} from '../../styles'
 
const Input = ({
  type,
  text,
  name,
  placeholder,
  handleOnChange,
  value,
  multiple,
}) => {
  return (
    <InputStyled>
      <label htmlFor={name}>{text}:</label>
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        onChange={handleOnChange}
        value={value}
        {...(multiple ? (multiple) : '')}
      />
    </InputStyled>
  );
};

export default Input;
