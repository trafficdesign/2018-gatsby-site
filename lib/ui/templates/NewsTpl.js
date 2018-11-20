import { graphql } from "gatsby";
import { shape, object } from "prop-types";
import Img from "gatsby-image";
import React, { Component, Fragment } from "react";
import styled from "styled-components";

import { Action, Body, Copy, Cover, Head, TextString } from "ui/components";
import {
  getThatLingo,
  getThisLingo,
  filterQuery,
  formatDate
} from "ui/functions";
import { breakpoint } from "ui/settings";
import { Layout, Helmet } from "ui/partials";
import { PATH } from "config/paths";
import { setSpace, setType } from "ui/mixins";
import DICT from "config/locales/news";

const Footnotes = styled.div`
  ${setSpace("mth")};
  ${setSpace("pth")};
  ${setType("x")};
  border-top: 1px solid ${({ theme }) => theme.borderColor};
  margin-left: auto;
  margin-right: auto;
  max-width: 680px;
  ${breakpoint.tabletUp} {
    display: flex;
    flex-direction: row;
    flex: 0 0 50%;
    > * {
      flex: 0 0 ${100 / 3}%;
    }
  }
  ${breakpoint.phone} {
    ${setType("s")};
    > *:not(:last-child) {
      ${setSpace("mbl")};
    }
  }
`;

export default class NewsTpl extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { data, lang, alternate_languages } = this.props.data.prismicNews;
    const lingo = getThisLingo(lang);
    const isTranslated = alternate_languages.length > 0;

    const dates = filterQuery(data.body, "PrismicNewsBodyTime");
    const place = filterQuery(data.body, "PrismicNewsBodyPlace");
    const rsvp = filterQuery(data.body, "PrismicNewsBodyRsvp");

    const date = lingo === "pl" ? data.datePl : data.dateEn;

    const getSiblingPath = () => {
      if (isTranslated) {
        return `${PATH.news[getThatLingo(lingo)]}${alternate_languages[0].uid}`;
      }
      return PATH.news[getThatLingo(lingo)];
    };

    const renderDates = () => (
      <div>
        <div>
          <TextString as="h2" looks="highlight">
            {DICT.datesTitle[lingo]}
          </TextString>
        </div>
        <div>
          {dates.primary.start
            ? formatDate(dates.primary.start, "DD MMM YYYY", lingo)
            : null}{" "}
          –{" "}
          {dates.primary.end
            ? formatDate(dates.primary.end, "DD MMM YYYY", lingo)
            : null}
          {dates.primary.opening ? (
            <p>
              {DICT.datesOpening[lingo]}:{" "}
              {formatDate(dates.primary.opening, "DD MMM YYYY", lingo)}
            </p>
          ) : null}
          {dates.primary.deadline ? (
            <p>
              {DICT.datesClosing[lingo]}:{" "}
              {formatDate(dates.primary.deadline, "DD MMM YYYY", lingo)}
            </p>
          ) : null}
        </div>
      </div>
    );

    const renderPlace = () => (
      <div>
        <div>
          <TextString as="h2" looks="highlight">
            {DICT.placeTitle[lingo]}
          </TextString>
        </div>
        {place.primary.place ? <p>{place.primary.place}</p> : null}
        {place.primary.location ? (
          <Action href={place.primary.location}>
            {DICT.placeAction[lingo]}
          </Action>
        ) : null}
      </div>
    );

    const renderRsvp = () => (
      <div>
        <div>
          <TextString as="h2" looks="highlight">
            {DICT.rsvpTitle[lingo]}
          </TextString>
        </div>
        {rsvp.primary.price ? (
          <p>
            {DICT.rsvpPrice[lingo]}: {rsvp.primary.price}
          </p>
        ) : null}
        {rsvp.primary.link ? (
          <Action
            href={rsvp.primary.link.raw.url}
            target={rsvp.primary.link.raw.target}
          >
            {DICT.rsvpAction[lingo]}
          </Action>
        ) : null}
      </div>
    );

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
            <Copy dangerouslySetInnerHTML={{ __html: data.content.html }} />
            {dates || place || rsvp ? (
              <Footnotes>
                {dates ? renderDates() : null}
                {place ? renderPlace() : null}
                {rsvp ? renderRsvp() : null}
              </Footnotes>
            ) : null}
          </Body>
        </Layout>
      </Fragment>
    );
  }
}

NewsTpl.propTypes = {
  data: shape({
    prismicNews: object.isRequired
  }).isRequired
};

export const pageQuery = graphql`
  query NewsBySlug($uid: String!) {
    prismicNews(uid: { eq: $uid }) {
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
        }
        title {
          html
          text
        }
        content {
          html
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
      }
    }
  }
`;
