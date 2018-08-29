import React from "react";
import styled from 'styled-components'
import theme from '../styles/theme'
import FacebookProvider, { Comments } from "react-facebook";
import config from '../utils/siteConfig'

const Wrapper = styled.div` 
  margin: 0 auto;
  max-width: ${props => props.theme.sizes.maxWidthCentered};
`

const PostComments = props => {
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
};



export default PostComments;
