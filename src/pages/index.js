import React from "react"
import SEO from "../components/seo"
import { graphql } from "gatsby"
import ProductGrid from "../components/productGrid"

const IndexPage = ({ data }) => (
  <>
    <SEO title="Home" />
    <ProductGrid products={data.allShopifyProduct.nodes} />
  </>
)

export const query = graphql`
  query indexQuery {
    allShopifyProduct {
      nodes {
        id
        shopifyId
        handle
        title
        description
        variants {
          availableForSale
          id
          shopifyId
          title
          weight
          priceV2 {
            amount
          }
        }
        images {
          localFile {
            childImageSharp {
              fluid(maxWidth: 300) {
                ...GatsbyImageSharpFluid_withWebp_tracedSVG
              }
            }
          }
        }
      }
    }
  }
`

export default IndexPage
