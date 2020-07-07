import React, { useState } from 'react'
import {
  Select,
  Box,
  Button,
  Flex,
  Text,
  FormControl,
  FormLabel,
  useToast
} from '@chakra-ui/core'
import { dotToComma } from '../utils/dotToComma'
import { useAddItemToCart, useCartItems } from 'gatsby-theme-shopify-manager'

export default function SelectProduct ({
  variants,
  quantity = 1,
  fetching,
  fetchedVariants,
  isSmall,
  ...rest
}) {
  // Add hooks
  const addItem = useAddItemToCart()
  const cartItems = useCartItems()
  const toast = useToast()
  // Initialize state
  const [selected, setSelected] = useState(variants.length - 1)
  const [adding, setAdding] = useState(false)
  const available = fetching
    ? variants[selected].availableForSale
    : fetchedVariants[selected].available
  // Handle events
  const handleChange = e => {
    setSelected(e.target.value)
  }
  const handleAdd = () => {
    setAdding(true)
    const isExisting = cartItems.find(
      item => item.variant.id === variants[selected].shopifyId
    )
    const isLimit = isExisting?.quantity >= 50
    const addedQuantity = quantity + isExisting?.quantity
    const goingToBeLimit = addedQuantity > 50
    if (isLimit || goingToBeLimit) {
      toast({
        title: 'Maximale Bestellmenge erreicht',
        description:
          'Die Bestellung von mehr als 50 Stück pro Artikel ist über unseren Onlineshop nicht möglich.',
        status: 'warning',
        duration: 5000,
        isClosable: true
      })
      setAdding(false)
    } else {
      addItem(variants[selected].shopifyId, quantity)
        .then(() => {
          setAdding(false)
        })
        .catch(e => console.log(e))
    }
  }
  const price = dotToComma(variants[selected].priceV2.amount)
  return (
    <Box maxW='sm' {...rest}>
      <FormControl>
        <FormLabel fontSize='xs' htmlFor='select-variant'>
          Variante auswählen:
        </FormLabel>
        <Select
          name='select-variant'
          size={isSmall ? 'sm' : 'md'}
          value={selected}
          onChange={handleChange}
        >
          {variants.map((variant, index) => (
            <option key={variant.id} value={index}>
              {variant.title}
            </option>
          ))}
        </Select>
      </FormControl>
      <Flex justifyContent='space-between' alignItems='center' mt='2'>
        <Box>
          <Text
            as='span'
            fontSize={['xl', null, null, '2xl']}
            fontWeight='medium'
          >
            {price}
          </Text>
          <Text as='span' ml='1'>
            €
          </Text>
        </Box>
        <Button
          variantColor='teal'
          variant='outline'
          size={isSmall ? 'sm' : 'md'}
          isLoading={adding}
          onClick={handleAdd}
          isDisabled={!available}
        >
          {available ? 'In den Warenkorb' : 'Ausverkauft'}
        </Button>
      </Flex>
    </Box>
  )
}
