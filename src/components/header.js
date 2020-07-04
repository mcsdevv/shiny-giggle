import React, { useState, useEffect } from 'react'
import { Link } from 'gatsby'

import { Logo } from './icons'
import CartButton from './cartButton'
import { Box, Grid, Flex } from '@chakra-ui/core'

export default function Header () {
  const [sticky, setSticky] = useState(false)
  function scrollFunction () {
    if (
      document.body.scrollTop > 50 ||
      document.documentElement.scrollTop > 50
    ) {
      setSticky(true)
    } else setSticky(false)
  }
  useEffect(() => {
    scrollFunction()
    window.onscroll = e => {
      scrollFunction()
    }
  }, [])

  return (
    <Box pos='sticky' top='0' zIndex='100' bg='white' py={4} borderBottom='1px solid transparent' borderBottomColor={sticky && 'gray.100'} transition='border-color 200ms ease'>
      <Grid mx='auto' maxWidth='1024px' templateColumns='repeat(3, 1fr)'>
        <Flex justifyContent='center' alignItems='center' />
        <Flex justifyContent='center' alignItems='center'>
          <Link to='/'>
            <Box w='12'>
              <Logo />
            </Box>
          </Link>
        </Flex>
        <Flex justifyContent='end' alignItems='center'>
          <CartButton />
        </Flex>
      </Grid>
    </Box>
  )
}
