// import { Redirect } from "react-router-dom";
import locale from "browser-locale";
import React, { PureComponent } from "react";

class Redirect404 extends PureComponent {
  render() {
    const returnRedirect = () => {
      if (typeof window !== "undefined") {
        const getLocale = localStorage.getItem("lingo") || locale();
        const setLocale = getLocale === "pl" ? "pl" : "en";
        localStorage.setItem("lingo", setLocale);
        window.location.replace(`/${setLocale}/`);
        // return <Redirect to={`/${setLocale}/`} />;
      }
      return <div />;
    };
    return returnRedirect();
  }
}

export default Redirect404;
