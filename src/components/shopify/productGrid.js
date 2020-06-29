/** @jsx jsx */
import { jsx, Grid, Heading, Box } from "theme-ui"

import Img from "gatsby-image"
import SelectAdd from "./selectAdd"
import { Link } from "gatsby"

export default function ProductGrid({ products }) {
  return (
    <Grid columns={[null, "repeat(2, 1fr)", "repeat(3, 1fr)"]} gap="5">
      {products.map(item => (
        <div key={item.id}>
          <Img
            fluid={item.images[0].localFile.childImageSharp.fluid}
            alt={item.title}
          />
          <Heading sx={{ fontSize: 4, my: 2 }}>{item.title}</Heading>
          <SelectAdd variants={item.variants} />
          <Box
            as={Link}
            to="#"
            sx={{ textAlign: "right", fontSize: 1, display: "block" }}
          >
            Mehr Infos →
          </Box>
        </div>
      ))}
    </Grid>
  )
}
