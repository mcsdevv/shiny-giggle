/** @jsx jsx */
import { jsx, Grid, Heading, Text } from "theme-ui"

import Img from "gatsby-image"
import SelectAdd from "./selectAdd"

export default function ProductGrid({ products }) {
  return (
    <Grid columns={[null, "repeat(2, 1fr)", "repeat(3, 1fr)"]} gap="4">
      {products.map(item => {
        const desc =
          item.description.substr(0, item.description.lastIndexOf(" ", 100)) +
          "..."
        return (
          <div key={item.id}>
            <Img
              fluid={item.images[0].localFile.childImageSharp.fluid}
              alt={item.title}
            />
            <Heading sx={{ fontSize: 3, my: 3 }}>{item.title}</Heading>
            <Text my="3">{desc}</Text>
            <SelectAdd variants={item.variants} id={item.shopifyId} />
          </div>
        )
      })}
    </Grid>
  )
}
