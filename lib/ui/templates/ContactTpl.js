import { filter } from "lodash";
import { graphql } from "gatsby";
import { shape, object } from "prop-types";
import React, { Component, Fragment } from "react";
import styled from "styled-components";

import { Action, Body, Head, Icon, Separator, TextString } from "ui/components";
import { breakpoint } from "ui/settings";
import { getThatLingo, getThisLingo } from "ui/functions";
import { Layout, Helmet } from "ui/partials";
import { META } from "config/meta";
import { PATH } from "config/paths";
import { setSpace, setType } from "ui/mixins";

const EmailBits = styled.div`
  ${setSpace("mbh")};
  ${setType("m")};
  margin-left: auto;
  margin-right: auto;
  max-width: 680px;
  text-align: center;
`;
const ContactBits = styled.div`
  ${setType("s")};
  display: flex;
  justify-content: center;
  text-align: left;
  ul {
    position: relative;
    ${breakpoint.tabletUp} {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }
  li:not(:first-child) {
    ${setSpace("mtm")};
  }
  i {
    ${setSpace("mrm")};
    ${setType("s")};
    display: inline-block;
  }
`;

export default class ContactPageTpl extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { alternate_languages, lang } = this.props.data.prismicPages;
    const { body, cover, head, meta } = this.props.data;
    const lingo = getThisLingo(lang);
    const isTranslated = alternate_languages.length > 0;

    const getSiblingPath = () => {
      if (isTranslated) {
        return `${PATH.contact[getThatLingo(lingo)]}`;
      }
      return PATH.home[getThatLingo(lingo)];
    };

    const getData = (obj, str) => {
      const subset = filter(obj.data.body, o => o.__typename === str);
      return subset[0];
    };

    const headData = getData(head, "PrismicPagesBodyHead");
    const metaData = getData(meta, "PrismicPagesBodyMeta");

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
            <TextString as="p" looks="p3">
              {headData.primary.subheading}
            </TextString>
          </Head>
          <Body>
            <EmailBits>
              <Action
                button
                email="kontakt@trafficdesign.pl"
                obfuscated
                text="kontakt@trafficdesign.pl"
              />
            </EmailBits>
            <Separator size="h" />
            <ContactBits>
              <ul>
                <li>
                  <Icon name="facebook" size="x" />
                  <Action
                    href="https://facebook.com/trafficdesign"
                    rel="external"
                    target="_blank"
                  >
                    facebook.com/trafficdesign
                  </Action>
                </li>
                <li>
                  <Icon name="instagram" size="x" />
                  <Action
                    href="https://instagram.com/traffic_design"
                    rel="external"
                    target="_blank"
                  >
                    instagram.com/traffic_design
                  </Action>
                </li>
                <li>
                  <Icon name="linkedin" size="x" />
                  <Action
                    href="https://linkedin.com/company/traffic-design/"
                    rel="external"
                    target="_blank"
                  >
                    linkedin.com/…/traffic-design
                  </Action>
                </li>
              </ul>
            </ContactBits>
          </Body>
        </Layout>
      </Fragment>
    );
  }
}

ContactPageTpl.propTypes = {
  data: shape({
    prismicPages: object.isRequired
  }).isRequired
};

export const pageQuery = graphql`
  query ContactPageBySlug($uid: String!) {
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
  }
`;
