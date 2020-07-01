/** @jsx jsx */
import { jsx, Heading, Box, Text, Grid } from "theme-ui"
import { useState } from "react"
import ProductList from "../components/shopify/productList"
import SEO from "../components/seo"
import Button from "../components/button"
import Layout from "../layouts"

import {
  useCheckoutUrl,
  useCartCount,
  useRemoveItemsFromCart,
  useCartItems,
} from "gatsby-theme-shopify-manager"

export default function Warenkorb() {
  const [remove, setRemove] = useState(false)
  const goCheckout = useCheckoutUrl()
  const cartCount = useCartCount()
  const cartItems = useCartItems()
  const hookRemoveItems = useRemoveItemsFromCart()
  function removeAllItems() {
    setRemove(true)
    const toRemove = cartItems.map(i => i.variant.id)
    hookRemoveItems(toRemove)
      .then(() => {
        setRemove(false)
      })
      .catch(error => console.log(error))
  }
  return (
    <Layout>
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
              <Button
                as="a"
                target="__blank"
                href={goCheckout}
                variant="success"
                sx={{
                  fontSize: 4,
                  fontWeight: "bold",
                }}>
                Zur Kasse
              </Button>
              <br />
              <Button
                mt="2"
                onClick={removeAllItems}
                variant="error"
                loading={remove}>
                Warenkorb löschen
              </Button>
            </Box>
          )}
        </Grid>
      </Box>
    </Layout>
  )
}
