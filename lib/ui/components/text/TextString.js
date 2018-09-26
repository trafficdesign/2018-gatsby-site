import styled from "styled-components";
import { shape, string } from "prop-types";

import {} from "ui/settings";
import {} from "ui/mixins";
import { defaultThm } from "ui/themes";
import {
  action,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  highlight,
  label,
  link,
  p1,
  p2,
  p3,
  p4,
  p5,
  strong
} from "./ofText";

const TextString = styled.span`
  ${({ looks, theme }) => {
    if (looks === "action") {
      return `
        ${action};
        border-color: ${theme.actionColor};
        color: ${theme.actionColor};
        text-shadow: 0 0px 10px ${theme.backg};
      `;
    }
    if (looks === "h1") {
      return `
        ${h1};
        color: ${theme.titleColor};
      `;
    }
    if (looks === "h2") {
      return `
        ${h2};
        color: ${theme.titleColor};
      `;
    }
    if (looks === "h3") {
      return `
        ${h3};
        color: ${theme.titleColor};
      `;
    }
    if (looks === "h4") {
      return `
        ${h4};
        color: ${theme.titleColor};
      `;
    }
    if (looks === "h5") {
      return `
        ${h5};
        color: ${theme.titleColor};
      `;
    }
    if (looks === "h6") {
      return `
        ${h6};
        color: ${theme.titleColor};
      `;
    }
    if (looks === "p1") {
      return `
        ${p1};
        color: ${theme.color};
      `;
    }
    if (looks === "p2") {
      return `
        ${p2};
        color: ${theme.color};
      `;
    }
    if (looks === "p3") {
      return `
        ${p3};
        color: ${theme.color};
      `;
    }
    if (looks === "p4") {
      return `
        ${p4};
        color: ${theme.color};
      `;
    }
    if (looks === "p5") {
      return `
        ${p5};
        color: ${theme.color};
      `;
    }
    if (looks === "label") {
      return `
        ${label};
        color: ${theme.labelColor};
      `;
    }
    if (looks === "link") {
      return `
        ${link};
        color: ${theme.actionColor};
        &:hover {
          background-color: ${theme.actionHover};
        }
      `;
    }
    if (looks === "highlight") {
      return `
        ${highlight};
        background-color: ${theme.highlightBackg};
        color: ${theme.highlightColor};
      `;
    }
    if (looks === "strong") {
      return `
        ${strong};
        color: ${theme.titleColor};
      `;
    }
    return ``;
  }};
`;

TextString.propTypes = {
  looks: string,
  theme: shape({
    actionColor: string,
    labelColor: string
  })
};

TextString.defaultProps = {
  looks: null,
  theme: {
    actionColor: defaultThm.actionColor,
    labelColor: defaultThm.labelColor
  }
};

export default TextString;
