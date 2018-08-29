import React from 'react'
import styled , { keyframes } from 'styled-components'

const blink = keyframes`
   50% {
    opacity: 1;
  }
`;

const bulge = keyframes`
   50% {
    transform: scale(1.05);
  }
`;

const Wrapper = styled.div`
  background-color: #E6E7ED;
    will-change: transform;
    width: auto;
    border-radius: 50px;
    padding: 20px;
    display: table;
    margin: 0 auto;
    position: relative;
    -webkit-animation: 2s ${bulge} infinite ease-out;
            animation: 2s ${bulge} infinite ease-out;            
  &::before,
  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: -2px;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background-color: #E6E7ED;  
  }
  ::after {
    height: 10px;
    width: 10px;
    left: -10px;
    bottom: -10px;
  } 

  span {
    height: 15px;
    width: 15px;
    float: left;
    margin: 0 1px;
    background-color: #9E9EA1;
    display: block;
    border-radius: 50%;
    opacity: 0.4;
  }       

  span:nth-of-type(1) {
    -webkit-animation: 1s ${blink} infinite 0.3333s;
            animation: 1s ${blink} infinite 0.3333s;
  }

  span:nth-of-type(2) {
    -webkit-animation: 1s ${blink} infinite 0.6666s;
            animation: 1s ${blink} infinite 0.6666s;
  }
   
  span:nth-of-type(3) {
    -webkit-animation: 1s ${blink} infinite 0.9999s;
            animation: 1s ${blink} infinite 0.9999s;
  } 
`



const CommentsLoader = props => {
  return (
    <Wrapper>
        <span></span>
        <span></span>
        <span></span>     
    </Wrapper>
  )
}

export default CommentsLoader
