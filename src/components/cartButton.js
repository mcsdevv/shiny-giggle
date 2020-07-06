import React, { useState, useEffect } from 'react'
import { Button, Box } from '@chakra-ui/core'
import { FiShoppingBag } from 'react-icons/fi'
import { Link } from 'gatsby'
import { useCartCount } from 'gatsby-theme-shopify-manager'
import { useLocation } from '@reach/router'

export default function CartButton () {
  const isSsr = typeof window === 'undefined'
  const location = useLocation()
  const getCount = useCartCount()
  const count = isSsr ? 0 : getCount
  const [notEmpty, setNotEmpty] = useState(false)
  useEffect(() => {
    if (count > 0) {
      setNotEmpty(true)
    } else setNotEmpty(false)
  }, [getCount, count])
  const buttonColor =
    location.pathname === '/warenkorb' ? 'gray' : notEmpty ? 'green' : 'gray'

  return (
    <Box position='relative'>
      {/* <IconButton
        as={Link}
        title='Warenkorb'
        to='/warenkorb'
        display={['flex', 'none']}
        icon={FiShoppingBag}
        variantColor={buttonColor}
      /> */}
      <Button
        as={Link}
        to='/warenkorb'
        display='flex'
        leftIcon={FiShoppingBag}
        variant='outline'
        variantColor={buttonColor}
      >
        Warenkorb
      </Button>
      <Box
        position='absolute'
        top='0' right='0'
        mt={-2} mr={-2}
        fontSize='xs'
        rounded='full'
        bg='red.500'
        color='white'
        minW={5} h={5}
        display='flex'
        alignItems='center'
        justifyContent='center' px={1}
        opacity={notEmpty ? 1 : 0}
        transition='opacity 100ms ease'
      >
        <span>{count}</span>
      </Box>
    </Box>
  )
}
