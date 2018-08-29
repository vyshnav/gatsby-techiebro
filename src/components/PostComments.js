import React from "react";
import styled from 'styled-components'
import PropTypes from 'prop-types';
import theme from '../styles/theme'
import FacebookProvider, { Comments } from "react-facebook";
import CommentsLoader from "../components/CommentsLoader";
import comments from '../images/comments.gif'
import config from '../utils/siteConfig'

const Wrapper = styled.div` 
  margin: 0 auto;
  max-width: ${props => props.theme.sizes.maxWidthCentered};

  .fb-comments {      
    span{
      background-image: url(${comments});
      background-position: center;
      background-repeat: no-repeat;
      background-size: 30%;
      display:block;
    } 
    
  }
  .fb-comments[fb-xfbml-state="rendered"] {
    span{
      background-image: none;
      padding: 0;
  }
`

class PostComments extends React.Component {

  constructor() {
    super()
    this.state = { loading:true}
  }
  

  componentWillMount() {     
    console.log("componentwillMount");
    this.state = { loading:true}   
  }

  componentDidMount() {
    console.log("componentDidMount");
    setTimeout(() => this.setState({loading: false}))
  }

  render() {
    const props = this.props;
    return (

    <Wrapper>      
        <FacebookProvider appId={props.facebook}>
        <Comments
          href={`${config.siteUrl}${props.slug}`}
          width="100%"
          colorScheme={theme.colors.fbCommentsColorscheme}
        />
      </FacebookProvider>     
    </Wrapper>
  );
  }
}

export default PostComments;
