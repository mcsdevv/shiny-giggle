import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql } from "gatsby"
import ProductGrid from "../components/shopify/productGrid"

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Home" />
    <ProductGrid products={data.allShopifyProduct.nodes} />
  </Layout>
)

export const query = graphql`
  query indexQuery {
    allShopifyProduct {
      nodes {
        id
        handle
        title
        shopifyId
        images {
          localFile {
            childImageSharp {
              fluid(maxWidth: 300) {
                ...GatsbyImageSharpFluid_withWebp_tracedSVG
              }
            }
          }
        }
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
        priceRange {
          maxVariantPrice {
            amount
          }
          minVariantPrice {
            amount
          }
        }
      }
    }
  }
`

export default IndexPage
