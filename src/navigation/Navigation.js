import React from 'react'
import { Link } from 'react-router-dom'

import styled from 'styled-components'

const Navbar = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`

const LinkContainer = styled.div`
  margin: 20px;
`

export default function Navigation() {
  return (
    <Navbar>
      <LinkContainer>
        <Link to="/">Home</Link>
      </LinkContainer>
      <LinkContainer>
        <Link to="/book">Book</Link>
      </LinkContainer>
    </Navbar>
  )
}
