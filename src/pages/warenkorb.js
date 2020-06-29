/** @jsx jsx */
import { jsx, Heading, Button, Box, Text, Grid } from "theme-ui"
import ProductList from "../components/shopify/productList"
import SEO from "../components/seo"

import {
  useCheckoutUrl,
  useCartCount,
  useRemoveItemsFromCart,
  useCartItems,
} from "gatsby-theme-shopify-manager"

export default function Warenkorb() {
  const goCheckout = useCheckoutUrl()
  const cartCount = useCartCount()
  const cartItems = useCartItems()
  const hookRemoveItems = useRemoveItemsFromCart()
  function removeAllItems() {
    const toRemove = cartItems.map(i => i.variant.id)
    hookRemoveItems(toRemove)
  }
  return (
    <Box>
      <SEO title="Warenkorb" />
      <Grid columns={[null, "repeat(2, 1fr)"]}>
        <Box>
          <Heading as="h2" mb="2" sx={{ fontSize: 4 }}>
            Warenkorb
          </Heading>
          <Text>
            {cartCount > 0
              ? `Artikel im Warenkorb: ${cartCount}`
              : "Der Warenkorb ist leer."}
          </Text>
          <ProductList products={cartItems} />
        </Box>
        {cartCount > 0 && (
          <Box>
            <Button as="a" target="__blank" href={goCheckout} variant="success">
              Zur Kasse
            </Button>
            <br />
            <Button mt="2" onClick={removeAllItems} variant="error">
              Löschen
            </Button>
          </Box>
        )}
      </Grid>
    </Box>
  )
}
