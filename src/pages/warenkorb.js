/** @jsx jsx */
import { jsx, Heading, Box, Text, Grid, Card, Flex } from "theme-ui"
import { useState } from "react"
import { dotToComma } from "../utils/dotToComma"

import ProductList from "../components/shopify/productList"
import SEO from "../components/seo"
import Button from "../components/button"
import Layout from "../layouts"

import {
  useCheckoutUrl,
  useCartCount,
  useRemoveItemsFromCart,
  useCart,
} from "gatsby-theme-shopify-manager"

export default function Warenkorb() {
  const goCheckout = useCheckoutUrl()
  const cartCount = useCartCount()
  const cart = useCart()
  const subTotal = dotToComma(cart.lineItemsSubtotalPrice.amount)

  const [remove, setRemove] = useState(false)
  const hookRemoveItems = useRemoveItemsFromCart()

  function removeItems(items) {
    setRemove(true)
    hookRemoveItems(items)
      .then(() => {
        setRemove(false)
      })
      .catch(error => console.log(error))
  }

  function removeAllItems() {
    const all = cart.lineItems.map(i => i.variant.id)
    removeItems(all)
  }
  return (
    <Layout>
      <Box>
        <SEO title="Warenkorb" />
        <Grid columns={[null, "repeat(2, 1fr)"]} gap="4">
          <Box>
            <Heading as="h2" mb="2" sx={{ fontSize: 4 }}>
              Warenkorb
            </Heading>
            <Text mb="4">
              {cartCount > 0
                ? `Artikel im Warenkorb: ${cartCount}`
                : "Der Warenkorb ist leer."}
            </Text>
            <ProductList products={cart.lineItems} />
          </Box>
          {cartCount > 0 && (
            <Box>
              <Card>
                <Heading as="h3" sx={{ fontSize: 3 }}>
                  Bestellzusammenfassung
                </Heading>
                <Text>Zwischensumme: {subTotal} €</Text>
                <Flex
                  sx={{
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}>
                  <Button
                    mt="2"
                    variant="error"
                    loading={remove}
                    onClick={removeAllItems}>
                    Warenkorb löschen
                  </Button>
                  <Button
                    as="a"
                    target="__blank"
                    href={goCheckout}
                    variant="success">
                    Zur Kasse
                  </Button>
                </Flex>
              </Card>
            </Box>
          )}
        </Grid>
      </Box>
    </Layout>
  )
}
