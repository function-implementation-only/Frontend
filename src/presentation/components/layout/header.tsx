import { useState } from 'react';
import styled from 'styled-components';

const HeaderStyled = styled.div`
    --box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    a {
        text-decoration: none;
        color: #3a3a3a
    }
    position: sticky;
    top: 0px;
    z-index: 10;
    width: 100%;
    background-color: rgb(255 255 255);
    padding-left: 1rem;
    padding-right: 1rem;
    box-shadow: var(--box-shadow);


    .root-header-nav {
        margin-left: auto;
        margin-right: auto;
        justify-content: space-between;
        padding-top: 1rem;
        padding-bottom: 1rem;
        max-width: 56rem;
        display: flex;
        align-items: center;
    }

    .root-header-link { 
        display: inline-block;
    }
`


export default function Header() {
  return (
    <HeaderStyled>
      <nav className="root-header-nav">
        <a href="/">
          Join Us
        </a>
      </nav>
    </HeaderStyled>
  );
}
