/* eslint jsx-a11y/anchor-has-content: 0 */
/* eslint react/button-has-type: 0 */
import { array, func, object, oneOfType, shape, string } from "prop-types";
import { Link as GatsbyLink } from "gatsby";
import React from "react";
import styled from "styled-components";

import { defaultThm } from "ui/themes";
import { time } from "ui/settings";

const LinkEl = styled.a`
  border-color: ${({ isActive, theme }) =>
    isActive ? theme.actionColor : `transparent`};
  border-style: solid;
  border-width: 0 0 3px 0;
  color: ${({ theme }) => theme.actionColor};
  cursor: pointer;
  display: inline-block;
  font-family: inherit;
  font-size: inherit;
  font-weight: 600;
  line-height: inherit;
  text-align: center;
  text-decoration: none;
  transition: border ${time.m};
  white-space: normal;
  &:hover {
    border-color: ${({ theme }) => theme.actionColor};
  }
`;

const Link = props => {
  const { onClick, to } = props;
  if (to) {
    return <LinkEl as={GatsbyLink} {...props} theme={null} />;
  }
  if (onClick) {
    return <LinkEl as="a" {...props} />;
  }
  return <LinkEl {...props} />;
};

Link.propTypes = {
  children: oneOfType([array, object, string]),
  href: string,
  onClick: func,
  theme: shape({
    actionColor: string
  }),
  to: string
};

Link.defaultProps = {
  children: null,
  href: "",
  onClick: null,
  theme: {
    actionColor: defaultThm.actionColor
  },
  to: null
};

export default Link;
