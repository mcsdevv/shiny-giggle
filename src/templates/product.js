/** @jsx jsx */
import { jsx, Heading, Grid, Box } from "theme-ui"
import { graphql } from "gatsby"

import Layout from "../layouts"
import Img from "gatsby-image"
import SelectAdd from "../components/shopify/selectAdd"

export default function ({ data }) {
  const {
    title,
    images,
    descriptionHtml,
    shopifyId,
    variants,
  } = data.shopifyProduct
  return (
    <Layout>
      <Grid columns={[null, "1fr 1fr"]}>
        <Box>
          <Img fluid={images[0].localFile.childImageSharp.fluid} />
        </Box>
        <Box>
          <Heading as="h2" mb="3" sx={{ fontSize: 4 }}>
            {title}
          </Heading>
          <div
            dangerouslySetInnerHTML={{ __html: descriptionHtml }}
            sx={{
              p: {
                mb: 2,
              },
            }}></div>
          <Box mt="4" sx={{ maxWidth: 300 }}>
            <SelectAdd id={shopifyId} variants={variants} />
          </Box>
        </Box>
      </Grid>
    </Layout>
  )
}

export const query = graphql`
  query Product($id: String) {
    shopifyProduct(id: { eq: $id }) {
      id
      shopifyId
      handle
      title
      descriptionHtml
      variants {
        id
        shopifyId
        title
        priceV2 {
          amount
        }
      }
      images {
        localFile {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }
      }
    }
  }
`
