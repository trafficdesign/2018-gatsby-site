import { filter } from "lodash";
import { graphql } from "gatsby";
import { shape, object } from "prop-types";
import Img from "gatsby-image";
import React, { Component, Fragment } from "react";
import styled, { ThemeProvider } from "styled-components";

import {
  Action,
  Body,
  Copy,
  Head,
  Icon,
  Separator,
  TextString
} from "ui/components";
import { breakpoint } from "ui/settings";
import { blueThm } from "ui/themes";
import { getThatLingo, getThisLingo } from "ui/functions";
import { Layout, Helmet } from "ui/partials";
import { META } from "config/meta";
import { PATH } from "config/paths";
import { setSpace, setType } from "ui/mixins";

const Details = styled.div`
  ${setSpace("pal")};
  ${setType("x")};
  background: ${({ theme }) => theme.backg};
  color: ${({ theme }) => theme.color};
  margin-left: auto;
  margin-right: auto;
  margin-top: -40px;
  max-width: 680px;
  position: relative;
  text-align: center;
  ${breakpoint.phone} {
    ${setSpace("mtn")};
  }
`;
const ContactBits = styled.div`
  ${setType("x")};
  ${setSpace("mtl")};
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
  max-width: 680px;
  i {
    ${setSpace("mrs")};
  }
`;
const EmailBits = styled.div`
  ${setSpace("mbl")};
  ${setType("s")};
`;

export default class ContactPageTpl extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { alternate_languages, lang } = this.props.data.prismicPages;
    const { body, cover, head, meta } = this.props.data;
    const lingo = getThisLingo(lang);
    const isTranslated = alternate_languages.length > 0;

    const getSiblingPath = () => {
      if (isTranslated) {
        return `${PATH.contact[getThatLingo(lingo)]}`;
      }
      return PATH.home[getThatLingo(lingo)];
    };

    const getData = (obj, str) => {
      const subset = filter(obj.data.body, o => o.__typename === str);
      return subset[0];
    };

    const bodyData = getData(body, "PrismicPagesBodyBody");
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
        <Layout {...this.props} lingo={lingo} siblingPath={getSiblingPath()}>
          <Head>
            <TextString as="h1" looks="h1">
              {headData.primary.heading}
            </TextString>
            <Separator size="x" silent />
            <TextString as="p" looks="p3">
              {headData.primary.subheading}
            </TextString>
          </Head>
          <Separator size="l" silent />
          <Body>
            <Img
              fluid={coverData.primary.photo.localFile.childImageSharp.fluid}
            />
            <ThemeProvider theme={blueThm}>
              <Details>
                <TextString as="p" looks="p4">
                  tuBAZA, Aleja Zwycięstwa 291, 81-525 Gdynia
                </TextString>
              </Details>
            </ThemeProvider>
            <Separator silent size="m" />
            <Copy style={{ textAlign: "center" }}>
              <h2>{bodyData.primary.text.text}</h2>
            </Copy>
            <ContactBits>
              <div>
                <EmailBits>
                  <Action
                    block
                    button
                    email="kontakt@trafficdesign.pl"
                    obfuscated
                    text="kontakt@trafficdesign.pl"
                  />
                </EmailBits>
                <ul>
                  <li>
                    <Icon name="facebook" size="x" />
                    <Action
                      href="https://facebook.com/trafficdesign"
                      rel="external"
                      target="_blank"
                    >
                      facebook.com/trafficdesign
                    </Action>
                  </li>
                  <li>
                    <Icon name="instagram" size="x" />
                    <Action
                      href="https://instagram.com/traffic_design"
                      rel="external"
                      target="_blank"
                    >
                      instagram.com/traffic_design
                    </Action>{" "}
                    <TextString looks="p5">#trafficdesign</TextString>
                  </li>
                  <li>
                    <Icon name="linkedin" size="x" />
                    <Action
                      href="https://linkedin.com/company/traffic-design/"
                      rel="external"
                      target="_blank"
                    >
                      linkedin.com/company/traffic-design
                    </Action>
                  </li>
                </ul>
              </div>
            </ContactBits>
          </Body>
        </Layout>
      </Fragment>
    );
  }
}

ContactPageTpl.propTypes = {
  data: shape({
    prismicPages: object.isRequired
  }).isRequired
};

export const pageQuery = graphql`
  query ContactPageBySlug($uid: String!) {
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
    cover: prismicPages(uid: { eq: $uid }) {
      data {
        body {
          ... on PrismicPagesBodyCover {
            primary {
              photo {
                localFile {
                  childImageSharp {
                    fluid(
                      cropFocus: CENTER
                      duotone: {
                        highlight: "#ebeae9"
                        shadow: "#000000"
                        opacity: 100
                      }
                      maxHeight: 400
                      maxWidth: 1200
                      quality: 90
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
    body: prismicPages(uid: { eq: $uid }) {
      data {
        body {
          ... on PrismicPagesBodyBody {
            primary {
              text {
                html
                text
              }
            }
          }
        }
      }
    }
  }
`;
