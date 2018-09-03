import React from 'react'
import Helmet from 'react-helmet'
import { ThemeProvider } from 'styled-components'
import 'semantic-ui-css/semantic.min.css'
import 'animate.css/animate.min.css';
import config from '../utils/siteConfig'
import '../styles/global'
import sitetheme from '../styles/theme'
import HederMenu from '../components/Menu'
import SelectLanguage from '../components/SelectLanguage';
import Footer from '../components/Footer'
import favicon from '../images/favicon.png'

import { getCurrentLangKey, getLangs, getUrlForLang } from 'ptz-i18n';
import { IntlProvider, addLocaleData } from 'react-intl';
import 'intl';


import en from 'react-intl/locale-data/en';
import 'intl/locale-data/jsonp/en';
import ml from 'react-intl/locale-data/ml';
import 'intl/locale-data/jsonp/ml';



import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { mailFolderListItems, otherMailFolderListItems } from '../components/tileData';

// add concatenated locale data
addLocaleData([...en, ...ml]);

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    height: '100%',
    overflowX: 'hidden',
    overflowY: 'scroll',
    position: 'fixed',
    width: 'auto',
    zIndex: 2,
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: 0,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,     
    marginTop: '56px',
    [`@media (min-width: ${sitetheme.mediaQueryTresholds.M}px)`]: {
       marginTop: '64px',
    },
  },
   flex: {
    flexGrow: 1,
  },
  menuButton: {
    fontWeight: 600,
  },
});


class Template extends React.Component {

   constructor(props) {
      super(props);
      console.log(this.props);     
    }    
 
  state = {
    open: false,
    left: false,
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
    document.body.style.overflowY = "hidden";    
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
    document.body.style.overflowY = "scroll";
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  render() {
        const { children,data,location } = this.props

        const url = location.pathname;
        const { langs, defaultLangKey } = data.site.siteMetadata.languages;
        const langKey = getCurrentLangKey(langs, defaultLangKey, url);
        const homeLink = `/${langKey}/`;
        const langsMenu = getLangs(langs, langKey, getUrlForLang(homeLink, url));

        // get the appropriate message file based on langKey
        // at the moment this assumes that langKey will provide us
        // with the appropriate language code
        const i18nMessages = require(`../data/messages/${langKey}`);


        const { appId }= data.site.siteMetadata.facebook;
    const { classes, theme } = this.props;

    return (

      <IntlProvider
      locale={langKey}
      messages={i18nMessages}
    >
    <div className="siteRoot">
      <Helmet>
        <title>{config.siteTitle}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={favicon} />
        <meta name="description" content={config.siteDescription} />
        <meta property="og:title" content={config.siteTitle} />
        <meta property="og:url" content={config.siteUrl} />
        <meta property="og:locale" content="ml" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={config.siteTitle} />
        <meta property="fb:app_id" content={appId} />
      </Helmet>

      <ThemeProvider theme={sitetheme}>
        <div className="siteContent">
          
                  
         <div className={classes.root}>
        <AppBar
          position="fixed"
          className={classes.appBar}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.toggleDrawer('left', true)}
              className={classNames(classes.menuButton, this.state.open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            
            <Typography variant="title" color="inherit" className={classes.flex}>
              {config.siteTitle}
            </Typography>
            <SelectLanguage classes={classes} langs={langsMenu} />
            
          </Toolbar>
        </AppBar>
        <SwipeableDrawer
          
          open={this.state.left}
          onClose={this.toggleDrawer('left', false)}
          onOpen={this.toggleDrawer('left', true)}
          
        >
          <div className={classes.toolbar}>
            <IconButton onClick={this.toggleDrawer('left', false)}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>{mailFolderListItems}</List>
          <Divider />
          <List>{otherMailFolderListItems}</List>
          <HederMenu home={homeLink} langs={langsMenu} />
        </SwipeableDrawer>
        <main className={classes.content}>          
          {children()}
        </main>
      </div>
      </div>
      </ThemeProvider>
      {/* Footer placed in seperate ThemeProvider to avoid Rendering an extra DIV in HTML output  */}
      <ThemeProvider theme={sitetheme}>
        <Footer />
      </ThemeProvider>
    </div>
    </IntlProvider>
     
    );
  }
}

Template.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Template);




export const pageQuery = graphql`
  query Layout {
    site {
      siteMetadata {
        languages {
          defaultLangKey
          langs
        }
        facebook {
          appId
        }
      }
    }
  }
`;








