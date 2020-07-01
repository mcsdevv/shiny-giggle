/** @jsx jsx */
import { jsx, Button, Flex, Badge } from "theme-ui"
import { Link } from "gatsby"
import { useCartCount } from "gatsby-theme-shopify-manager"
import { useState, useEffect } from "react"

export default function CartButton() {
  const cartCount = useCartCount()
  const [count, setCount] = useState(cartCount)
  useEffect(() => {
    setCount(cartCount)
  }, [cartCount])
  return (
    <Button as={Link} to="/warenkorb" variant={count > 0 ? "success" : "muted"}>
      <Flex sx={{ alignItems: "center" }}>
        Warenkorb
        <Badge ml="2" variant={count > 0 ? "success" : "primary"}>
          {count}
        </Badge>
      </Flex>
    </Button>
  )
}
