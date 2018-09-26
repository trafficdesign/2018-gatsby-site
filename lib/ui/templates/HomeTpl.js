import { filter } from "lodash";
import { graphql } from "gatsby";
import { shape, object } from "prop-types";
import Img from "gatsby-image";
import React, { Component, Fragment } from "react";

import { Body, Head, Separator, TextString } from "ui/components";
import { getThatLingo, getThisLingo } from "ui/functions";
import { Layout, Helmet } from "ui/partials";
import { META } from "config/meta";
import { PATH } from "config/paths";

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
        <Layout {...this.props} lingo={lingo} siblingPath={getSiblingPath()}>
          <Head>
            <TextString as="h1" looks="h1">
              {headData.primary.heading}
            </TextString>
          </Head>
          <Separator size="l" silent />
          <Body>
            <Img
              fluid={coverData.primary.photo.localFile.childImageSharp.fluid}
              alt={`${coverData.primary.caption} — ${coverData.primary.author}`}
            />
            <TextString as="p" looks="h2">
              {headData.primary.subheading}
            </TextString>
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
                        highlight: "#ffffff"
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
