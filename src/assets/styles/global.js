import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  *{
    margin:0;
    padding:0;
    box-sizing: border-box;
    font-family: 'Sora', sans-serif;
  }

  body {
    font-size: 16px;
    background: ${({ theme }) => theme.colors.backgroundColor};
    color: ${({ theme }) => theme.colors.gray[900]}; // Quando uma chave começa com número, acessa com []
  }

  button {
    cursor: pointer;
  }
`;
