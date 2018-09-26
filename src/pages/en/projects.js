import { array, shape } from "prop-types";
import { graphql } from "gatsby";
import React from "react";

import { ProjectsListingTpl } from "ui/templates";

const EnProjectsPage = props => {
  const { edges } = props.data.projects;
  return <ProjectsListingTpl {...props} edges={edges} lingo="en" />;
};

EnProjectsPage.propTypes = {
  data: shape({
    projects: shape({
      edges: array.isRequired
    })
  }).isRequired
};

export default EnProjectsPage;

export const pageQuery = graphql`
  query EnProjectsListingQuery {
    projects: allPrismicProjects(
      filter: { lang: { eq: "en-pl" } }
      sort: { fields: [data___date], order: DESC }
    ) {
      edges {
        node {
          uid
          data {
            title {
              text
            }
            intro {
              text
            }
            date(formatString: "D MMM YYYY", locale: "en")
            cover {
              localFile {
                childImageSharp {
                  fluid(
                    duotone: {
                      highlight: "#838383"
                      shadow: "#000000"
                      opacity: 100
                    }
                    maxHeight: 600
                    maxWidth: 900
                    quality: 90
                    traceSVG: { color: "#ebeae9" }
                  ) {
                    ...GatsbyImageSharpFluid_withWebp_tracedSVG
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
