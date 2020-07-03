import React from "react"
import Img from "gatsby-image"
import SelectProduct from "../components/shop/SelectProduct"
import SEO from "../components/Seo"

import { graphql } from "gatsby"

export default function ({ data }) {
  const {
    title,
    images,
    descriptionHtml,
    shopifyId,
    variants,
  } = data.shopifyProduct
  return (
    <div className="grid md:grid-cols-2">
      <SEO title={title} />
      <div>
        <Img fluid={images[0].localFile.childImageSharp.fluid} />
      </div>
      <div>
        <h3 className="text-3xl font-bold mb-4">{title}</h3>
        <div
          className="mb-4"
          dangerouslySetInnerHTML={{ __html: descriptionHtml }}
        />
        <div mt="4" sx={{ maxWidth: 300 }}>
          <SelectProduct id={shopifyId} variants={variants} />
        </div>
      </div>
    </div>
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
