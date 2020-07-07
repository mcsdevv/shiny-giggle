import React from 'react'
import {
  IconButton,
  Flex,
  FormLabel,
  Box,
  Input,
  FormControl,
  FormHelperText
} from '@chakra-ui/core'

export default function SelectQuantity ({
  quantity,
  setQuantity,
  hideLabel,
  isSmall
}) {
  const handleInput = e => {
    if (e.target.value > 50) {
      setQuantity(50)
    } else if (e.target.value <= 0) {
      setQuantity(1)
    } else {
      setQuantity(parseInt(e.target.value))
    }
  }
  const handleClick = add => {
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
      <FormControl>
        {!hideLabel && (
          <FormLabel fontSize='xs' display='block'>
            Anzahl wählen:
          </FormLabel>
        )}
        <Flex>
          {/* Plus */}
          <IconButton
            size={isSmall && 'sm'}
            type='dec'
            icon='minus'
            onClick={() => handleClick(false)}
          />
          {/* Show Quantity */}
          <Input
            size={isSmall && 'sm'}
            type='number'
            py={1}
            px={2}
            mx={2}
            fontWeight='medium'
            fontSize='lg'
            w='10'
            textAlign='center'
            value={quantity}
            onChange={handleInput}
            max={50}
            min={1}
          />
          {/* Minus */}
          <IconButton
            size={isSmall && 'sm'}
            icon='add'
            onClick={() => handleClick(true)}
          />
        </Flex>
        <FormHelperText fontSize='xs'>max. 50 Stück</FormHelperText>
      </FormControl>
    </Box>
  )
}
