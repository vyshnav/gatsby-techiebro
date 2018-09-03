import React from 'react'
import styled from 'styled-components'
import Link from 'gatsby-link'
import { Label } from 'semantic-ui-react'

const List = styled.ul`
  margin: 0 auto 2em auto;
  max-width: ${props => props.theme.sizes.maxWidthCentered};
`

const Tag = styled(Label)` 
  color: #046fc2 !important;
  background-color: #ed362400 !important
  border-radius: 3px !important;
  padding: .4833em .1em !important;
  font-weight: 300 !important;
  a {
    opacity: 1 !important;
    text-transform: capitalize;
    margin: 0;
    text-decoration: none;  
    &:hover{      
      color: #044d86 !important;
    } 
  }
`

const TagList = props => {
  return (
    <List>
      {props.tags.map(tag => (
        <Tag key={tag.id}>
          <Link to={`/${tag.node_locale}/tag/${tag.slug}/`}>#{tag.title}</Link>
        </Tag>
      ))}
    </List>
  )
}

export default TagList
