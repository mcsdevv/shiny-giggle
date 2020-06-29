/** @jsx jsx */
import { jsx, Heading, Button, Box, Text } from "theme-ui"

import Layout from "../components/layout"
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
    <Layout>
      <SEO title="Warenkorb" />
      <Heading>Warenkorb</Heading>
      <Text>
        {cartCount > 0
          ? `Artikel im Warenkorb: ${cartCount}`
          : "Kein aktiver Warenkorb."}
      </Text>
      <ProductList products={cartItems} />
      {cartCount > 0 && (
        <Box mt="4">
          <Button as="a" target="__blank" href={goCheckout} variant="success">
            Zur Kasse
          </Button>
          <br />
          <Button mt="2" onClick={removeAllItems} variant="error">
            Löschen
          </Button>
        </Box>
      )}
    </Layout>
  )
}
