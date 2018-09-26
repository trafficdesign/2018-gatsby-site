import { bool, string } from "prop-types";
import React from "react";
import styled from "styled-components";

import { setHeight } from "ui/mixins";
import { tdMark, negativeTdMark } from "assets/images";

const BrandMarkEl = styled.img`
  ${({ size }) => setHeight(size)};
`;

const BrandMark = ({ negative, size }) => (
  <BrandMarkEl src={negative ? negativeTdMark : tdMark} size={size} />
);

BrandMark.propTypes = {
  negative: bool,
  size: string
};

BrandMark.defaultProps = {
  negative: null,
  size: "m"
};

export default BrandMark;
