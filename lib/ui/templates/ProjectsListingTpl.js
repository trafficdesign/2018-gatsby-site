import { array, string } from "prop-types";
import { Link } from "gatsby";
import Img from "gatsby-image";
import React, { Component, Fragment } from "react";
import styled, { ThemeProvider } from "styled-components";

import { Action, Body, Head, Separator, TextString } from "ui/components";
import { darkThm, mintThm } from "ui/themes";
import { breakpoint } from "ui/settings";
import { getThatLingo } from "ui/functions";
import { Layout, Helmet } from "ui/partials";
import { PATH } from "config/paths";
import { setSpace, setType } from "ui/mixins";
import DICT from "config/locales/projects";

const List = styled.ul`
  margin-left: auto;
  margin-right: auto;
  max-width: 680px;
`;
const ListItem = styled.li`
  position: relative;
  &:last-child {
    margin-bottom: -50px;
  }
  ${breakpoint.phone} {
    ${setSpace("mbl")};
    :last-child {
      ${setSpace("mbn")};
    }
  }
`;
const ListLink = styled(Link)`
  position: relative;
  display: block;
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
  ${setType("l")};
  text-align: center;
`;
const ListItemAppend = styled.div`
  ${setSpace("mhl")};
  ${setSpace("pal")};
  ${setType("x")};
  background: ${({ theme }) => theme.backg};
  position: relative;
  top: -50px;
  ${breakpoint.phone} {
    ${setSpace("mhn")};
    ${setSpace("pam")};
    top: 0;
  }
`;

export default class ProjectsListingTpl extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { edges, lingo } = this.props;
    const siblingPath = `${PATH.projects[getThatLingo(lingo)]}`;
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
          <Body>
            <List>
              {edges.map(({ node }) => {
                if (node.uid !== "projectsschema") {
                  return (
                    <ListItem key={node.uid}>
                      <Fragment>
                        <ThemeProvider theme={darkThm}>
                          <ListLink to={`${PATH.projects[lingo]}${node.uid}`}>
                            {node.data.cover.localFile ? (
                              <Img
                                fluid={
                                  node.data.cover.localFile.childImageSharp
                                    .fluid
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
                          </ListLink>
                        </ThemeProvider>
                        <ThemeProvider theme={mintThm}>
                          <ListItemAppend>
                            <TextString as="p" looks="p4">
                              {node.data.intro.text}
                            </TextString>
                            <Separator silent size="x" />
                            <Action to={`${PATH.projects[lingo]}${node.uid}`}>
                              {DICT.readMoreCTA[lingo]}
                            </Action>
                          </ListItemAppend>
                        </ThemeProvider>
                      </Fragment>
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

ProjectsListingTpl.propTypes = {
  edges: array.isRequired,
  lingo: string.isRequired
};
