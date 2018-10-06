import { bool, shape, string } from "prop-types";
import styled from "styled-components";

import { defaultThm } from "ui/themes";
import { setSpace, setWidth } from "ui/mixins";

const Separator = styled.hr`
  ${setSpace("pan")};
  border-style: solid;
  ${({ dir, silent, size, theme }) =>
    dir === "v"
      ? `
    ${setSpace(`mh${size}`)};
    ${setSpace("mvn")};
    border-color: ${silent ? `transparent` : theme.separatorColor};
    border-width: 0 0 0 3px;
    display: inline-block;
    height: 1em;
    vertical-align: text-top;
    transform: translateY(9%);
  `
      : `
    ${setSpace(`mv${size}`)};
    ${setWidth("s")};
    border-color: ${silent ? `transparent` : theme.separatorColor};
    border-width: 3px 0 0;
    clear: both;
    display: block;
    margin-left: auto;
    margin-right: auto;
  `};
`;

Separator.propTypes = {
  dir: string,
  size: string,
  silent: bool,
  theme: shape({
    separatorColor: string
  })
};

Separator.defaultProps = {
  dir: "h",
  size: "m",
  silent: false,
  theme: {
    separatorColor: defaultThm.separatorColor
  }
};

export default Separator;
