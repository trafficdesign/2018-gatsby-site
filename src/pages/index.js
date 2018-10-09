import locale from "browser-locale";
import React, { PureComponent } from "react";

class RedirectIndex extends PureComponent {
  render() {
    const returnRedirect = () => {
      if (typeof window !== "undefined") {
        const getLocale = localStorage.getItem("lingo") || locale();
        const setLocale = getLocale === "pl" ? "pl" : "en";
        localStorage.setItem("lingo", setLocale);
        window.location.replace(`/${setLocale}/`);
      }
      return <div />;
    };
    return returnRedirect();
  }
}

export default RedirectIndex;
