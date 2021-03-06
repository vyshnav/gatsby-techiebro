import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.section`
  margin: 0 auto;
  max-width: ${props => props.theme.sizes.maxWidth};
  padding: 0;

  @media (min-width: 767px) {
    padding: 2rem 1rem 1.5rem; 
  }
`

const Container = props => {
  return <Wrapper>{props.children}</Wrapper>
}

export default Container
