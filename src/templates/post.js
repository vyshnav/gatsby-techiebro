import React from 'react'
import find from 'lodash/find'
import Helmet from 'react-helmet'
import config from '../utils/siteConfig'
import Hero from '../components/Hero'
import Container from '../components/Container'
import PageBody from '../components/PageBody'
import TagList from '../components/TagList'
import PostLinks from '../components/PostLinks'
import PostComments from "../components/PostComments";
import PostDate from '../components/PostDate'
import SEO from '../components/SEO'

const PostTemplate = ({ data }) => {
  const {
    title,
    slug,
    node_locale,
    id,
    heroImage,
    body,
    publishDate,
    tags,
  } = data.contentfulPost
  const postNode = data.contentfulPost

  const postIndex = find(
    data.allContentfulPost.edges,
    ({ node: post }) => post.id === id
  )

  const facebook = (((data || {}).site || {}).siteMetadata || {}).facebook;
  
  return (
    <div>
      <Helmet>
        <title>{`${title} - ${config.siteTitle}`}</title>
      </Helmet>
      <SEO pagePath={slug} postNode={postNode} postSEO />

      <Hero title={title} image={heroImage} height={'50vh'} />

      <Container>
        {tags && <TagList tags={tags} />}
        <PostDate date={publishDate} />
        <PageBody body={body} />
        <PostComments slug={slug} facebook={facebook} />
        <PostLinks locale={node_locale} previous={postIndex.previous} next={postIndex.next} />
      </Container>
    </div>
  )
}

export const query = graphql`
  query postQuery($slug: String! $locale:String!) {
    contentfulPost(slug: { eq: $slug } node_locale: { eq: $locale }) {
      title
      id
      slug   
      node_locale  
      metaDescription {
        internal {
          content
        }
      }
      publishDate(formatString: "MMMM DD, YYYY")
      publishDateISO: publishDate(formatString: "YYYY-MM-DD")
      tags {
        title
        id
        slug
        node_locale
      }
      heroImage {
        title
        sizes(maxWidth: 1800) {
          ...GatsbyContentfulSizes_withWebp_noBase64
        }
        ogimg: resize(width: 1800) {
          src
          width
          height
        }
      }
      body {
        childMarkdownRemark {
          html
          excerpt(pruneLength: 320)
        }
      }
    }
    allContentfulPost(
      limit: 1000
      sort: { fields: [publishDate], order: DESC }
      filter: { node_locale: { eq: $locale } }
    ) {
      edges {
        node {
          id
        }
        previous {
          slug
        }
        next {
          slug
        }
      }
    }
    site {
      siteMetadata {
        facebook {
          appId
        }
      }
    }
  }
`

export default PostTemplate
