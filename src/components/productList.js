import React, { useState } from 'react'
import Img from 'gatsby-image'

import {
  useRemoveItemFromCart,
  useUpdateItemQuantity
} from 'gatsby-theme-shopify-manager'
import {
  Stack,
  Flex,
  Box,
  Heading,
  Text,
  IconButton,
  Divider
} from '@chakra-ui/core'
import { FiTrash2 } from 'react-icons/fi'

function ListItem ({ data, staticVariants }) {
  // Hooks
  const updateQuantity = useUpdateItemQuantity()
  const removeItem = useRemoveItemFromCart()
  // State
  const [quantity, setQuantity] = useState(data.quantity)
  const [removing, setRemoving] = useState(false)
  // Handlers
  function handleRemove () {
    setRemoving(true)
    removeItem(data.variant.id).then(() => {
      setRemoving(false)
    })
  }
  // Get Static Variant Image
  const getStaticData = (() => {
    const v = staticVariants.find((v) => v.node.shopifyId === data.variant.id)
    return {
      handle: v.node.handle,
      image: v.node.image.localFile.childImageSharp.fixed
    }
  })()
  return (
    <Flex justifyContent='space-between' alignItems='center'>
      <Flex alignItems='center'>
        <Img
          fixed={getStaticData.image}
          alt={data.variant.title}
          className='mr-2'
        />
        <Box>
          <Heading as='h4' fontSize='base'>
            {data.title}
          </Heading>
          <Text fontSize='sm' color='gray.500'>
            <Text as='span'>{data.variant.title}</Text>
            <br />
            <Text as='span'>
              <strong>Anzahl: </strong>
              {data.quantity} Stück
            </Text>
          </Text>
        </Box>
      </Flex>
      <Box>
        <IconButton
          icon={FiTrash2}
          title='Variante löschen'
          variantColor='red'
          size='sm'
          onClick={handleRemove}
          variant='ghost'
          isLoading={removing}
        />
      </Box>
    </Flex>
  )
}

export default function ProductList ({ products, staticVariants }) {
  return (
    <Box>
      <Heading as='h3' fontSize='xl' mb={4}>
        Artikel
      </Heading>
      <Stack>
        {products.map((item, index) => (
          <Box key={item.variant.id}>
            <ListItem data={item} staticVariants={staticVariants} />
            {index < products.length - 1 && <Divider />}
          </Box>
        ))}
      </Stack>
    </Box>
  )
}
