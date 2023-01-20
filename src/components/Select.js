import styled from "styled-components";

export default styled.select`
  width: 100%;
  background: #fff;
  height: 52px;
  border: 2px solid #fff;
  box-shadow: 0 4px 10px rgba(0,0,0,0.04);
  border-radius: 4px;
  outline: none;
  padding: 0 16px;
  font-size: 16px;
  transition: border-color 0.2s ease-in;
  appearance: none; // Ignora todos os estilos padrões que o navegador tenta pegar do elemento

  &:focus{
    border: 2px solid ${({theme}) => theme.colors.primary.main};
  }
`;
