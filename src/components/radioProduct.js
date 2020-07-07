import React, { useState } from 'react'
import AddProduct from './addProduct'
import {
  Text,
  RadioGroup,
  Radio,
  FormLabel,
  FormControl
} from '@chakra-ui/core'
import { dotToComma } from '../utils/dotToComma'
export default function RadioProduct ({
  fetchedVariants,
  isFetching,
  isInline,
  isSmall,
  noLabel,
  quantity = 1,
  variants,
  ...rest
}) {
  const [selected, setSelected] = useState(1)
  const handleChange = e => {
    setSelected(parseInt(e.target.value))
  }
  const available = !isFetching
    ? fetchedVariants[selected].available
    : variants[selected].availableForSale
  return (
    <FormControl {...rest}>
      {!noLabel && (
        <FormLabel fontSize='xs' htmlFor='radio-variant' color='gray.600'>
          Welche Menge?
        </FormLabel>
      )}
      <RadioGroup
        color='gray.600'
        isInline={isInline}
        onChange={handleChange}
        size={isSmall && 'sm'}
        spacing={isInline ? 4 : 2}
        value={selected}
        variantColor='teal'
        mb={!isInline && 2}
      >
        {variants.map((v, x) => (
          <Radio key={v.id} value={x}>
            {v.title}
          </Radio>
        ))}
        {selected}
      </RadioGroup>
      <Text fontSize='2xl' fontWeight='medium'>
        {dotToComma(variants[selected].priceV2.amount)}{' '}
        <Text as='span' fontSize='lg'>
          €
        </Text>
      </Text>
      <AddProduct
        mt={2}
        isAvailable={available}
        shopifyId={variants[selected].shopifyId}
        quantity={quantity}
      />
    </FormControl>
  )
}
