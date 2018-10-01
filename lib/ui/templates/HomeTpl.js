import { filter } from "lodash";
import { graphql } from "gatsby";
import { shape, object } from "prop-types";
import Img from "gatsby-image";
import React, { Component, Fragment } from "react";
import styled, { ThemeProvider } from "styled-components";

import { Action, Actionbar, Body, Separator, TextString } from "ui/components";
import { blueThm } from "ui/themes";
import { breakpoint } from "ui/settings";
import { getThatLingo, getThisLingo } from "ui/functions";
import { Layout, Helmet } from "ui/partials";
import { META } from "config/meta";
import { PATH } from "config/paths";
import { setSpace } from "ui/mixins";
import DICT from "config/locales/home";

const Cover = styled.div`
  margin-bottom: -80px;
  ${breakpoint.tabletUp} {
    margin-bottom: -200px;
  }
  ${breakpoint.desktopUp} {
    margin-bottom: -300px;
  }
  ${breakpoint.hdesktopUp} {
    margin-bottom: -400px;
  }
`;
const Pitch = styled.div`
  ${setSpace("pah")};
  background-color: ${({ theme }) => theme.backg};
  margin-left: auto;
  margin-right: auto;
  margin-top: -80px;
  max-width: 800px;
  position: relative;
`;

export default class HomePageTpl extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { lang } = this.props.data.prismicPages;
    const { cover, head, meta } = this.props.data;
    const lingo = getThisLingo(lang);

    const getSiblingPath = () => PATH.home[getThatLingo(lingo)];

    const getData = (obj, str) => {
      const subset = filter(obj.data.body, o => o.__typename === str);
      return subset[0];
    };

    const coverData = getData(cover, "PrismicPagesBodyCover");
    const headData = getData(head, "PrismicPagesBodyHead");
    const metaData = getData(meta, "PrismicPagesBodyMeta");

    return (
      <Fragment>
        <Helmet
          {...this.props}
          description={META.description[lingo]}
          lingo={lingo}
          title={metaData.primary.title}
        />
        <Cover>
          <Img
            fluid={coverData.primary.photo.localFile.childImageSharp.fluid}
            alt={`${coverData.primary.caption} — ${coverData.primary.author}`}
          />
        </Cover>
        <Layout
          {...this.props}
          lingo={lingo}
          siblingPath={getSiblingPath()}
          isHome
        >
          <Body>
            <ThemeProvider theme={blueThm}>
              <Pitch>
                <div>
                  <TextString as="h1" looks="h2">
                    {headData.primary.heading}
                  </TextString>
                  <Separator silent size="s" />
                  <TextString as="p" looks="p3">
                    {headData.primary.subheading}
                  </TextString>
                  <Separator silent />
                  <Actionbar>
                    <Action button to={PATH.works[lingo]}>
                      {DICT.linktoWorks[lingo]}
                    </Action>
                    <Action to={PATH.news[lingo]}>
                      {DICT.linktoNews[lingo]}
                    </Action>
                  </Actionbar>
                </div>
              </Pitch>
            </ThemeProvider>
          </Body>
        </Layout>
      </Fragment>
    );
  }
}

HomePageTpl.propTypes = {
  data: shape({
    prismicPages: object.isRequired
  }).isRequired
};

export const pageQuery = graphql`
  query HomePageBySlug($uid: String!) {
    prismicPages(uid: { eq: $uid }) {
      uid
      lang
      alternate_languages {
        uid
        lang
      }
    }
    meta: prismicPages(uid: { eq: $uid }) {
      data {
        body {
          ... on PrismicPagesBodyMeta {
            primary {
              title
            }
          }
        }
      }
    }
    cover: prismicPages(uid: { eq: $uid }) {
      data {
        body {
          ... on PrismicPagesBodyCover {
            primary {
              caption
              author
              photo {
                localFile {
                  childImageSharp {
                    fluid(
                      maxWidth: 900
                      maxHeight: 600
                      quality: 90
                      duotone: {
                        highlight: "#838383"
                        shadow: "#000000"
                        opacity: 100
                      }
                    ) {
                      ...GatsbyImageSharpFluid_withWebp_noBase64
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    head: prismicPages(uid: { eq: $uid }) {
      data {
        body {
          ... on PrismicPagesBodyHead {
            primary {
              heading
              subheading
            }
          }
        }
      }
    }
  }
`;
