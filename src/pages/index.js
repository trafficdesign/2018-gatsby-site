import locale from "browser-locale";
import React, { Fragment, PureComponent } from "react";

import { ogimage } from "assets/images";
import Helmet from "react-helmet";
import { META } from "config/meta";

class RedirectIndex extends PureComponent {
  render() {
    const lingo = "pl";
    const returnRedirect = () => {
      if (typeof window !== "undefined") {
        const getLocale = localStorage.getItem("lingo") || locale();
        const setLocale = getLocale === "pl" ? "pl" : "en";
        localStorage.setItem("lingo", setLocale);
        window.location.replace(`/${setLocale}/`);
      }
      return (
        <Fragment>
          <Helmet encodeSpecialCharacters>
            <html lang={lingo} />
            <link rel="canonical" href="https://trafficdesign.pl" />
            <meta name="description" content={META.description[lingo]} />
            <meta name="keywords" content={META.keywords[lingo]} />
            <meta name="language" content={lingo} />
            <meta name="title" content={META.title[lingo]} />
            <meta property="og:description" content={META.description[lingo]} />
            <meta property="og:image:secure_url" content={ogimage} />
            <meta property="og:image" content={ogimage} />
            <meta property="og:locale" content={lingo} />
            <meta property="og:title" content={META.title[lingo]} />
            <meta property="og:url" content="https://trafficdesign.pl" />
            <title>{META.title[lingo]}</title>
          </Helmet>
          <div />
        </Fragment>
      );
    };
    return returnRedirect();
  }
}

export default RedirectIndex;
