import React from 'react'
import { IconBase } from 'react-icons/lib'
import styled from 'styled-components'
export const Navbar = () => {
  return (
    <Nav>
        <Icon>
            SnAplY
        </Icon>
        <Logup>
            Signup
        </Logup>
    </Nav>
  )
}

const Nav = styled.div`
    height:10vh;
    width:100vw;   
    color:white;
    display: flex;
    justify-content: space-between;
    
`
const Icon = styled.div`
    width:30%;
    font-family:'Agbalumo', sans-serif; 
    font-size:80px;
    
`

const Logup = styled.div`
    width:40%;
`
