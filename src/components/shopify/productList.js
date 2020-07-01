/** @jsx jsx */
import { jsx, Heading, Text, Image, Flex, Box, Label, Button } from "theme-ui"
import { useRemoveItemFromCart } from "gatsby-theme-shopify-manager"

export default function ProductList({ products, onClick }) {
  const hookRemoveItem = useRemoveItemFromCart()
  return (
    <Box>
      {products.map(item => {
        return (
          <Flex
            key={item.id}
            mb="3"
            pb="3"
            sx={{
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "1px solid",
              borderColor: "gray.300",
              "&:last-of-type": {
                borderBottom: "none",
              },
            }}>
            <Box>
              <Heading as="h4" mb="1">
                {item.title}
              </Heading>
              <Text
                sx={{ fontSize: 0, color: "red.400", cursor: "pointer" }}
                onClick={() => hookRemoveItem(item.variant.id)}>
                Löschen
              </Text>
              <Text sx={{ fontSize: 0 }}>
                <strong>Variante: </strong>
                {item.variant.title}
                <br />
                <strong>Anzahl: </strong>
                {item.quantity}
              </Text>
            </Box>
            <Image src={item.variant.image.src} width="100" height="100" />
          </Flex>
        )
      })}
    </Box>
  )
}
