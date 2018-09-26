import { array, string } from "prop-types";
import { Link } from "gatsby";
import Img from "gatsby-image";
import React, { Component, Fragment } from "react";
import styled, { ThemeProvider } from "styled-components";

import { Body, Head, Separator, TextString } from "ui/components";
import { darkThm } from "ui/themes";
import { breakpoint } from "ui/settings";
import { getThatLingo } from "ui/functions";
import { Layout, Helmet } from "ui/partials";
import { PATH } from "config/paths";
import { setSpace, setType } from "ui/mixins";
import DICT from "config/locales/works";

const List = styled.ol`
  display: grid;
  margin-left: auto;
  margin-right: auto;
  ${breakpoint.phone} {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  }
  ${breakpoint.tabletUp} {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
`;
const ListItem = styled.li`
  grid-row-end: span 1;
  position: relative;
`;
const ListItemText = styled.div`
  align-items: center;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
`;
const ListItemTitle = styled.h2`
  ${setSpace("pam")};
  ${setType("s")};
  text-align: center;
`;

export default class ListingTpl extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { edges, lingo } = this.props;
    const siblingPath = `${PATH.works[getThatLingo(lingo)]}`;
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
            <Separator size="x" silent />
            <TextString as="p" looks="p3">
              {DICT.pageSubtitle[lingo]}
            </TextString>
          </Head>
          <Separator size="l" silent />
          <Body>
            <List>
              {edges.map(({ node }) => {
                if (
                  node.uid !== "worksschema" &&
                  node.uid !== "worksschemaen"
                ) {
                  return (
                    <ThemeProvider theme={darkThm}>
                      <ListItem key={node.uid}>
                        <Link to={`${PATH.works[lingo]}${node.uid}`}>
                          {node.data.cover.localFile ? (
                            <Img
                              fluid={
                                node.data.cover.localFile.childImageSharp.fluid
                              }
                              alt={node.data.title.text}
                            />
                          ) : null}
                          <ListItemText>
                            <ListItemTitle>
                              <TextString looks="action">
                                {node.data.title.text}
                              </TextString>
                            </ListItemTitle>
                          </ListItemText>
                        </Link>
                      </ListItem>
                    </ThemeProvider>
                  );
                }
              })}
            </List>
          </Body>
        </Layout>
      </Fragment>
    );
  }
}

ListingTpl.propTypes = {
  edges: array.isRequired,
  lingo: string.isRequired
};
