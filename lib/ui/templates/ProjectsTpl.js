import { graphql } from "gatsby";
import { shape, object } from "prop-types";
import Gallery from "react-photo-gallery";
import Img from "gatsby-image";
import Lightbox from "react-images";
import React, { Component, Fragment } from "react";
import styled from "styled-components";

import { Body, Copy, Cover, Head, TextString } from "ui/components";
import { color } from "ui/settings";
import { getThatLingo, getThisLingo } from "ui/functions";
import { Layout, Helmet } from "ui/partials";
import { PATH } from "config/paths";
import { setSpace } from "ui/mixins";
import DICT from "config/locales/projects";

const ProjectGallery = styled.div`
  ${setSpace("mth")};
  margin-left: auto;
  margin-right: auto;
  max-width: 680px;
`;

export default class ProjectsTpl extends Component {
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
    const { alternate_languages, data, lang } = this.props.data.prismicProjects;
    const lingo = getThisLingo(lang);
    const isTranslated = alternate_languages.length > 0;

    const date = lingo === "pl" ? data.datePl : data.dateEn;

    const getSiblingPath = () => {
      if (isTranslated) {
        return `${PATH.projects[getThatLingo(lingo)]}${
          alternate_languages[0].uid
        }`;
      }
      return PATH.projects[getThatLingo(lingo)];
    };

    const renderGallery = () => {
      if (data.gallery && data.gallery[0] && data.gallery[0].photo.original) {
        const { gallery } = data;
        const originals = [];
        const thumbnails = [];

        // First add Cover
        originals.push({
          height: data.cover.original.childImageSharp.fluid.height,
          src: data.cover.original.childImageSharp.fluid.src,
          srcSet: data.cover.original.childImageSharp.fluid.srcSet,
          width: data.cover.original.childImageSharp.fluid.width
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
            height: galleryItem.photo.original.childImageSharp.fluid.height,
            src: galleryItem.photo.original.childImageSharp.fluid.src,
            srcSet: galleryItem.photo.original.childImageSharp.fluid.srcSet,
            width: galleryItem.photo.original.childImageSharp.fluid.width
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
          <Fragment>
            <ProjectGallery>
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
                showThumbnails
                theme={{
                  container: {
                    background: color.shadowBlk
                  },
                  close: {
                    fill: color.flareBlk
                  },
                  footer: {
                    color: color.flareBlk
                  },
                  thumbnail: {
                    activeBorderColor: color.white
                  },
                  arrow: {
                    fill: color.white,
                    height: 80
                  }
                }}
                width={1200}
              />
            </ProjectGallery>
          </Fragment>
        ) : null;
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
        <Layout {...this.props} lingo={lingo} siblingPath={getSiblingPath()}>
          <Head as="header">
            <TextString as="h1">
              <TextString looks="p3">{DICT.pageTitle[lingo]}</TextString>
              <TextString looks="h1">{data.title.text}</TextString>
            </TextString>
            <TextString as="p" looks="label">
              {date}
            </TextString>
          </Head>
          <Body as="main">
            {data.cover.localFile ? (
              <Cover>
                <Img
                  fluid={data.cover.localFile.childImageSharp.fluid}
                  alt={data.title.text}
                />
              </Cover>
            ) : null}
            <Copy dangerouslySetInnerHTML={{ __html: data.intro.html }} />
            <Copy
              dangerouslySetInnerHTML={{ __html: data.content.html }}
              followup
            />
            {renderGallery()}
          </Body>
        </Layout>
      </Fragment>
    );
  }
}

ProjectsTpl.propTypes = {
  data: shape({
    prismicProjects: object.isRequired
  }).isRequired
};

export const pageQuery = graphql`
  query ProjectsBySlug($uid: String!) {
    prismicProjects(uid: { eq: $uid }) {
      uid
      lang
      alternate_languages {
        uid
        lang
      }
      data {
        dateEn: date(formatString: "D MMM YYYY", locale: "en")
        datePl: date(formatString: "D MMM YYYY", locale: "pl")
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
              fluid(
                maxWidth: 1200
                maxHeight: 900
                quality: 90
                traceSVG: { color: "#ebeae9" }
              ) {
                ...GatsbyImageSharpFluid
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
              ) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
        title {
          text
        }
        intro {
          html
        }
        content {
          html
        }
        gallery {
          caption {
            text
          }
          photo {
            original: localFile {
              childImageSharp {
                fluid(maxHeight: 900, maxWidth: 1200, quality: 90) {
                  ...GatsbyImageSharpFluid
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
`;
