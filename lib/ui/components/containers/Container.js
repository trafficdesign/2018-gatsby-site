import styled from "styled-components";
import { bool, string } from "prop-types";

import {} from "ui/settings";
import {} from "ui/mixins";

const Container = styled.div`
  position: relative;
  text-align: ${({ align }) => align || "inherit"};
  min-height: ${({ cover }) => (cover ? "100vh" : "none")};
    return null;
  }}`;

Container.propTypes = {
  align: string,
  cover: bool
};

Container.defaultProps = {
  align: null,
  cover: null
};

export default Container;
