/** @jsx jsx */
import { jsx, Heading, Text, Card, Image, Flex, Box } from "theme-ui"

export default function ProductList({ products }) {
  return (
    <Card>
      {products.map(item => {
        return (
          <Flex key={item.id} sx={{ alignItems: "center" }}>
            <Image src={item.variant.image.src} width="100" height="100" />
            <Box>
              <Heading as="h4" mb="2">
                {item.title}
              </Heading>
              <Text>
                Variante: {item.variant.title}
                <br />
                Anzahl: {item.quantity}
              </Text>
            </Box>
          </Flex>
        )
      })}
    </Card>
  )
}
