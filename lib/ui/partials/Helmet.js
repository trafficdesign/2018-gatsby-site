import { object, string } from "prop-types";
import Helmet from "react-helmet";
import React from "react";

import { favicon } from "assets/icons";
import { ogimage } from "assets/images";
import { META } from "config/meta";

const CustomHelmet = props => {
  const { description, keywords, lingo, location, title } = props;
  return (
    <Helmet
      encodeSpecialCharacters
      defaultTitle={META.title[lingo]}
      titleTemplate="%s ⋅ Traffic Design"
    >
      <html lang={lingo} />

      <meta name="author" content="Mogli Studio — https://moglistudio.pl" />
      <meta name="charset" content="utf-8" />
      <meta name="coverage" content="Worldwide" />
      <meta
        name="description"
        content={description || META.description[lingo]}
      />
      <meta name="designer" content="Mogli Studio — https://moglistudio.pl" />
      <meta name="distribution" content="Global" />
      <meta name="keywords" content={keywords || META.keywords[lingo]} />
      <meta name="language" content={lingo} />
      <meta name="owner" content="Traffic Design — https://trafficdesign.pl" />
      <meta name="rating" content="General" />
      <meta name="revist-after" content="after 3 days" />
      <meta name="robots" content="index, follow" />
      <meta name="title" content={title || META.title[lingo]} />
      <meta
        name="viewport"
        content="width=device-width, minimum-scale = 1.0, initial-scale = 1.0, maximum-scale = 5.0, user-scalable=yes, shrink-to-fit=no"
      />

      <title>{title || META.title[lingo]}</title>

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:creator" content="@moglistudio" />

      {/* Facebook OG */}
      <meta
        property="og:description"
        content={description || META.description[lingo]}
      />
      <meta property="og:image" content={ogimage} />
      <meta property="og:locale" content={lingo} />
      <meta property="og:site_name" content="Traffic Design" />
      <meta property="og:title" content={title || META.title[lingo]} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://trafficdesign.pl" />

      <link rel="icon" type="image/x-icon" href={favicon} />
      <link
        rel="canonical"
        href={`https://trafficdesign.pl${location.pathname}`}
      />
    </Helmet>
  );
};

CustomHelmet.propTypes = {
  description: string,
  keywords: string,
  lingo: string.isRequired,
  location: object.isRequired,
  title: string.isRequired
};

CustomHelmet.defaultProps = {
  description: null,
  keywords: null
};

export default CustomHelmet;

export const pageQuery = graphql`
  query HelmetContentByHomeSlug($uid: String!) {
    cover: prismicPages(uid: { eq: "strona-domowa" }) {
      data {
        body {
          ... on PrismicPagesBodyCover {
            primary {
              caption
              author
              photo {
                localFile {
                  childImageSharp {
                    fixed(
                      width: 800
                      height: 600
                      quality: 90
                      duotone: {
                        highlight: "#838383"
                        shadow: "#000000"
                        opacity: 100
                      }
                    ) {
                      ...GatsbyImageSharpFixed
                    }
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
