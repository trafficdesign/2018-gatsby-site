import { filter } from "lodash";
import { object, shape, string } from "prop-types";
import Helmet from "react-helmet";
import React from "react";

import { favicon } from "assets/icons";
import { META } from "config/meta";

const CustomHelmet = props => {
  const { description, keywords, lingo, location, title, data } = props;

  // Get Open Graph social image:
  const { cover } = data;
  const getData = (obj, str) => {
    const subset = filter(obj.data.body, o => o.__typename === str);
    return subset[0];
  };
  const coverData = getData(cover, "PrismicPagesBodyCover");
  const OGImage = coverData.primary.photo.localFile.childImageSharp.fluid.src;

  return (
    <Helmet
      encodeSpecialCharacters
      meta={[
        { name: "author", content: "Mogli Studio — https://moglistudio.pl" },
        { name: "charset", content: "utf-8" },
        { name: "coverage", content: "Worldwide" },
        {
          name: "description",
          content: description || META.description[lingo]
        },
        { name: "designer", content: "Mogli Studio — https://moglistudio.pl" },
        { name: "distribution", content: "Global" },
        {
          name: "keywords",
          content: keywords || META.keywords[lingo]
        },
        { name: "language", content: lingo },
        { name: "owner", content: "Traffic Design — https://trafficdesign.pl" },
        { name: "rating", content: "General" },
        { name: "revist-after", content: "after 3 days" },
        { name: "robots", content: "index, follow" },
        { name: "title", content: title || META.title[lingo] },
        {
          name: "viewport",
          content:
            "width=device-width, minimum-scale = 1.0, initial-scale = 1.0, maximum-scale = 5.0, user-scalable=yes, shrink-to-fit=no"
        }
      ]}
      defaultTitle="Traffic Design"
      titleTemplate="%s ⋅ Traffic Design"
    >
      <html lang={lingo} />

      <title>{title || META.title[lingo]}</title>

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:creator" content="@moglistudio" />

      {/* Facebook OG */}
      <meta
        property="og:description"
        content={description || META.description[lingo]}
      />
      <meta property="og:image" content={OGImage} />
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
  data: shape({
    cover: object.isRequired
  }).isRequired,
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
