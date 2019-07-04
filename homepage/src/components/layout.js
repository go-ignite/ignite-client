import React, { createContext } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import MediaQuery from "react-responsive"

import { IndexContextProvider } from "../utils/indexContext"
import Nav from "./nav"
import Footer from "./footer"

const Layout = ({ children }) => {
  const PageContext = createContext("index")

  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <div>
      <IndexContextProvider>
        <Nav></Nav>
        <main>{children}</main>
        <MediaQuery minDeviceWidth={1224}>
          <Footer></Footer>
        </MediaQuery>
      </IndexContextProvider>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
