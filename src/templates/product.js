import React, { useEffect, useState } from 'react'
import Img from 'gatsby-image'
import SelectProduct from '../components/selectProduct'
import SelectQuantity from '../components/selectQuantity'
import Seo from '../components/seo'

import { graphql } from 'gatsby'
import { useClientUnsafe } from 'gatsby-theme-shopify-manager'
import { Grid, Box, Heading } from '@chakra-ui/core'
import markdown from './markdown.module.css'
export default function ({ data }) {
  // Destructuring
  const {
    title,
    images,
    descriptionHtml,
    shopifyId,
    variants
  } = data.shopifyProduct
  // Hooks and State
  const shopify = useClientUnsafe()
  const [fetching, setFetching] = useState(true)
  const [fetchedData, setFetched] = useState([])
  const [quantity, setQuantity] = useState(1)
  useEffect(() => {
    shopify.product.fetch(shopifyId).then((product) => {
      const d = product.variants.map((variant) => {
        return {
          available: variant.available
        }
      })
      setFetched(d)
      setFetching(false)
    })
  }, [])
  return (
    <>
      <Seo title={title} />
      <Grid templateColumns={[null, '1fr 2fr']}>
        <Box>
          <Img fluid={images[0].localFile.childImageSharp.fluid} />
        </Box>
        <Box>
          <Heading fontWeight='800' mb='8'>
            {title}
          </Heading>
          <Box
            className={markdown.markdown}
            dangerouslySetInnerHTML={{ __html: descriptionHtml }}
          />
          <SelectQuantity quantity={quantity} setQuantity={setQuantity} />
          <SelectProduct
            variants={variants}
            fetching={fetching}
            fetchedVariants={fetchedData}
            mt={4}
            maxW='xs'
            quantity={quantity}
          />
        </Box>
      </Grid>
    </>
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
            fluid(maxWidth: 600) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }
      }
    }
  }
`
