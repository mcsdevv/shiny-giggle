import React from 'react'
import { IconButton, Flex, FormLabel, Box, Input } from '@chakra-ui/core'

export default function SelectQuantity ({ quantity, setQuantity }) {
  const handleInput = (e) => {
    if (e.target.value > 50) {
      setQuantity(50)
    } else if (e.target.value <= 0) {
      setQuantity(1)
    } else {
      setQuantity(parseInt(e.target.value))
    }
  }
  const handleClick = (add) => {
    const higher = quantity + 1
    const lower = quantity - 1
    if (quantity > 0) {
      if (add && higher <= 50) {
        setQuantity(parseInt(higher))
      } else if (!add && lower > 0) {
        setQuantity(parseInt(lower))
      }
    }
  }
  return (
    <Box>
      <FormLabel fontSize='xs' display='block' mb={1}>
        Anzahl wählen:
      </FormLabel>
      <Flex>
        {/* Plus */}
        <IconButton type='dec' icon='minus' onClick={() => handleClick(false)} />
        {/* Show Quantity */}
        <Input type='number' py={1} px={2} mx={2} fontWeight='medium' fontSize='lg' w='10' textAlign='center' value={quantity} onChange={handleInput} />
        {/* Minus */}
        <IconButton icon='add' onClick={() => handleClick(true)} />
      </Flex>
    </Box>
  )
}
