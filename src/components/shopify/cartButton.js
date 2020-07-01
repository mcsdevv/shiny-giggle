/** @jsx jsx */
import { jsx, Button, Flex, Badge } from "theme-ui"
import { Link } from "gatsby"
import { useCartCount } from "gatsby-theme-shopify-manager"

export default function CartButton() {
  const cartCount = useCartCount()
  const isEmpty = cartCount === 0
  return (
    <Button as={Link} to="/warenkorb" variant={isEmpty ? "muted" : "success"}>
      <Flex sx={{ alignItems: "center" }}>
        Warenkorb
        <Badge ml="2" variant={isEmpty ? "primary" : "success"}>
          {cartCount}
        </Badge>
      </Flex>
    </Button>
  )
}
