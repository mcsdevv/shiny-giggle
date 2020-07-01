import React from "react"
import SEO from "../components/seo"
import { graphql } from "gatsby"
import ProductGrid from "../components/shopify/productGrid"
import Layout from "../layouts"

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Home" />
    <ProductGrid products={data.allShopifyProduct.nodes} />
  </Layout>
)

export const query = graphql`
  query indexQuery {
    allShopifyProduct(sort: { fields: updatedAt, order: DESC }) {
      nodes {
        id
        handle
        description
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
