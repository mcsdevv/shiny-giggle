/** @jsx jsx */
import { jsx, Heading, Box, Text } from "theme-ui"

export default function ProductList({ products }) {
  return (
    <Box>
      {products.map(item => (
        <Box>
          <Heading>{item.title}</Heading>
          <Text>{item.variant.title}</Text>
          <Text>{item.quantity}</Text>
        </Box>
      ))}
    </Box>
  )
}
