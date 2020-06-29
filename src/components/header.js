/** @jsx jsx */
import { jsx, Button, Box, Grid, Flex, Badge, Container } from "theme-ui"

import { useCartCount } from "gatsby-theme-shopify-manager"
import { useState, useEffect } from "react"
import { Link } from "gatsby"

import Logo from "./logo"

export default function Header() {
  const cartCount = useCartCount()
  const [sticky, setSticky] = useState(false)
  function scrollFunction() {
    if (
      document.body.scrollTop > 50 ||
      document.documentElement.scrollTop > 50
    ) {
      setSticky(true)
    } else setSticky(false)
  }
  useEffect(() => {
    scrollFunction()
    window.onscroll = e => {
      scrollFunction()
    }
  }, [])

  return (
    <Box
      className="header"
      as="nav"
      sx={{
        position: "sticky",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        backgroundColor: "rgba(255,255,255,0.9)",
        py: 2,
        transition: "opacity 200ms ease",
        borderStyle: "solid",
        borderBottomWidth: 1,
        borderColor: sticky ? "gray.200" : "transparent",
      }}
    >
      <Container px="3">
        <Grid columns={["2fr 1fr 2fr"]} gap={0}>
          <Flex sx={{ alignItems: "center" }}>
            <Box sx={{ display: ["none", "flex", null] }}>
              <Button
                as={Link}
                to="/"
                variant="ghost"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <svg fill="currentColor" viewBox="0 0 20 20" width="18px">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                </svg>
              </Button>
              <Button as={Link} to="/" variant="ghost">
                Kochen
              </Button>
              <Button as={Link} to="/" variant="ghost">
                Grillen
              </Button>
            </Box>
          </Flex>
          <Flex sx={{ justifyContent: "space-around", alignItems: "center" }}>
            <Link to="/">
              <Logo
                sx={{
                  width: "50px",
                }}
              />
            </Link>
          </Flex>
          <Flex sx={{ alignItems: "center", flexDirection: "row-reverse" }}>
            <Button
              as={Link}
              to="/warenkorb"
              variant={cartCount > 0 ? "success" : "muted"}
            >
              <Flex sx={{ alignItems: "center" }}>
                Warenkorb{" "}
                <Badge ml="2" variant={cartCount > 0 ? "success" : "primary"}>
                  {cartCount}
                </Badge>
              </Flex>
            </Button>
          </Flex>
        </Grid>
      </Container>
    </Box>
  )
}
