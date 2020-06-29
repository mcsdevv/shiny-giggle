/** @jsx jsx */
import { jsx, Heading, Box, Text, Card } from "theme-ui"

export default function ProductList({ products }) {
  return (
    <Card>
      {products.map(item => (
        <Box key={item.id}>
          <Heading>{item.title}</Heading>
          <Text>{item.variant.title}</Text>
          <Text>{item.quantity}</Text>
        </Box>
      ))}
    </Card>
  )
}
