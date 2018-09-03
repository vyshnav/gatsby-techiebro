import React from 'react'
import { Item } from 'semantic-ui-react'
import Card from '../components/Card'
import Container from '../components/Container'
import SEO from '../components/SEO'
import { TransitionGroup, Transition } from 'react-transition-group';

class Index extends React.Component{
 constructor(props) {
  super(props);
  console.log(this.props);
  const posts = this.props.data.allContentfulPost.edges
  this.state = { posts};

  
  console.log(this.state.posts);
}    
 
 

 render() {
  return (
    <div>
      <SEO />
      <Container>  
   
      
        <Item.Group link divided unstackable>   
          {this.state.posts.map(({ node: post} , index) => (                        
                           <Card 
                                          key={ post.id }
                                          locale={post.node_locale}
                                          slug={post.slug}
                                          image={post.heroImage}
                                          title={post.title}
                                          date={post.publishDate}
                                          excerpt={post.body}
                                          index={index}
                                        />    

          ))}
          </Item.Group>
       
      </Container>

    </div>
  )
  }
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

