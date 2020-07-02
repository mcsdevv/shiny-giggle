import React from "react"
import SEO from "../components/seo"
import { graphql } from "gatsby"
import ProductGrid from "../components/shop/gridProducts"
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
