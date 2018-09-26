import { graphql } from "gatsby";
import { shape, object } from "prop-types";
import Gallery from "react-photo-gallery";
import Img from "gatsby-image";
import Lightbox from "react-images";
import React, { Component, Fragment } from "react";
import styled, { ThemeProvider } from "styled-components";

import { Action, Body, Head, Separator, TextString } from "ui/components";
import { breakpoint } from "ui/settings";
import { getThatLingo, getThisLingo } from "ui/functions";
import { Layout, Helmet } from "ui/partials";
import { PATH } from "config/paths";
import { setSpace, setType } from "ui/mixins";
import { blueThm } from "ui/themes";
import DICT from "config/locales/works";

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
  ${breakpoint.tabletUp} {
    display: flex;
    flex-direction: row;
    & > * {
      flex: 0 0 ${100 / 3}%;
    }
  }
  ${breakpoint.phone} {
    & > *:not(:last-child) {
      ${setSpace("mbm")};
    }
  }
`;
const Photos = styled.div`
  ${setSpace("mth")};
  margin-left: auto;
  margin-right: auto;
  max-width: 680px;
  text-align: center;
`;
const Authors = styled.div`
  ${setSpace("mth")};
  margin-left: auto;
  margin-right: auto;
  max-width: 680px;
  li:not(:last-child) {
    ${setSpace("mbm")};
  }
`;

export default class WorksTpl extends Component {
  constructor() {
    super();
    this.state = { currentImage: 0 };
    this.closeLightbox = this.closeLightbox.bind(this);
    this.openLightbox = this.openLightbox.bind(this);
    this.gotoNext = this.gotoNext.bind(this);
    this.gotoPrevious = this.gotoPrevious.bind(this);
  }

  openLightbox(event, obj) {
    this.setState({
      currentImage: obj.index,
      lightboxIsOpen: true
    });
  }

  closeLightbox() {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false
    });
  }

  gotoPrevious() {
    this.setState({
      currentImage: this.state.currentImage - 1
    });
  }

  gotoNext() {
    this.setState({
      currentImage: this.state.currentImage + 1
    });
  }

  render() {
    const { data, lang, alternate_languages } = this.props.data.prismicWorks;
    const lingo = getThisLingo(lang);
    const isTranslated = alternate_languages.length > 0;

    const getSiblingPath = () => {
      if (isTranslated) {
        return `${PATH.works[getThatLingo(lingo)]}${
          alternate_languages[0].uid
        }`;
      }
      return PATH.works[getThatLingo(lingo)];
    };

    const displayDetails = () => {
      const { city, map, partner, project } = data;
      return (
        <ThemeProvider theme={blueThm}>
          <Details>
            {city || map ? (
              <div>
                <TextString as="h2" looks="strong">
                  {DICT.placeLabel[lingo]}
                </TextString>
                {map ? (
                  <Action href={map} target="_blank" noreferrer>
                    {city}
                  </Action>
                ) : (
                  <TextString as="p" looks="p5">
                    {city}
                  </TextString>
                )}
              </div>
            ) : null}
            {partner ? (
              <div>
                <TextString as="h2" looks="strong">
                  {DICT.partnerLabel[lingo]}
                </TextString>
                <TextString as="p" looks="p5">
                  {partner}
                </TextString>
              </div>
            ) : null}
            {project ? (
              <div>
                <TextString as="h2" looks="strong">
                  {DICT.projectLabel[lingo]}
                </TextString>
                <Action to={`${PATH.projects[lingo]}${project.url}`}>
                  {project.document[0].data.title.text}
                </Action>
              </div>
            ) : null}
          </Details>
        </ThemeProvider>
      );
    };

    const displayGallery = () => {
      if (data.gallery) {
        const { gallery } = data;
        const originals = [];
        const thumbnails = [];

        // First add Cover
        originals.push({
          height: data.cover.original.childImageSharp.fixed.height,
          src: data.cover.original.childImageSharp.fixed.src,
          srcSet: data.cover.original.childImageSharp.fixed.srcSet,
          width: data.cover.original.childImageSharp.fixed.width
        });
        thumbnails.push({
          height: data.cover.thumbnail.childImageSharp.fixed.height,
          src: data.cover.thumbnail.childImageSharp.fixed.src,
          srcSet: data.cover.thumbnail.childImageSharp.fixed.srcSet,
          width: data.cover.thumbnail.childImageSharp.fixed.width
        });

        // Then add gallery items
        gallery.forEach(galleryItem => {
          const original = {
            height: galleryItem.photo.original.childImageSharp.fixed.height,
            src: galleryItem.photo.original.childImageSharp.fixed.src,
            srcSet: galleryItem.photo.original.childImageSharp.fixed.srcSet,
            width: galleryItem.photo.original.childImageSharp.fixed.width
          };
          const thumbnail = {
            alt: galleryItem.caption.text,
            height: galleryItem.photo.thumbnail.childImageSharp.fixed.height,
            src: galleryItem.photo.thumbnail.childImageSharp.fixed.src,
            srcSet: galleryItem.photo.thumbnail.childImageSharp.fixed.srcSet,
            width: galleryItem.photo.thumbnail.childImageSharp.fixed.width
          };
          thumbnails.push(thumbnail);
          originals.push(original);
        });
        return originals.length > 0 ? (
          <Photos>
            <Gallery
              columns={3}
              onClick={this.openLightbox}
              photos={thumbnails}
            />
            <Lightbox
              currentImage={this.state.currentImage}
              images={originals}
              isOpen={this.state.lightboxIsOpen}
              onClickNext={this.gotoNext}
              onClickPrev={this.gotoPrevious}
              onClose={this.closeLightbox}
              //
              backdropClosesModal
              showImageCount={false}
              width={1200}
            />
          </Photos>
        ) : null;
      }
      return null;
    };

    const displayAuthors = () => {
      if (data.authors && data.authors[0].author !== null) {
        return (
          <Authors>
            <Head as="div">
              <TextString as="h2" looks="h5">
                {data.authors.length > 1
                  ? DICT.authorsTitlePlural[lingo]
                  : DICT.authorsTitleSingular[lingo]}
              </TextString>
            </Head>
            <Separator size="m" silent />
            <ul>
              {data.authors.map((author, i) => {
                const authorData = author.author.document[0].data;
                return (
                  <li key={i}>
                    <TextString as="h2" looks="strong">
                      {authorData.name}
                    </TextString>
                    <TextString as="p" looks="p5">
                      {authorData.bio.text}
                    </TextString>
                  </li>
                );
              })}
            </ul>
          </Authors>
        );
      }
      return null;
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
        <Layout
          {...this.props}
          lingo={getThisLingo(lang)}
          siblingPath={getSiblingPath()}
        >
          <Head as="header">
            <TextString as="h1">
              <TextString looks="p3">{DICT.pageTitle[lingo]}</TextString>
              <Separator silent size="x" />
              <TextString looks="h1">{data.title.text}</TextString>
            </TextString>
            <Separator size="x" silent />
            <TextString as="p" looks="label">
              {data.date}
            </TextString>
          </Head>
          <Separator size="l" silent />
          <Body as="main">
            <Img
              fluid={data.cover.localFile.childImageSharp.fluid}
              alt={data.title.text}
            />
            {displayDetails()}
            {displayGallery()}
            {displayAuthors()}
          </Body>
        </Layout>
      </Fragment>
    );
  }
}

WorksTpl.propTypes = {
  data: shape({
    prismicWorks: object.isRequired
  }).isRequired
};

export const pageQuery = graphql`
  query WorksBySlug($uid: String!) {
    prismicWorks(uid: { eq: $uid }) {
      uid
      lang
      alternate_languages {
        uid
        lang
      }
      data {
        cover {
          localFile {
            childImageSharp {
              fluid(
                duotone: {
                  highlight: "#ffffff"
                  shadow: "#000000"
                  opacity: 100
                }
                quality: 90
                traceSVG: { color: "#ebeae9" }
              ) {
                ...GatsbyImageSharpFluid_withWebp_tracedSVG
              }
            }
          }
          original: localFile {
            childImageSharp {
              fixed(
                width: 1200
                height: 900
                quality: 90
                traceSVG: { color: "#ebeae9" }
              ) {
                ...GatsbyImageSharpFixed_withWebp_tracedSVG
              }
            }
          }
          thumbnail: localFile {
            childImageSharp {
              fixed(
                duotone: {
                  highlight: "#ffffff"
                  shadow: "#000000"
                  opacity: 100
                }
                width: 400
                height: 300
                quality: 90
                traceSVG: { color: "#ebeae9" }
              ) {
                ...GatsbyImageSharpFixed_withWebp_tracedSVG
              }
            }
          }
        }
        title {
          text
        }
        project {
          url
          document {
            id
            data {
              date
              title {
                text
              }
            }
          }
        }
        date(formatString: "MMMM YYYY", locale: "pl")
        city
        map
        authors {
          author {
            document {
              uid
              data {
                name
                bio {
                  text
                }
              }
            }
          }
        }
        gallery {
          caption {
            text
          }
          photo {
            original: localFile {
              childImageSharp {
                fixed(height: 900, width: 1200, quality: 90) {
                  ...GatsbyImageSharpFixed_withWebp_tracedSVG
                }
              }
            }
            thumbnail: localFile {
              childImageSharp {
                fixed(
                  duotone: {
                    highlight: "#ffffff"
                    shadow: "#000000"
                    opacity: 100
                  }
                  height: 300
                  width: 400
                  quality: 90
                  traceSVG: { color: "#ebeae9" }
                ) {
                  ...GatsbyImageSharpFixed_withWebp_tracedSVG
                }
              }
            }
          }
        }
      }
    }
  }
`;
