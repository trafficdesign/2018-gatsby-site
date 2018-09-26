import {} from "prop-types";
import React from "react";
import styled from "styled-components";

import { breakpoint, time } from "ui/settings";
import { fadeIn } from "ui/animations";
import { setSpace } from "ui/mixins";

const MainEl = styled.main`
  ${setSpace("mal")};
  & > * {
    animation: ${fadeIn} ${time.m} linear;
  }
  ${breakpoint.tabletUp} {
    ${setSpace("mah")};
  }
`;

const MainContent = styled.div``;

const Main = props => {
  const { children } = props;
  return (
    <MainEl {...props}>
      <MainContent>{children}</MainContent>
    </MainEl>
  );
};

Main.propTypes = {};

Main.defaultProps = {};

export default Main;
