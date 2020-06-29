/** @jsx jsx */
import { jsx, Container, Box } from "theme-ui"

import PropTypes from "prop-types"
import Header from "../components/header"

const Layout = ({ children }) => {
  return (
    <Box>
      <Header />
      <Container px="3" pb="4">
        <main>{children}</main>
      </Container>
    </Box>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
