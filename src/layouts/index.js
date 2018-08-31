import React from 'react'
import Helmet from 'react-helmet'
import { ThemeProvider } from 'styled-components'
import 'semantic-ui-css/semantic.min.css'
import config from '../utils/siteConfig'
import '../styles/global'
import theme from '../styles/theme'
import Menu from '../components/Menu'
import Footer from '../components/Footer'
import favicon from '../images/favicon.png'

import { getCurrentLangKey, getLangs, getUrlForLang } from 'ptz-i18n';
import { IntlProvider, addLocaleData } from 'react-intl';
import 'intl';


import en from 'react-intl/locale-data/en';
import 'intl/locale-data/jsonp/en';
import ml from 'react-intl/locale-data/ml';
import 'intl/locale-data/jsonp/ml';

// add concatenated locale data
addLocaleData([...en, ...ml]);

const Template = ({ children, data, location }) => {
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
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={config.siteTitle} />
        <meta property="fb:app_id" content={appId} />
      </Helmet>

      <ThemeProvider theme={theme}>
        <div className="siteContent">
          <Menu langs={langsMenu} />
          {children()}
        </div>
      </ThemeProvider>
      {/* Footer placed in seperate ThemeProvider to avoid Rendering an extra DIV in HTML output  */}
      <ThemeProvider theme={theme}>
        <Footer />
      </ThemeProvider>
    </div>
    </IntlProvider>
  )
}

export default Template

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

