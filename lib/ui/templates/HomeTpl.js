import { filter } from "lodash";
import { graphql } from "gatsby";
import { shape, object } from "prop-types";
import Img from "gatsby-image";
import React, { Component, Fragment } from "react";
import styled, { ThemeProvider } from "styled-components";

import { Action, Actionbar, Body, Separator, TextString } from "ui/components";
import { mintThm } from "ui/themes";
import { breakpoint } from "ui/settings";
import { getThatLingo, getThisLingo } from "ui/functions";
import { Layout, Helmet } from "ui/partials";
import { META } from "config/meta";
import { PATH } from "config/paths";
import { setSpace, setType } from "ui/mixins";
import DICT from "config/locales/home";

const Fold = styled.div`
  position: relative;
`;

const Cover = styled.div``;
const Pitch = styled.div`
  ${setType("s")};
  position: relative;
  ${breakpoint.phone} {
    ${setSpace("mhl")};
    margin-top: -5em;
    text-align: center;
  }
  ${breakpoint.tabletUp} {
    ${setSpace("mhl")};
    margin-top: -10em;
  }
  ${breakpoint.desktopUp} {
    ${setSpace("mbh")};
    align-items: flex-end;
    bottom: 0;
    display: flex;
    flex-direction: row;
    justify-content: center;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
  }
  ${breakpoint.hdesktopUp} {
    ${setSpace("man")};
    ${setSpace("pan")};
    align-items: center;
  }
`;
const PitchEl = styled.div`
  ${setSpace("pah")};
  background-color: ${({ theme }) => theme.backg};
  margin-left: auto;
  margin-right: auto;
  max-width: 800px;
  ${breakpoint.tablet} {
    width: 100%;
  }
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
        <Fold>
          <Cover>
            <Img
              fluid={coverData.primary.photo.localFile.childImageSharp.fluid}
              alt={`${coverData.primary.caption} — ${coverData.primary.author}`}
            />
          </Cover>
          <ThemeProvider theme={mintThm}>
            <Pitch>
              <PitchEl>
                <div>
                  <TextString as="h1" looks="h2">
                    {headData.primary.heading}
                  </TextString>
                  <Separator silent size="s" />
                  <TextString as="p" looks="p4">
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
              </PitchEl>
            </Pitch>
          </ThemeProvider>
        </Fold>
        <Layout
          {...this.props}
          lingo={lingo}
          siblingPath={getSiblingPath()}
          isHome
        >
          <Body />
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
