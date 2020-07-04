import React, { useState } from 'react'
import { Select, Box, Button, Flex, Text, FormControl, FormLabel } from '@chakra-ui/core'
import { dotToComma } from '../utils/dotToComma'
import { useAddItemToCart } from 'gatsby-theme-shopify-manager'

export default function SelectProduct ({ variants, fetching, fetchedVariants }) {
  // Add hooks
  const addItem = useAddItemToCart()
  // Initialize state
  const [selected, setSelected] = useState(variants.length - 1)
  const [adding, setAdding] = useState(false)
  const available = fetching ? variants[selected].availableForSale : fetchedVariants[selected].available
  // Handle events
  const handleChange = (e) => {
    setSelected(e.target.value)
  }
  const handleAdd = () => {
    setAdding(true)
    addItem(variants[selected].shopifyId, 1).then(() => {
      setAdding(false)
    }).catch(e => console.log(e))
  }
  const price = dotToComma(variants[selected].priceV2.amount)
  return (
    <Box>
      <FormControl>
        <FormLabel fontSize='xs'>Variante auswählen:</FormLabel>
        <Select size='sm' value={selected} onChange={handleChange}>
          {variants.map((variant, index) => (
            <option key={variant.id} value={index}>{variant.title}</option>
          ))}
        </Select>
      </FormControl>
      <Flex justifyContent='space-between' alignItems='center' mt='2'>
        <Box>
          <Text as='span' fontSize='xl' fontWeight='medium'>{price}</Text>
          <Text as='span' ml='2'>€</Text>
        </Box>
        <Button variantColor='purple' isLoading={adding} onClick={handleAdd} isDisabled={!available}>{available ? 'Hinzufügen' : 'Ausverkauft'}</Button>
      </Flex>
    </Box>
  )
}
