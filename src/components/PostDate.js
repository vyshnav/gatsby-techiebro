import React from 'react'
import styled from 'styled-components'


const Date = styled.p`
  display: block;  
  font-size: .75rem!important;
  color: #999!important;
  margin: 0 auto !important;
  max-width: ${props => props.theme.sizes.maxWidthCentered};

  @media only screen and (max-width: 700px){
    padding: 0 1rem !important;
  }
`

const PostDate = props => {
  return (   
      <Date>
        Posted on {props.date}
      </Date>   
  )
}

export default PostDate
