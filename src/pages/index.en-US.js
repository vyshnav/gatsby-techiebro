import React from 'react'
import { Item } from 'semantic-ui-react'
import CardList from '../components/CardList'
import Card from '../components/Card'
import Container from '../components/Container'
import PageTitle from '../components/PageTitle'
import SEO from '../components/SEO'

const Index = ({ data }) => {
  const posts = data.allContentfulPost.edges

  return (
    <div>
      <SEO />
      <Container>        
        <Item.Group link divided unstackable>
          {posts.map(({ node: post }) => (
            <Card
              key={post.id}
              locale={post.node_locale}
              slug={post.slug}
              image={post.heroImage}
              title={post.title}
              date={post.publishDate}
              excerpt={post.body}
            />
          ))}
       </Item.Group>       
      </Container>
    </div>
  )
}

export const query = graphql`
  query PageEnUsQuery {
    allContentfulPost(
      limit: 1000
      sort: { fields: [publishDate], order: DESC }
      filter: { node_locale: { eq: "en-US" } }
    ) {
      edges {
        node {
          title
          id
          node_locale
          slug
          publishDate(formatString: "MMMM DD, YYYY")
          heroImage {
            title
            sizes(maxWidth: 1800) {
              ...GatsbyContentfulSizes_withWebp
            }
          }
          body {
            childMarkdownRemark {
              html
              excerpt(pruneLength: 200)
            }
          }
        }
      }
    }    
  }
`

export default Index

