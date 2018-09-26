import { array, string } from "prop-types";
import Img from "gatsby-image";
import React, { Component, Fragment } from "react";
import styled from "styled-components";

import { Action, Body, Head, Separator, TextString } from "ui/components";
import { getThatLingo } from "ui/functions";
import { Layout, Helmet } from "ui/partials";
import { PATH } from "config/paths";
import DICT from "config/locales/articles";

const ArticlesList = styled.ul``;
const ArticlesListItem = styled.li`
  max-width: 300px;
`;

export default class ArticlesListingTpl extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { edges, lingo } = this.props;
    const siblingPath = `${PATH.articles[getThatLingo(lingo)]}`;
    return (
      <Fragment>
        <Helmet
          {...this.props}
          description={DICT.meta.description[lingo]}
          keywords={DICT.meta.keywords[lingo]}
          title={DICT.meta.title[lingo]}
        />
        <Layout {...this.props} lingo={lingo} siblingPath={siblingPath}>
          <Head as="header">
            <TextString as="h1" looks="h1">
              {DICT.pageTitle[lingo]}
            </TextString>
            <TextString as="p" looks="p3">
              {DICT.pageSubtitle[lingo]}
            </TextString>
          </Head>
          <Separator size="l" silent />
          <Body as="main">
            <ArticlesList>
              {edges.map(({ node }) => {
                if (
                  node.uid !== "articlesschema" &&
                  node.uid !== "articlesschemaen"
                ) {
                  const hasCover = node.data.cover.localFile;
                  return (
                    <ArticlesListItem key={node.uid}>
                      <h2>
                        <Action to={`${PATH.articles[lingo]}${node.uid}`}>
                          {node.data.title.text}
                        </Action>
                      </h2>
                      {hasCover ? (
                        <Action to={`${PATH.articles[lingo]}${node.uid}`}>
                          <Img
                            fluid={
                              node.data.cover.localFile.childImageSharp.fluid
                            }
                            alt={node.data.title.text}
                          />
                        </Action>
                      ) : null}
                      <p>{node.data.content.text}</p>
                    </ArticlesListItem>
                  );
                }
              })}
            </ArticlesList>
          </Body>
        </Layout>
      </Fragment>
    );
  }
}

ArticlesListingTpl.propTypes = {
  edges: array.isRequired,
  lingo: string.isRequired
};
