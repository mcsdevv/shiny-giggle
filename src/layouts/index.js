import React from 'react'

import PropTypes from 'prop-types'
import Header from '../components/header'
import { Box } from '@chakra-ui/core'

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Box mx='auto' maxWidth='1024px' px='4'>
        <main>{children}</main>
      </Box>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
}

export default Layout
