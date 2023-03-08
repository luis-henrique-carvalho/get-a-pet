import styled from "styled-components";

export const ContainerStyle = styled.main`
  min-height: 60vh;
  padding: 1em 2em 3em;
  max-width: 1200px;
  margin: 0 auto;
`;

export const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  padding: 1em 1.5em;
  background-color: #ffd400;
  color: #16479d;

  .navbar_logo {
    display: flex;
    align-items: center;
  }

  .navbar_logo img {
    width: 40px;
    margin-right: 0.8em;
  }

  ul {
    display: flex;
    align-items: center;
    list-style: none;
  }

  li,
  a {
    text-decoration: none;
    color: #16479d;
    font-weight: bold;
    cursor: pointer;
    transition: 0.5s;
    padding: 0.5em 0.8em;
    border-radius: 5px;
  }

  li:hover {
    background-color: #16479d;
    color: white;
  }

  li:hover > a {
    color: white;
  }
`;

export const FooterStyled = styled.footer`
  display: flex;
  height: 250px;
  align-items: center;
  justify-content: center;
  background-color: #eee;
  border-top: 1px solid #666;
`;

export const RegisterStyled = styled.section`
  max-width: 300px;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;

  form {
    width: 100%;
  }

  input[type="submit"] {
    border-radius: 8px;
    color: #fff;
    min-height: 100px;
    min-height: 2.5em;
    background-color: #25b456;
    width: 100%;
    cursor: pointer;
    font-size: 1.1em;
    font-weight: bold;
  }

  input[type="submit"]:hover {
    background-color: #1c8a42;
  }
  p {
    margin-top: 1em;
  }
  p a {
    color: #16479d;
    font-weight: bold;
  }
`;

export const InputStyled = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1em;

  label {
    margin-bottom: 0.3em;
    font-weight: bold;
    font-size: 0.8em;
  }

  input {
    padding: 0.7em;
    border: 1px solid #777;
    border-radius: 5px;
  }

  input::placeholder {
    color: #7b7b7b;
  }
`;
