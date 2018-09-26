import { shape, string } from "prop-types";
import styled from "styled-components";

import { breakpoint, color, font } from "ui/settings";
import { setSpace, setType } from "ui/mixins";

const TextBlock = styled.div`
  ${setType("x")};
  color: ${({ theme }) => theme.color};
  font-family: ${font.sans};
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  code,
  ul,
  ol {
    &:not(:last-child) {
      ${setSpace("mbl")};
    }
  }
  em {
    color: ${({ theme }) => theme.emColor};
  }
  ${breakpoint.phone} {
    text-align: center;
  }
`;

TextBlock.propTypes = {
  theme: shape({
    color: string,
    emColor: string,
    linkColor: string,
    titleColor: string
  })
};

TextBlock.defaultProps = {
  theme: {
    color: color.black,
    emColor: color.black,
    linkColor: color.black,
    titleColor: color.black
  }
};

export default TextBlock;
