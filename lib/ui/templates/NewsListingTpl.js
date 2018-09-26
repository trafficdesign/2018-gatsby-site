import { array, string } from "prop-types";
import { Link } from "gatsby";
import Img from "gatsby-image";
import React, { Component, Fragment } from "react";
import styled, { ThemeProvider } from "styled-components";

import { Body, Head, Separator, TextString } from "ui/components";
import { darkThm, blueThm } from "ui/themes";
import { breakpoint } from "ui/settings";
import { getThatLingo } from "ui/functions";
import { Layout, Helmet } from "ui/partials";
import { PATH } from "config/paths";
import { setSpace, setType } from "ui/mixins";
import DICT from "config/locales/news";

const List = styled.ul`
  ${breakpoint.tabletUp} {
    display: flex;
    margin-left: auto;
    margin-right: auto;
    max-width: 800px;
    flex-direction: row;
    flex-wrap: wrap;
  }
`;
const ListItem = styled.li`
  ${breakpoint.tabletUp} {
    ${setSpace("phl")};
    flex: 0 0 50%;
    position: relative;
    &:last-child {
      margin-bottom: -20px;
    }
    &:nth-child(even) {
      ${setSpace("mtl")};
    }
  }
`;
const ListLink = styled(Link)`
  position: relative;
  display: block;
`;
const ListItemImage = styled.div``;
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
  ${setSpace("pas")};
  ${setType("m")};
  text-align: center;
`;
const ListItemAppend = styled.div`
  ${setSpace("mhl")};
  display: flex;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  text-align: center;
  top: -20px;
  & > div {
    ${setSpace("phm")};
    ${setSpace("pvs")};
    ${setType("x")};
    background: ${({ theme }) => theme.backg};
    display: inline-block;
  }
`;

export default class ListingTpl extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { edges, lingo } = this.props;
    const siblingPath = `${PATH.news[getThatLingo(lingo)]}`;
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
            <TextString as="h1">
              <TextString looks="h1">{DICT.pageTitle[lingo]}</TextString>
            </TextString>
            <Separator size="x" silent />
            <TextString as="p" looks="p3">
              {DICT.pageSubtitle[lingo]}
            </TextString>
          </Head>
          <Separator size="l" silent />
          <Body as="main">
            <List>
              {edges.map(({ node }) => {
                if (node.uid !== "newsschema" && node.uid !== "newsschemaen") {
                  return (
                    <ListItem key={node.uid}>
                      <ThemeProvider theme={darkThm}>
                        <ListLink to={`${PATH.news[lingo]}${node.uid}`}>
                          <ListItemImage>
                            {node.data.cover.localFile ? (
                              <Img
                                fluid={
                                  node.data.cover.localFile.childImageSharp
                                    .fluid
                                }
                                alt={node.data.title.text}
                              />
                            ) : null}
                          </ListItemImage>
                          <ListItemText>
                            <ListItemTitle>
                              <TextString looks="action">
                                {node.data.title.text}
                              </TextString>
                            </ListItemTitle>
                          </ListItemText>
                        </ListLink>
                      </ThemeProvider>
                      <ThemeProvider theme={blueThm}>
                        <ListItemAppend>
                          <div>
                            <TextString looks="p6">{node.data.date}</TextString>
                          </div>
                        </ListItemAppend>
                      </ThemeProvider>
                    </ListItem>
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
