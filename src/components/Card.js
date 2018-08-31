import React from 'react'
import { Item } from 'semantic-ui-react'
import Link from 'gatsby-link'
import Img from 'gatsby-image'



const Card = props => {
  return (  

  

    <Item as={ Link } to={`/${props.locale}/${props.slug}/`}>      
        <Item.Image size="medium">
        <Img  outerWrapperClassName='card__image'
              sizes={props.image.sizes}
              alt={props.title}
              style={{
                background: `'#ffffff'}`,
                height:'100%'
              }}
            />
        </Item.Image>
        <Item.Content>
          <Item.Header>{props.title}</Item.Header>
            <Item.Description
                dangerouslySetInnerHTML={{
                  __html: props.excerpt.childMarkdownRemark.excerpt,
                }}
              >
            </Item.Description>            
            <Item.Meta content={props.date} />
        </Item.Content>      
    </Item> 
  )
}

export default Card
