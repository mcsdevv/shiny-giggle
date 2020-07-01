/** @jsx jsx */
import { jsx, Box, Grid, Flex, Container } from "theme-ui"

import { useState, useEffect } from "react"
import { Link } from "gatsby"

import Logo from "./logo"
import Nav from "./nav"
import CartButton from "./shopify/cartButton"

export default function Header() {
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
      as="header"
      sx={{
        position: "sticky",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        backgroundColor: "background",
        py: 2,
        mb: 2,
        transition: "opacity 200ms ease",
        borderStyle: "solid",
        borderBottomWidth: 1,
        borderColor: sticky ? "gray.200" : "transparent",
      }}
    >
      <Container px="3">
        <Grid columns={["2fr 1fr 2fr"]} gap={0}>
          <Flex sx={{ alignItems: "center" }}>
            <Nav />
          </Flex>
          <Flex sx={{ justifyContent: "space-around", alignItems: "center" }}>
            <Link to="/">
              <Logo
                sx={{
                  width: 60,
                }}
              />
            </Link>
          </Flex>
          <Flex sx={{ alignItems: "center", flexDirection: "row-reverse" }}>
            <CartButton />
          </Flex>
        </Grid>
      </Container>
    </Box>
  )
}
