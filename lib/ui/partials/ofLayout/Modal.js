import { string } from "prop-types";
import React, { Fragment } from "react";
import ScrollLock from "react-scrolllock";
import styled, { ThemeProvider } from "styled-components";

import { Action } from "ui/components";
import { fadeIn } from "ui/animations";
import { greyThm } from "ui/themes";
import { PATH } from "config/paths";
import { setSpace, setType } from "ui/mixins";
import { time, zindex } from "ui/settings";
import DICT from "config/locales/global";

const ModalEl = styled.div`
  ${setSpace("pah")};
  align-items: center;
  animation: ${fadeIn} ${time.s} linear;
  background: ${({ theme }) => theme.backg};
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: ${zindex.z2};
`;

const ModalNavigation = styled.nav`
  display: block;
`;

const Menu = styled.ul`
  display: block;
`;

const MenuItem = styled.li`
  ${setSpace("mvm")};
  ${setType("l")};
  display: block;
  text-align: center;
`;

const Modal = props => {
  const { lingo, location } = props;
  const { pathname } = location;
  return (
    <ThemeProvider theme={greyThm}>
      <Fragment>
        <ModalEl {...props}>
          <ModalNavigation>
            <Menu>
              <MenuItem>
                <Action
                  isActive={pathname.includes(PATH.news[lingo])}
                  to={PATH.news[lingo]}
                >
                  {DICT.linktoNews[lingo]}
                </Action>
              </MenuItem>
              <MenuItem>
                <Action
                  isActive={pathname.includes(PATH.works[lingo])}
                  to={PATH.works[lingo]}
                >
                  {DICT.linktoWorks[lingo]}
                </Action>
              </MenuItem>
              <MenuItem>
                <Action
                  isActive={pathname.includes(PATH.projects[lingo])}
                  to={PATH.projects[lingo]}
                >
                  {DICT.linktoProjects[lingo]}
                </Action>
              </MenuItem>
              {/* <MenuItem>
                <Action
                  isActive={pathname.includes(PATH.articles[lingo])}
                  to={PATH.articles[lingo]}
                >
                  {DICT.linktoArticles[lingo]}
                </Action>
              </MenuItem> */}
              <MenuItem>
                <Action
                  isActive={pathname.includes(PATH.about[lingo])}
                  to={PATH.about[lingo]}
                >
                  {DICT.linktoAbout[lingo]}
                </Action>
              </MenuItem>
              <MenuItem>
                <Action
                  isActive={pathname.includes(PATH.contact[lingo])}
                  to={PATH.contact[lingo]}
                >
                  {DICT.linktoContact[lingo]}
                </Action>
              </MenuItem>
            </Menu>
            <Menu>
              <MenuItem>
                <Action href={PATH.shop[lingo]} rel="external" target="_blank">
                  {DICT.linktoShop[lingo]}
                </Action>
              </MenuItem>
              <MenuItem>
                <Action href={PATH.press[lingo]} rel="external" target="_blank">
                  {DICT.linktoPress[lingo]}
                </Action>
              </MenuItem>
            </Menu>
          </ModalNavigation>
        </ModalEl>
        <ScrollLock />
      </Fragment>
    </ThemeProvider>
  );
};

Modal.propTypes = {
  lingo: string.isRequired
};

Modal.defaultProps = {};

export default Modal;
