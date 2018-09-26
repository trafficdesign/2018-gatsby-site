/* eslint no-unused-vars: 0 */
import { shape, string } from "prop-types";
import styled from "styled-components";

import { defaultThm } from "ui/themes";
import { icomoon } from "assets/fonts";
import { setSpace, setType, setWidth } from "ui/mixins";
import { breakpoint, track } from "ui/settings";
import { h4, h5, h6, link, p3, p4 } from "./ofText";

const Copy = styled.div`
  /* PARENT */

  ${setType("m")};
  color: ${({ theme }) => theme.color};
  margin-left: auto;
  margin-right: auto;
  max-width: 680px;
  ${p4};

  /* GENERIC */

  p,
  blockquote,
  code,
  div,
  ul,
  ol {
    &:not(:first-child) {
      ${setSpace("mtm")};
    }
  }
  h2,
  h3,
  h4 {
    &:not(:first-child) {
      ${setSpace("mth")};
    }
  }

  /* HEADINGS */

  h2,
  h3,
  h4 {
    color: ${({ theme }) => theme.titleColor};
  }
  h2 {
    ${h4};
  }
  h3 {
    ${h5};
  }
  h4 {
    ${h6};
  }

  /* BODY TEXT */

  p:first-child {
    ${p3};
    color: ${({ theme }) => theme.titleColor};
  }
  strong {
    font-weight: 600;
  }
  em {
    ${"" /* font-size: 0.75em;
    letter-spacing: ${track.s};
    text-transform: uppercase; */} font-style: italic;
  }

  /* LISTS */

  ol,
  ul {
  }
  ol {
    counter-reset: li;
  }
  ol li:before,
  ul li:before {
    ${setSpace("mrm")};
    ${setWidth("s")};
    color: ${({ theme }) => theme.listColor};
    direction: rtl;
    display: inline-block;
    text-align: right;
  }
  ol li:before {
    content: counter(li);
    counter-increment: li;
  }
  ul li:before {
    content: "—";
  }

  /* LINKS */

  a,
  a:active,
  a:visited {
    ${link};
    color: ${({ theme }) => theme.actionColor};
  }
  a:hover {
    background-color: ${({ theme }) => theme.actionHover};
  }

  /* IMAGERY */

  p.block-img {
    padding: 2px;
    background: ${({ theme }) => theme.galleryBackg};
    line-height: 0;
    text-indent: 0;
    img {
      width: 100%;
      position: relative;
    }
  }

  /* EMBEDS */

  div[data-oembed] {
    padding: 2px;
    background: ${({ theme }) => theme.galleryBackg};
    line-height: 0;
    text-indent: 0;
  }
  iframe {
    width: 100%; /* TODO: make responsive */
  }
`;

Copy.propTypes = {
  theme: shape({
    actionColor: string,
    color: string,
    iconFont: string,
    listColor: string,
    titleColor: string
  })
};

Copy.defaultProps = {
  theme: {
    actionColor: defaultThm.actionColor,
    color: defaultThm.color,
    iconFont: defaultThm.iconFont,
    listColor: defaultThm.listColor,
    titleColor: defaultThm.titleColor
  }
};

export default Copy;
