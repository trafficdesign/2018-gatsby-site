import { array, string } from "prop-types";
import { Link } from "gatsby";
import Img from "gatsby-image";
import React, { Component, Fragment } from "react";
import styled, { ThemeProvider } from "styled-components";

import { Body, Head, Separator, TextString } from "ui/components";
import { fadeIn } from "ui/animations";
import { breakpoint, font, time } from "ui/settings";
import { blueThm, darkThm } from "ui/themes";
import { getThatLingo } from "ui/functions";
import { Layout, Helmet } from "ui/partials";
import { PATH } from "config/paths";
import { setSpace, setType } from "ui/mixins";
import DICT from "config/locales/works";

const Toolbar = styled.div`
  ${setSpace("mhm")};
  ${setSpace("pam")};
  ${setType("x")};
  background-color: ${({ theme }) => theme.backg};
  position: relative;
  text-align: center;
`;
const Tabs = styled.ul`
  width: 100%;
`;
const Tab = styled.li`
  animation: ${fadeIn} ${time.m} linear;
  display: inline-block;
`;
const TabLink = styled.a`
  ${setSpace("mvx")};
  ${setSpace("phm")};
  ${setSpace("pvx")};
  border-color: ${({ isActive, theme }) =>
    isActive ? theme.titleColor : "transparent"};
  border-style: solid;
  border-width: 1px;
  color: ${({ isActive, theme }) =>
    isActive ? theme.titleColor : theme.color};
  cursor: pointer;
  display: inline-block;
  font-family: ${font.digrotesk};
  font-weight: 600;
`;
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
    this.state = { filter: "all" };

    this.toggleFilter = this.toggleFilter.bind(this);
  }

  toggleFilter(filter) {
    this.setState(prevState => ({
      filter: prevState.filter === filter ? "all" : filter
    }));
  }

  render() {
    const { filter } = this.state;
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
            <ThemeProvider theme={blueThm}>
              <Toolbar>
                <Tabs>
                  <Tab>
                    <TabLink
                      isActive={filter === "all"}
                      onClick={() => this.toggleFilter("all")}
                    >
                      {DICT.filterAll[lingo]}
                    </TabLink>
                  </Tab>
                  <Tab>
                    <TabLink
                      isActive={filter === "mural"}
                      onClick={() => this.toggleFilter("mural")}
                    >
                      {DICT.filterMurals[lingo]}
                    </TabLink>
                  </Tab>
                  <Tab>
                    <TabLink
                      isActive={filter === "szyld"}
                      onClick={() => this.toggleFilter("szyld")}
                    >
                      {DICT.filterSignage[lingo]}
                    </TabLink>
                  </Tab>
                  <Tab>
                    <TabLink
                      isActive={filter === "blok"}
                      onClick={() => this.toggleFilter("blok")}
                    >
                      {DICT.filterBlocks[lingo]}
                    </TabLink>
                  </Tab>
                  <Tab>
                    <TabLink
                      isActive={filter === "rzezba"}
                      onClick={() => this.toggleFilter("rzezba")}
                    >
                      {DICT.filterInstallations[lingo]}
                    </TabLink>
                  </Tab>
                  <Tab>
                    <TabLink
                      isActive={filter === "detal"}
                      onClick={() => this.toggleFilter("detal")}
                    >
                      {DICT.filterDetails[lingo]}
                    </TabLink>
                  </Tab>
                </Tabs>
              </Toolbar>
            </ThemeProvider>
            <List>
              {edges.map(({ node }) => {
                if (node.uid === "worksschema") {
                  return null;
                }
                if (filter === "all" || node.data.type === filter) {
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
                return null;
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
