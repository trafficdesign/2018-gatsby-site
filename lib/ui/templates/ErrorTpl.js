import { string } from "prop-types";
import React, { Component } from "react";

import { Action } from "ui/components";
import { getThatLingo } from "ui/functions";
import { Layout, Helmet } from "ui/partials";
import { PATH } from "config/paths";
import DICT from "config/locales/error";

export default class ErrorTpl extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { lingo } = this.props;
    const siblingPath = `${PATH.error[getThatLingo(lingo)]}`;
    return (
      <Layout {...this.props} lingo={lingo} siblingPath={siblingPath}>
        <Helmet
          {...this.props}
          description={DICT.meta.description[lingo]}
          keywords={DICT.meta.keywords[lingo]}
          title={DICT.meta.title[lingo]}
        />
        <h1>{DICT.pageTitle[lingo]}</h1>
        <Action to={PATH.home[lingo]}>{DICT.returnHome[lingo]}</Action>
      </Layout>
    );
  }
}

ErrorTpl.propTypes = { lingo: string.isRequired };
