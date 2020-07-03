import React, { useEffect, useState } from "react"
import Img from "gatsby-image"
import SelectProduct from "../components/selectProduct"
import SEO from "../components/seo"

import { graphql } from "gatsby"
import { useClientUnsafe } from "gatsby-theme-shopify-manager"

export default function ({ data }) {
  const {
    title,
    images,
    descriptionHtml,
    shopifyId,
    variants,
  } = data.shopifyProduct

  const shopify = useClientUnsafe()
  const [refreshed, setRefreshed] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    shopify.product.fetch(shopifyId).then(product => {
      const upd = product.variants.map(variant => {
        return {
          available: variant.available,
        }
      })
      setRefreshed(upd)
      setLoading(false)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  console.log(refreshed)
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
          <SelectProduct
            id={shopifyId}
            variants={variants}
            availability={refreshed}
            loading={loading}
          />
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
        availableForSale
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
