import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components'

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


import classNames from 'classnames';

const LinkToLang = styled(Link)`
  &:active, 
  &:focus {
  outline: 0;
  border: none;
  -moz-outline-style: none;
}
`
const styles  = theme => ({
  menuButton: {
    fontWeight: 600,
  },
});

class SelectLanguage extends React.Component {
   state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
    document.body.style.overflowY = "scroll";
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };
   render() {
    const { anchorEl } = this.state;
    const props = this.props;
    console.log(this.props); 
    const { classes } = this.props;

    const links = props.langs.map(lang =>
       
         
           <LinkToLang to={lang.link} key={lang.langKey} style={{
            color: 'white'
          }}> 
            <MenuItem onClick={this.handleClose}> 
            
              {lang.langKey}
           
            </MenuItem>
          </LinkToLang>
        
      );

    return (
     
        <div>
          <Button  color="inherit" className={classes.menuButton}
            aria-owns={anchorEl ? 'simple-menu' : null}
            aria-haspopup="true"
            onClick={this.handleClick}
          >
           <FormattedMessage id="selectLanguage" />
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={this.handleClose}

            anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}

            >
            {links}            
          </Menu>
        </div>

    )
   }
}




SelectLanguage.propTypes = {
  classes: PropTypes.object.isRequired,
  langs: PropTypes.array
};

export default SelectLanguage