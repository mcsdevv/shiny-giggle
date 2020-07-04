import React, { useState, useEffect } from 'react'
import { Badge, Text, Box } from '@chakra-ui/core'

import { Link } from 'gatsby'
import { useCartCount } from 'gatsby-theme-shopify-manager'

export default function CartButton () {
  const isSsr = typeof window === 'undefined'
  const getCount = useCartCount()
  const count = isSsr ? 0 : getCount
  const [notEmpty, setNotEmpty] = useState(false)
  useEffect(() => {
    if (count > 0) {
      setNotEmpty(true)
    } else setNotEmpty(false)
  }, [getCount, count])
  return (
    <Box as={Link} to='/warenkorb'><Text as='span' fontSize='sm'>Warenkorb<Badge variantColor={notEmpty ? 'green' : 'gray'} ml='2'>{count}</Badge></Text></Box>
  )
}
