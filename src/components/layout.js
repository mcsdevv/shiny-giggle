/** @jsx jsx */
import { jsx, Box } from "theme-ui"

import PropTypes from "prop-types"
import Header from "./header"

const Layout = ({ children }) => {
  return (
    <Box
      sx={{
        maxWidth: "1024px",
        mx: "auto",
      }}
    >
      <Header />
      <main>{children}</main>
    </Box>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
