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
  const handleChange = (e) => {
    setSelected(e.target.value)
  }
  const handleAdd = () => {
    setAdding(true)
    const isExisting = cartItems.find(
      (item) => item.variant.id === variants[selected].shopifyId
    )
    const isLimit = isExisting?.quantity >= 50
    const addedQuantity = quantity + isExisting?.quantity
    const goingToBeLimit = addedQuantity > 50
    if (isLimit || goingToBeLimit) {
      toast({
        title: 'Maximale Menge erreicht',
        description: 'Wenn du mehr Produkte bestellen möchtest, kontaktiere uns via Mail unter shop@acme.com!',
        status: 'warning',
        duration: 9000,
        isClosable: true
      })
      setAdding(false)
    } else {
      addItem(variants[selected].shopifyId, quantity)
        .then(() => {
          setAdding(false)
        })
        .catch((e) => console.log(e))
    }
  }
  const price = dotToComma(variants[selected].priceV2.amount)
  return (
    <Box maxW='sm' {...rest}>
      <FormControl>
        <FormLabel fontSize='xs'>Variante auswählen:</FormLabel>
        <Select size='sm' value={selected} onChange={handleChange}>
          {variants.map((variant, index) => (
            <option key={variant.id} value={index}>
              {variant.title}
            </option>
          ))}
        </Select>
      </FormControl>
      <Flex justifyContent='space-between' alignItems='center' mt='2'>
        <Box>
          <Text as='span' fontSize='2xl' fontWeight='medium'>
            {price}
          </Text>
          <Text as='span' ml='2'>
            €
          </Text>
        </Box>
        <Button
          variantColor='teal'
          isLoading={adding}
          onClick={handleAdd}
          isDisabled={!available}
        >
          {available ? 'Hinzufügen' : 'Ausverkauft'}
        </Button>
      </Flex>
    </Box>
  )
}
