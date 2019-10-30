import React from "react"
import PropTypes from "prop-types"
import { IndexContextProvider } from "../utils/indexContext"
import Header from "./Header"

const Layout = ({ children }) => {
  return (
    <div>
      <IndexContextProvider>
        <Header></Header>
        <main>{children}</main>
      </IndexContextProvider>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
