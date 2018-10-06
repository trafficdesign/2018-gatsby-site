import { array, bool, oneOfType, object, string } from "prop-types";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import React, { Component, Fragment } from "react";

import { mintThm, defaultThm } from "ui/themes";
import { color, font } from "ui/settings";
import { reset } from "assets/styles";
import { setSpace, setType } from "ui/mixins";
import DICT from "config/locales/global";

import { Footer, Main, Modal, Topbar } from "./ofLayout";

const GlobalStyle = createGlobalStyle`
  ${reset};
  body {
    ${setType("m")};
    background: ${({ theme }) => theme.backg};
    color: ${({ theme }) => theme.color};
    font-family: ${font.digrotesk};
  }
  img {
    line-height: 0;
  }
  a,
  abbr {
    text-decoration: none;
  }
  *::selection { background: ${({ theme }) => theme.selectionColor}; }
  *::-moz-selection { background: ${({ theme }) => theme.selectionColor}; }
  html, body {
    height: 100%;
  }
  body > div,
  body > div > div {
    height: 100%;
  }
  body > div > div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;

const Content = styled.div`
  flex: 1 0 auto;
`;

const Credits = styled.aside`
  flex-shrink: 0;
  ${setSpace("mth")};
  ${setSpace("phh")};
  ${setSpace("pvm")};
  font-size: 13px;
  background: #191919;
  color: ${color.flareLLt};
  line-height: 1em;
  text-align: center;
  width: 100%;
  a {
    color: ${color.flareD};
  }
  a:hover {
    color: white;
  }
`;

export default class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasModal: false,
      hasOffset: false,
      hasTopPos: false
    };
    this.detectScroll = this.detectScroll.bind(this);
    this.detectWidth = this.detectWidth.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  componentDidMount() {
    this.detectScroll();
    this.detectWidth();
    window.addEventListener("scroll", this.detectScroll);
    window.addEventListener("resize", this.detectWidth);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.detectScroll);
    window.removeEventListener("resize", this.detectWidth);
  }

  detectScroll() {
    this.setState({
      hasOffset: window.pageYOffset > 0,
      hasTopPos: window.pageYOffset < 75
    });
  }

  detectWidth() {
    if (this.state.hasModal && window.innerWidth >= 768) {
      this.toggleModal();
    }
    return null;
  }

  toggleModal() {
    this.setState(prevState => ({ hasModal: !prevState.hasModal }));
  }

  render() {
    const { children, lingo, location, siblingPath, isHome } = this.props;
    const { hasOffset, hasModal, hasTopPos } = this.state;
    const controls = {
      toggleModal: this.toggleModal
    };
    const conditions = {
      hasModal,
      hasOffset,
      hasTopPos
    };
    return (
      <ThemeProvider theme={defaultThm}>
        <Fragment>
          <Content>
            <Topbar
              conditions={conditions}
              controls={controls}
              lingo={lingo}
              location={location}
              siblingPath={siblingPath}
              isHome={isHome}
            />
            <Main>{children}</Main>
            <Footer lingo={lingo} isHome={isHome} />
            <GlobalStyle theme={defaultThm} />
            {hasModal ? <Modal location={location} lingo={lingo} /> : null}
          </Content>
          <ThemeProvider theme={mintThm}>
            <Credits>
              {DICT.creditLabel[lingo]}{" "}
              <a
                href="https://moglistudio.com"
                rel="noreferrer"
                target="_blank"
              >
                Mogli Studio
              </a>
            </Credits>
          </ThemeProvider>
        </Fragment>
      </ThemeProvider>
    );
  }
}

Layout.propTypes = {
  children: oneOfType([array, object]).isRequired,
  lingo: string.isRequired,
  location: object.isRequired,
  siblingPath: string,
  isHome: bool
};

Layout.defaultProps = {
  siblingPath: null,
  isHome: false
};
