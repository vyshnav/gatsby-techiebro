import React, { Component } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { TransitionGroup, Transition } from 'react-transition-group';
import { isEqual } from 'lodash'



import { Item } from 'semantic-ui-react'
import Link from 'gatsby-link'
import Img from 'gatsby-image'

export default class DelayedList extends Component {

  constructor() {
    console.log("newData");
    super()
    this.state = {
      items: []
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("shouldComponentUpdate");
    console.log(nextProps.children);
    if (!isEqual(this.props.children, nextProps.children)) {
      this.setData(nextProps.children);
      return true;
    } else if (!isEqual(this.state.items, nextState.items)) {
      return true;
    } else {
      return false;
    }
  }

  componentDidMount() {
    console.log("componentDidMount"); 
    console.log(this.props.children);
    this.setData(this.props.children);
    
  }

  setData(nextProps) {
    let { delay } = this.props
    this.state.items = []

    if (!Array.isArray(nextProps)) {
      nextProps = new Array(1).fill(nextProps);
    }

    if (nextProps.length === 0) {
      return this.setState({
        items: []
      })
    }

    nextProps.forEach((item, index )=> {
      setTimeout(item => {
        let newData = [...this.state.items, item]
        console.log("newData");
        this.setState({
          items: newData
        })
      }, 1, item)
    })
  }

  render() {
    const props = this.props;
    return (
    

     <TransitionGroup>
                {
                    this.state.items.map( index => (
                         
                        <Transition 
                        key={ index }
                        timeout={ 500 }
                        appear={ true }
                        mountOnEnter
                        unmountOnExit
                        >
                        
                            {
                                ( status ) => {
                                    return <Item.Group link divided unstackable
                                     
                                    >{this.state.items}</Item.Group>;
                                }
                            }

                        </Transition>
                        
                    ) )
                }
      </TransitionGroup>
    )
  }
}
