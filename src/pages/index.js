import React from 'react'
import { graphql } from 'gatsby'
import Seo from '../components/seo'
import ProductGrid from '../components/productGrid'

const IndexPage = ({ data }) => (
  <>
    <Seo title='Home' />
    <ProductGrid products={data.allShopifyProduct.nodes} />
  </>
)

export const query = graphql`
  query indexQuery {
    allShopifyProduct(sort: { fields: createdAt, order: DESC }) {
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
              fluid(maxWidth: 600) {
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
