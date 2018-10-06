/* eslint jsx-a11y/anchor-has-content: 0 */
/* eslint react/button-has-type: 0 */
import {
  array,
  bool,
  func,
  object,
  oneOfType,
  shape,
  string
} from "prop-types";
import { Link as GatsbyButton } from "gatsby";
import React from "react";
import styled from "styled-components";

import { defaultThm } from "ui/themes";
import { font, time } from "ui/settings";
import {} from "ui/mixins";

const ButtonEl = styled.a`
  background-color: transparent;
  border-color: ${({ theme }) => theme.actionColor};
  border-style: solid;
  border-width: 2px;
  color: ${({ theme }) => theme.actionColor};
  cursor: pointer;
  display: ${({ block }) => (block ? `block` : `inline-block`)};
  font-family: ${font.digrotesk};
  font-size: inherit;
  font-weight: 600;
  outline: none;
  padding: 0.5em 1em 0.3em;
  text-align: center;
  text-decoration: none;
  transition: background ${time.m}, color ${time.m};
  width: ${({ block }) => (block ? `100%` : `auto`)};
  &:hover {
    background-color: ${({ theme }) => theme.actionColor};
    color: ${({ theme }) => theme.backg};
  }
`;

const Button = props => {
  const { onClick, to } = props;
  if (to) {
    return <ButtonEl as={GatsbyButton} {...props} theme={null} />;
  }
  if (onClick) {
    return <ButtonEl as="button" {...props} />;
  }
  return <ButtonEl {...props} />;
};

Button.propTypes = {
  block: bool,
  children: oneOfType([array, object, string]),
  href: string,
  onClick: func,
  theme: shape({
    actionColor: string
  }),
  to: string
};

Button.defaultProps = {
  block: null,
  children: null,
  href: "",
  onClick: null,
  theme: {
    actionColor: defaultThm.actionColor
  },
  to: null
};

export default Button;
