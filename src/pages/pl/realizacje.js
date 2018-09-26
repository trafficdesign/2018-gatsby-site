import { array, shape } from "prop-types";
import { graphql } from "gatsby";
import React from "react";

import { WorksListingTpl } from "ui/templates";

const PlWorksPage = props => {
  const { edges } = props.data.works;
  return <WorksListingTpl {...props} edges={edges} lingo="pl" />;
};

PlWorksPage.propTypes = {
  data: shape({
    works: shape({
      edges: array.isRequired
    })
  }).isRequired
};

export default PlWorksPage;

export const pageQuery = graphql`
  query PlWorksListingQuery {
    works: allPrismicWorks(
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
                    maxWidth: 400
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
            type
            date(formatString: "D MMM YYYY", locale: "pl")
            city
            authors {
              author {
                document {
                  uid
                  data {
                    name
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
