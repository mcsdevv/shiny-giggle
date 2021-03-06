import React from 'react'

import PropTypes from 'prop-types'
import Header from '../components/header'

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div className='container mx-auto mb-16 px-4'>
        <main>{children}</main>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
}

export default Layout
