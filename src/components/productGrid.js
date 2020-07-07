import React, { useState, useEffect } from 'react'
import Img from 'gatsby-image'
import SelectProduct from './selectProduct'
import { Grid, Heading, Text, Box } from '@chakra-ui/core'

import { Link } from 'gatsby'
import { useClientUnsafe } from 'gatsby-theme-shopify-manager'

export default function ProductGrid ({ products }) {
  const shopify = useClientUnsafe()
  const [data, setData] = useState([])
  const [fetching, setFetching] = useState(true)
  const productIds = products.map(p => p.shopifyId)
  // Update availability on runtime
  useEffect(() => {
    shopify.product
      .fetchMultiple(productIds)
      .then(products => {
        // Returning an array with the same index as the static product array, inside of this array another array with the variants and their availability
        const data = products.map(product => {
          return product.variants.map(variant => {
            return {
              available: variant.available
            }
          })
        })
        setData(data)
        setFetching(false)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])
  const shorten = str => {
    return str.substr(0, str.lastIndexOf(' ', 75)) + '...'
  }
  return (
    <Grid
      templateColumns={['repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)']}
      gap='8'
    >
      {products.map((item, index) => {
        const desc = shorten(item.description)
        return (
          <Box key={item.id}>
            <Box as={Link} to={item.handle} mb='2' display='block'>
              <Img fluid={item.images[0].localFile.childImageSharp.fluid} />
              <Heading size='sm' mb='2' fontWeight='semibold'>
                {item.title}
              </Heading>
              <Text fontSize='xs'>{desc}</Text>
            </Box>
            <SelectProduct
              variants={item.variants}
              fetching={fetching}
              fetchedVariants={data[index]}
              isSmall
            />
          </Box>
        )
      })}
    </Grid>
  )
}
