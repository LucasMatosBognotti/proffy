import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;

  color: var(--color-text-in-primary);
  background: var(--color-primary);

  @media (min-width: 1110px) {
    grid-area: logo;
    align-self: center;
    margin: 0;
  }
`;

export const Content = styled.div`
  width: 90vw;
  max-width: 700px;

  > img {
    width: 100%;
  }

  > span {
    font-size: 1.4rem;

    display: flex;
    align-items: center;
    justify-content: center;

    img {
      margin-left: 0.8rem;
    }
  }

  @media (min-width: 1110px) {
    max-width: 1110px;

    display: grid;
    grid-template-rows: 350px 1fr;
    grid-template-columns: 2fr 1fr 1fr;
    grid-template-areas:
      "logo hero hero"
      "button button total"
    ;


  }
`;

export const Logo = styled.div`
  text-align: center;
  margin-top: 3rem;
  
  img {
    height: 8rem;
  }

  h2 {
    font-weight: 500;
    font-size: 2.4rem;
    line-height: 4.6rem;
  }

  @media (min-width: 1110px) {
    
  }
`;

export const Buttons  = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;

  a {
    width: 30rem;
    height: 10rem;
    border-radius: 0.8rem;
    font: 700 2.0rem Archivo;
    
    display: flex;
    align-items: center;
    justify-content: center;

    text-decoration: none;
    color: var(--color-button-text);

    transition: background-color 0.2s;

    &:first-child {
      margin-right: 1.6rem;
      background: var(--color-primary-lighter);
      
      &:hover {
        background: var(--color-primary-light);
      }
    }

    &:last-child {
      background: var(--color-secundary);

      &:hover {
        background: var(--color-secundary-dark);
      }
    }

    img {
      width: 4rem;
    }
  }

  @media (min-width: 1110px) {}
`;
