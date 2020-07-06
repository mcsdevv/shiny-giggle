import React from 'react'
import Seo from '../components/seo'
import ProductList from '../components/productList'
import CartSummary from '../components/cartSummary'

import { useCartCount, useCartItems } from 'gatsby-theme-shopify-manager'
import { graphql, Link } from 'gatsby'
import {
  Heading,
  Grid,
  Box,
  Text,
  Button,
  Image,
  Link as ChakraLink
} from '@chakra-ui/core'

import emptyCart from '../images/shopping_cart.svg'

export default function Warenkorb ({ data }) {
  // Hooks
  const cartItems = useCartItems()
  const cartCount = useCartCount()
  const empty = cartCount === 0
  // Static Variant data for Images
  const {
    allShopifyProductVariant: { edges: variants }
  } = data
  const CartOverview = () => (
    <Grid templateColumns={[null, null, 'repeat(2, 1fr)']} gap={10} my={8}>
      <ProductList products={cartItems} staticVariants={variants} />
      <CartSummary />
    </Grid>
  )
  const CartEmpty = () => (
    <Box textAlign='center'>
      <Text mb={4}>
        Dein Warenkorb ist leer. Hast du nicht gefunden wonach du gesucht hast?
        <br />
        <ChakraLink color='teal.600'>Schreib' uns was dir fehlt!</ChakraLink>
      </Text>
      <Button as={Link} to='/' rightIcon='arrow-forward' variantColor='teal'>
        Produkte finden
      </Button>
      <Image width={56} src={emptyCart} mx='auto' mt={12} />
    </Box>
  )
  return (
    <>
      <Seo title='Warenkorb' />
      <Heading
        fontWeight='black'
        textAlign={empty ? 'center' : 'left'}
        mb={[4, 8]}
      >
        Warenkorb
      </Heading>
      {!empty ? <CartOverview /> : <CartEmpty />}
    </>
  )
}

export const query = graphql`
  query cartQuery {
    allShopifyProductVariant {
      edges {
        node {
          shopifyId
          image {
            localFile {
              childImageSharp {
                fixed(width: 100) {
                  ...GatsbyImageSharpFixed_withWebp_tracedSVG
                }
              }
              absolutePath
            }
          }
        }
      }
    }
  }
`
