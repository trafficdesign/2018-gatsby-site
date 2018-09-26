import { array, shape } from "prop-types";
import { graphql } from "gatsby";
import React from "react";

import { NewsListingTpl } from "ui/templates";

const PlNewsPage = props => {
  const { edges } = props.data.news;
  return <NewsListingTpl {...props} edges={edges} lingo="pl" />;
};

PlNewsPage.propTypes = {
  data: shape({
    news: shape({
      edges: array.isRequired
    })
  }).isRequired
};

export default PlNewsPage;

export const pageQuery = graphql`
  query PlNewsListingQuery {
    news: allPrismicNews(
      filter: { lang: { eq: "pl" } }
      sort: { fields: [data___date], order: DESC }
    ) {
      edges {
        node {
          uid
          data {
            cover {
              localFile {
                childImageSharp {
                  fluid(
                    duotone: {
                      highlight: "#838383"
                      shadow: "#000000"
                      opacity: 100
                    }
                    maxHeight: 300
                    maxWidth: 450
                    quality: 90
                    traceSVG: { color: "#ebeae9" }
                  ) {
                    ...GatsbyImageSharpFluid_withWebp_tracedSVG
                  }
                }
              }
            }
            title {
              text
            }
            content {
              text
            }
            body {
              ... on PrismicNewsBodyPlace {
                slice_type
                primary {
                  place
                  location
                }
              }
              ... on PrismicNewsBodyTime {
                slice_type
                primary {
                  start
                  end
                  opening
                  deadline
                }
              }
              ... on PrismicNewsBodyRsvp {
                slice_type
                primary {
                  price
                  link {
                    url
                    raw {
                      link_type
                      url
                      target
                    }
                  }
                }
              }
            }
            date(formatString: "D MMM YYYY", locale: "pl")
          }
        }
      }
    }
  }
`;
