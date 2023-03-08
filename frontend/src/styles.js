import styled from "styled-components";


export const ContainerStyle = styled.main`
 min-height: 60vh;
 padding: 1em 2em 3em;
 max-width: 1200px;
 margin: 0 auto;
`

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
`

export const RegisterStyled = styled.section`
  
`
