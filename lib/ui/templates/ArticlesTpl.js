import { graphql } from "gatsby";
import { shape, object } from "prop-types";
import Img from "gatsby-image";
import React, { Component, Fragment } from "react";

import { Body, Copy, Head, TextString } from "ui/components";
import { getThatLingo, getThisLingo } from "ui/functions";
import { Layout, Helmet } from "ui/partials";
import { PATH } from "config/paths";
import DICT from "config/locales/articles";

export default class ArticlesTpl extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { data, lang, alternate_languages } = this.props.data.prismicArticles;
    const lingo = getThisLingo(lang);
    const isTranslated = alternate_languages.length > 0;

    const getSiblingPath = () => {
      if (isTranslated) {
        return `${PATH.articles[getThatLingo(lingo)]}${
          alternate_languages[0].uid
        }`;
      }
      return PATH.articles[getThatLingo(lingo)];
    };

    return (
      <Fragment>
        <Helmet
          {...this.props}
          description={data.description || null}
          keywords={data.keywords || null}
          lingo={lingo}
          title={`${data.title.text} ⋅ ${DICT.meta.title[lingo]}`}
        />
        <Layout {...this.props} lingo={lingo} siblingPath={getSiblingPath()}>
          <Head as="header">
            <TextString as="h1">
              <TextString looks="h4">{DICT.pageTitle[lingo]}</TextString>
              <TextString looks="h1">{data.title.text}</TextString>
            </TextString>
            <TextString as="p" looks="label">
              {data.date}
            </TextString>
          </Head>
          <Body as="main">
            {data.cover.localFile ? (
              <Fragment>
                <Img
                  fluid={data.cover.localFile.childImageSharp.fluid}
                  alt={data.title.text}
                />
              </Fragment>
            ) : null}
            <Copy dangerouslySetInnerHTML={{ __html: data.content.html }} />
          </Body>
        </Layout>
      </Fragment>
    );
  }
}

ArticlesTpl.propTypes = {
  data: shape({
    prismicArticles: object.isRequired
  }).isRequired
};

export const pageQuery = graphql`
  query ArticlesBySlug($uid: String!) {
    prismicArticles(uid: { eq: $uid }) {
      uid
      lang
      alternate_languages {
        uid
        lang
      }
      data {
        date
        cover {
          localFile {
            childImageSharp {
              fluid(
                duotone: {
                  highlight: "#ebeae9"
                  shadow: "#000000"
                  opacity: 100
                }
                maxHeight: 600
                maxWidth: 900
                quality: 90
              ) {
                ...GatsbyImageSharpFluid_withWebp_noBase64
              }
            }
          }
        }
        title {
          html
          text
        }
        content {
          html
          text
        }
      }
    }
  }
`;
