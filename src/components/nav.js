/** @jsx jsx */
import { jsx, Box, Button } from "theme-ui"
import { Home } from "./icons"
import { Link } from "gatsby"

export default function Nav() {
  return (
    <Box sx={{ display: ["none", "flex", null] }}>
      <Button
        as={Link}
        to="/"
        variant="ghost"
        sx={{ display: "flex", alignItems: "center" }}
      >
        <Home width="1rem" />
      </Button>
      <Button as={Link} to="/" variant="ghost">
        Kochen
      </Button>
      <Button as={Link} to="/" variant="ghost">
        Grillen
      </Button>
    </Box>
  )
}
