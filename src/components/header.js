/** @jsx jsx */
import { jsx, Button, Box, Grid, Flex, Badge } from "theme-ui"

import { useCartCount } from "gatsby-theme-shopify-manager"

import Logo from "./logo"
import { Link } from "gatsby"

export default function Header() {
  const cartCount = useCartCount()
  return (
    <Box
      as="nav"
      sx={{
        position: "sticky",
        top: "0",
        zIndex: "100",
        backgroundColor: "rgba(255,255,255,0.7)",
        backdropFilter: "blur(50px)",
        py: 4,
      }}
    >
      <Grid columns={["repeat(3, 1fr)"]}>
        <Flex sx={{ alignItems: "center" }}>
          <Button as={Link} to="/" variant="ghost">
            <svg fill="currentColor" viewBox="0 0 20 20" width="1rem">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
            </svg>
          </Button>
          <Button as={Link} to="/" variant="ghost">
            Kochen
          </Button>
          <Button as={Link} to="/" variant="ghost">
            Grillen
          </Button>
        </Flex>
        <Flex sx={{ justifyContent: "space-around", alignItems: "center" }}>
          <Link to="/">
            <Logo sx={{ width: 80 }} />
          </Link>
        </Flex>
        <Flex sx={{ alignItems: "center", flexDirection: "row-reverse" }}>
          <Button as={Link} to="/warenkorb">
            <Flex sx={{ alignItems: "center" }}>
              Warenkorb{" "}
              <Badge ml="2" variant="primary">
                {cartCount}
              </Badge>
            </Flex>
          </Button>
        </Flex>
      </Grid>
    </Box>
  )
}
