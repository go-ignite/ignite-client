import React from "react"
import styled from 'styled-components'
const footer = () => (
  <Footer className="main-copyright">
    © {new Date().getFullYear()}, Built with
    {` `}
    <a href="https://github.com/go-ignite">go-ignite</a>
  </Footer>
)

const Footer = styled.footer`
  position: absolute;
  bottom: 0;
  width: 100%;
  z-index: 5;
`
export default footer;
