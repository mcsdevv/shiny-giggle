import React from "react"

import PropTypes from "prop-types"
import Header from "../components/header"

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <div className="container mx-auto mb-16">
        <main>{children}</main>
      </div>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
