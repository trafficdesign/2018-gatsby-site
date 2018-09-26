import { bool, func, object, shape, string } from "prop-types";
import React, { Fragment } from "react";
import styled, { ThemeProvider } from "styled-components";

import { Action, Icon, Logo, TextString } from "ui/components";
import { breakpoint, color, time, zindex } from "ui/settings";
import { defaultThm, darkThm, greyThm } from "ui/themes";
import { fadeIn } from "ui/animations";
import { getThatLingo } from "ui/functions";
import { PATH } from "config/paths";
import { setHeight, setSpace, setType } from "ui/mixins";
import DICT from "config/locales/global";

const TopbarEl = styled.header`
  ${setSpace("phl")};
  ${setSpace("pvm")};
  ${setType("s")};
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  left: 0;
  position: fixed;
  transition: background ${time.m}, box-shadow ${time.m}, padding ${time.m};
  right: 0;
  top: 0;
  z-index: ${zindex.z3};
  & > div:nth-child(1),
  & > div:nth-child(3) {
    flex: 1 1 10%;
  }
  & > div:nth-child(2) {
    flex: 1 1 80%;
    text-align: center;
  }
  & > div:nth-child(3) {
    text-align: right;
  }
  ${({ conditions }) => {
    const { hasModal, hasOffset } = conditions;
    return `
        ${setSpace(hasOffset ? "pvm" : "pvl")};
        background-color: ${
          hasOffset && !hasModal ? color.flareBlk : `transparent`
        };
        box-shadow: ${
          hasOffset && !hasModal ? `0 1px 5px ${color.shadowHL}` : `none`
        };
      `;
  }};
`;

const TopbarPush = styled.span`
  ${setHeight("h")};
  ${setSpace("mth")};
  display: block;
`;

const Head = styled.div``;
const HeadMenu = styled.span`
  ${breakpoint.tabletUp} {
    display: none;
  }
`;
const HeadMark = styled.span`
  display: none;
  ${breakpoint.tablet} {
    display: inline-block;
    transform: translateY(10%);
  }
`;
const HeadLogo = styled.span`
  display: none;
  ${breakpoint.desktopUp} {
    display: inline-block;
  }
`;

const Body = styled.div``;
const BodyLogo = styled.span`
  ${breakpoint.tabletUp} {
    display: none;
  }
`;
const BodyTitle = styled.span`
  animation: ${fadeIn} ${time.l} linear;
  ${breakpoint.tabletUp} {
    display: none;
  }
`;
const BodyMenu = styled.nav``;

const Foot = styled.div``;
const FootSwitch = styled.menu``;

const Menu = styled.ul`
  display: inline-block;
  ${breakpoint.phone} {
    display: none;
  }
`;
const MenuItem = styled.li`
  display: inline-block;
  &:not(:last-child) {
    ${setSpace("mrm")};
  }
  &:not(:first-child) {
    ${setSpace("mlm")};
  }
`;

const Topbar = props => {
  const { controls, conditions, lingo, location, siblingPath, isHome } = props;
  const { pathname } = location;

  const getSectionTitle = () => {
    if (pathname.endsWith(PATH.home.pl)) {
      return "Strona domowa";
    }
    if (pathname.endsWith(PATH.home.en)) {
      return "Home page";
    }
    if (pathname.includes(PATH.about.en) || pathname.includes(PATH.about.pl)) {
      return DICT.linktoAbout[lingo];
    }
    if (pathname.includes(PATH.about.en) || pathname.includes(PATH.about.pl)) {
      return DICT.linktoAbout[lingo];
    }
    if (
      pathname.includes(PATH.articles.en) ||
      pathname.includes(PATH.articles.pl)
    ) {
      return DICT.linktoArticles[lingo];
    }
    if (
      pathname.includes(PATH.contact.en) ||
      pathname.includes(PATH.contact.pl)
    ) {
      return DICT.linktoContact[lingo];
    }
    if (pathname.includes(PATH.news.en) || pathname.includes(PATH.news.pl)) {
      return DICT.linktoNews[lingo];
    }
    if (
      pathname.includes(PATH.projects.en) ||
      pathname.includes(PATH.projects.pl)
    ) {
      return DICT.linktoProjects[lingo];
    }
    if (pathname.includes(PATH.works.en) || pathname.includes(PATH.works.pl)) {
      return DICT.linktoWorks[lingo];
    }
    return null;
  };

  const defineTheme = () => {
    if (isHome) {
      if (conditions.hasModal) {
        return greyThm;
      }
      if (!conditions.hasOffset) {
        return darkThm;
      }
      return defaultThm;
    }
    return conditions.hasModal ? greyThm : defaultThm;
  };

  return (
    <ThemeProvider theme={defineTheme()}>
      <Fragment>
        <TopbarEl conditions={conditions}>
          <Head>
            <HeadMenu>
              <Action
                onClick={controls.toggleModal}
                style={{ border: "none", lineHeight: "1em" }}
              >
                <Icon name="menu" size="l" />
              </Action>
            </HeadMenu>
            <HeadMark>
              <Action
                style={{
                  border: "none",
                  lineHeight: "1em",
                  color: conditions.hasOffset || !isHome ? `black` : `none`
                }}
                to={PATH.home[lingo]}
              >
                <Icon name="traffic" size="l" />
              </Action>
            </HeadMark>
            <HeadLogo>
              <Action
                style={{ border: "none", lineHeight: "1em" }}
                to={PATH.home[lingo]}
              >
                <Logo
                  size="l"
                  negative={
                    isHome && !conditions.hasOffset && !conditions.hasModal
                  }
                />
              </Action>
            </HeadLogo>
          </Head>
          <Body>
            {conditions.hasTopPos ? (
              <BodyLogo>
                <Action
                  to={PATH.home[lingo]}
                  style={{ border: "none", lineHeight: "1em" }}
                >
                  <Logo
                    size="l"
                    negative={
                      isHome && !conditions.hasOffset && !conditions.hasModal
                    }
                  />
                </Action>
              </BodyLogo>
            ) : (
              <BodyTitle>
                <TextString looks="p4">{getSectionTitle()}</TextString>
              </BodyTitle>
            )}
            <BodyMenu>
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
            </BodyMenu>
          </Body>
          <Foot>
            <FootSwitch>
              <Action
                onClick={() =>
                  localStorage.setItem("lingo", `${getThatLingo(lingo)}`)
                }
                to={siblingPath}
              >
                {DICT.changeLanguage[lingo]}
              </Action>
            </FootSwitch>
          </Foot>
        </TopbarEl>
        {!isHome ? <TopbarPush /> : null}
      </Fragment>
    </ThemeProvider>
  );
};

Topbar.propTypes = {
  conditions: shape({
    hasOffset: bool,
    hasModal: bool
  }).isRequired,
  controls: shape({
    toggleModal: func.isRequired
  }).isRequired,
  lingo: string.isRequired,
  location: object.isRequired,
  siblingPath: string,
  isHome: bool
};

Topbar.defaultProps = {
  siblingPath: null,
  isHome: false
};

export default Topbar;
