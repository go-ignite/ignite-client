import React from "react"
import PropTypes from "prop-types"
import { IndexContextProvider } from "../utils/indexContext"
import Nav from "./nav"

const Layout = ({ children }) => {
  return (
    <div>
      <IndexContextProvider>
        <Nav></Nav>
        <main>{children}</main>
      </IndexContextProvider>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
