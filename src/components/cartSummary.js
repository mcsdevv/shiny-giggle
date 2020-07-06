import React, { useState } from 'react'

import { useCart, useRemoveItemsFromCart } from 'gatsby-theme-shopify-manager'
import { dotToComma } from '../utils/dotToComma'
import {
  Box,
  Heading,
  Flex,
  Link,
  Text,
  Stack,
  Divider,
  Button
} from '@chakra-ui/core'

export default function CartSummary () {
  // Hooks
  const cart = useCart()
  const removeItems = useRemoveItemsFromCart()
  const [removing, setRemoving] = useState(false)
  // Calculations
  const subtotal = parseFloat(cart?.subtotalPrice)
  const subtotalString = dotToComma(subtotal.toFixed(2))
  const shipping = subtotal > 50 ? 0 : 3.99
  const shippingString = dotToComma(shipping.toFixed(2))
  const total = subtotal + shipping
  const totalString = dotToComma(total.toFixed(2))
  // Remove action
  function handleRemove () {
    setRemoving(true)
    const all = cart.lineItems.map(i => i.variant.id)
    removeItems(all).catch(error => console.log(error))
  }
  // Render
  return (
    <Box>
      <Box
        p={6}
        borderRadius={4}
        shadow='lg'
        borderColor='gray.50'
        borderWidth={1}
      >
        <Heading as='h3' fontSize='xl' mb={4}>
          Bestellübersicht
        </Heading>
        <Stack>
          <Flex justifyContent='space-between'>
            <Text color='gray.600'>Zwischensumme:</Text>
            <Text>{subtotalString} €</Text>
          </Flex>
          <Flex justifyContent='space-between'>
            <Text color='gray.600'>Versandkosten:</Text>
            <Text>{shipping === 0 ? 'Kostenfrei' : shippingString + ' €'}</Text>
          </Flex>
          <Link color='teal.500' fontSize='xs'>
            Hinweise zu den Versandkosten
          </Link>
          <Divider />
          <Flex justifyContent='space-between'>
            <Text fontWeight='bold'>Gesamt:</Text>
            <Text>{totalString} €</Text>
          </Flex>
          <Text fontSize='xs'>Alle Preise inklusive MwSt.</Text>
          <Text fontSize='xs' color='gray.500'>
            Versandkosten und Steuern sind geschätzt und werden während des
            Bestellvorgangs aktualisiert, basierend auf deinen Rechnungs- und
            Versandinformationen.
          </Text>
          <Flex justifyContent='space-between' mt={2} alignItems='center'>
            <Button
              variantColor='red'
              variant='link'
              size='xs'
              isLoading={removing}
              onClick={handleRemove}
            >
              Warenkorb löschen
            </Button>
            <Link href={cart.webUrl} target='_blank'>
              <Button size='lg' variantColor='green' rightIcon='arrow-forward'>
                Zur Kasse
              </Button>
            </Link>
          </Flex>
        </Stack>
      </Box>
    </Box>
  )
}
