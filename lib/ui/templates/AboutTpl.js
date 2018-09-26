import { filter } from "lodash";
import { graphql } from "gatsby";
import { shape, object } from "prop-types";
import Img from "gatsby-image";
import React, { Component, Fragment } from "react";
import styled from "styled-components";

import { Action, Body, Copy, Head, Separator, TextString } from "ui/components";
import { breakpoint, font } from "ui/settings";
import { getThatLingo, getThisLingo } from "ui/functions";
import { Layout, Helmet } from "ui/partials";
import { META } from "config/meta";
import { PATH } from "config/paths";
import { setSpace, setType } from "ui/mixins";

const Members = styled.div`
  background: ${({ theme }) => theme.backg};
  margin-left: auto;
  margin-right: auto;
  max-width: 680px;
  text-align: center;
`;
const MembersList = styled.ul`
  ${breakpoint.tabletUp} {
    display: grid;
    grid-gap: 40px;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
`;
const Member = styled.li`
  ${setType("m")};
  align-content: stretch;
  align-items: center;
  grid-row-end: span 1;
  justify-content: flex-start;
  position: relative;
  text-align: center;
  ${breakpoint.phone} {
    ${setSpace("mbl")};
  }
`;

const MemberPortrait = styled.div`
  ${setSpace("mbm")};
  ${breakpoint.phone} {
    margin-left: auto;
    margin-right: auto;
    max-width: 50%;
  }
`;

const MemberName = styled.h2`
  ${setType("s")};
  color: ${({ theme }) => theme.titleColor};
  font-family: ${font.digrotesk};
  font-weight: 600;
`;
const MemberTitle = styled.span`
  ${setType("x")};
  display: block;
  text-transform: uppercase;
`;
const MemberMail = styled.span`
  ${setType("x")};
  display: block;
`;

export default class AboutPageTpl extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { alternate_languages, lang } = this.props.data.prismicPages;
    const { body, cover, head, meta, team } = this.props.data;
    const lingo = getThisLingo(lang);
    const isTranslated = alternate_languages.length > 0;

    const getSiblingPath = () => {
      if (isTranslated) {
        return `${PATH.about[getThatLingo(lingo)]}`;
      }
      return PATH.home[getThatLingo(lingo)];
    };

    const getData = (obj, str) => {
      const subset = filter(obj.data.body, o => o.__typename === str);
      return subset[0];
    };

    const bodyData = getData(body, "PrismicPagesBodyBody");
    const coverData = getData(cover, "PrismicPagesBodyCover");
    const headData = getData(head, "PrismicPagesBodyHead");
    const metaData = getData(meta, "PrismicPagesBodyMeta");
    const teamData = getData(team, "PrismicPagesBodyTeam");

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
            <Separator size="x" silent />
            <TextString as="p" looks="p3">
              {headData.primary.subheading}
            </TextString>
          </Head>
          <Separator size="l" silent />
          <Body>
            <Img
              fluid={coverData.primary.photo.localFile.childImageSharp.fluid}
              alt={`${coverData.primary.caption} — ${coverData.primary.author}`}
            />
            <Separator silent size="m" />
            <Copy
              dangerouslySetInnerHTML={{ __html: bodyData.primary.text.html }}
            />
            <Separator size="h" />
            <Members>
              <TextString as="h2" looks="h3">
                {teamData.primary.heading}
              </TextString>
              <Separator silent size="m" />
              <MembersList>
                {teamData.items.map((member, i) => (
                  <Member key={i}>
                    <div>
                      <MemberPortrait>
                        <Img
                          fluid={member.avatar.localFile.childImageSharp.fluid}
                          alt={`${member.fname} ${member.lname}`}
                        />
                      </MemberPortrait>
                    </div>
                    <div>
                      <MemberName>
                        {member.fname} {member.lname}
                      </MemberName>
                      <MemberTitle>{member.title}</MemberTitle>
                      <MemberMail>
                        <Action obfuscated email={member.email} />
                      </MemberMail>
                    </div>
                  </Member>
                ))}
              </MembersList>
            </Members>
          </Body>
        </Layout>
      </Fragment>
    );
  }
}

AboutPageTpl.propTypes = {
  data: shape({
    prismicPages: object.isRequired
  }).isRequired
};

export const pageQuery = graphql`
  query AboutPageBySlug($uid: String!) {
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
                      duotone: {
                        highlight: "#ebeae9"
                        shadow: "#000000"
                        opacity: 100
                      }
                      quality: 90
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
    body: prismicPages(uid: { eq: $uid }) {
      data {
        body {
          ... on PrismicPagesBodyBody {
            primary {
              text {
                html
                text
              }
            }
          }
        }
      }
    }
    team: prismicPages(uid: { eq: $uid }) {
      data {
        body {
          ... on PrismicPagesBodyTeam {
            primary {
              heading
            }
            items {
              fname
              lname
              title
              email
              avatar {
                localFile {
                  childImageSharp {
                    fluid(
                      duotone: {
                        highlight: "#ebeae9"
                        shadow: "#000000"
                        opacity: 100
                      }
                      maxHeight: 400
                      maxWidth: 400
                      quality: 90
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
  }
`;
