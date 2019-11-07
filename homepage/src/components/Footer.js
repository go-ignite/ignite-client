import React from "react"
import styled from "styled-components"
import { Wrap } from "./ui"
const footer = () => (
  <Footer className="main-copyright">
    <Wrap>
      <FooterWrap>
        <p>
          © {new Date().getFullYear()}, Built by
          {` `}
          <FooterLink href="https://github.com/go-ignite" target="_blank">
            go-ignite
          </FooterLink>
        </p>
        <FooterLinks>
        </FooterLinks>
      </FooterWrap>
    </Wrap>
  </Footer>
)

const Footer = styled.footer`
  width: 100%;
  color: #000;
  border-top: 1px solid rgba(25, 25, 38, 0.07);
  font-size: 13px;
  color: rgba(44, 43, 57, 0.7);

`
const FooterWrap = styled.div`
  padding: 20px;
  display: flex;
  justify-content: center;
`
const FooterLinks = styled.div`
  display: flex;
  align-items: center;
`
const FooterLink = styled.a`
  color: rgba(44, 43, 57, 0.7);
 `
export default footer
