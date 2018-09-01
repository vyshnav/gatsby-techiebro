import React from 'react'
import Img from 'gatsby-image'
import styled from 'styled-components'

import { Header } from 'semantic-ui-react'

const Wrapper = styled.section`
  position: relative;
  min-height: 300px;
  @media (max-width: ${props => props.theme.responsive.medium}) {  
    min-height: 200px;
  }
`
const BgImg = styled(Img)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 200px;

  height: auto;
  @media (min-width: ${props => props.theme.responsive.small}) {
    height: ${props => props.height || 'auto'};   
  }
  @media (max-width: ${props => props.theme.responsive.medium}) {
    height: ${props => props.height || 'auto'};
    max-height: 200px;
  }
  & > img {
    object-fit: ${props => props.fit || 'cover'} !important;
    object-position: ${props => props.position || '50% 50%'} !important;
  }
  &:before {
    content: '';
    background: rgba(0,0,0,.25);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    width: 100%;
    z-index: 1;
  }
`
const TbHeader = styled(Header)`
  margin: 0 auto !important;
  margin-bottom: 10px !important
  max-width: ${props => props.theme.sizes.maxWidthCentered};

  font-size: 1.67rem !important;
  text-transform: capitalize;
  font-weight: 600;
  position: absolute;
  width: 100%;
  
  bottom: 0;
  left: 50%;
  transform: translate(-50%,-20%);
  text-align: left;  
  color: #ffffff !important;
  z-index: 1;
  @media only screen and (max-width: 700px){
    padding: 0 1rem !important;
  }

  @media screen and (min-width: 830px){
    font-size: 2.5rem !important;
  }
  
` 



const Hero = (props) => (
  <Wrapper>
    <BgImg height={props.height} sizes={props.image.sizes} backgroundColor={'#eeeeee'} />    
    <TbHeader as='h1'>{props.title}</TbHeader>
  </Wrapper>
)

export default Hero
