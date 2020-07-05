import React, { useState, useEffect } from 'react'
import { Link } from 'gatsby'

import { Logo } from './icons'
import CartButton from './cartButton'
import { Box, Grid, Flex, Button } from '@chakra-ui/core'
import { useLocation } from '@reach/router'
export default function Header () {
  const [sticky, setSticky] = useState(false)
  const location = useLocation()
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
    window.onscroll = (e) => {
      scrollFunction()
    }
  }, [])

  const menuItems = [
    {
      name: 'Übersicht',
      path: '/'
    },
    {
      name: 'Grillen',
      path: '#'
    },
    {
      name: 'Kochen',
      path: '#'
    },
    {
      name: 'Kaffee',
      path: '#'
    }
  ]

  const Nav = () =>
    menuItems.map((item) => (
      <Button
        as={Link}
        to={item.path}
        variant='link'
        fontWeight='medium'
        key={item.name}
        mr={6}
        size='sm'
        isActive={location.pathname === item.path}
        _last={{ mr: 0 }}
      >
        {item.name}
      </Button>
    ))

  return (
    <Box
      as='header'
      pos='sticky'
      top='0'
      zIndex='100'
      bg='white'
      py={4}
      mb={8}
      borderBottom='1px solid transparent'
      borderBottomColor={sticky && 'gray.100'}
      transition='border-color 200ms ease'
    >
      <Box mx='auto' maxWidth='1024px' px={4}>
        <Grid templateColumns={['repeat(2, 1fr)', null, 'repeat(3, 1fr)']}>
          <Flex
            as='nav'
            alignItems='center'
            display={['none', null, 'flex']}
          >
            <Nav />
          </Flex>
          <Flex justifyContent={[null, null, 'center']} alignItems='center'>
            <Box as={Link} to='/'>
              <Logo width={80} />
            </Box>
          </Flex>
          <Flex justifyContent='end' alignItems='center'>
            <CartButton />
          </Flex>
        </Grid>
        <Box position='relative'>
          <Flex
            as='nav'
            flexWrap='nowrap'
            overflowX='scroll'
            pt={4}
            display={['flex', null, 'none']}
          >
            <Nav />
          </Flex>
          <Box
            pos='absolute'
            top={0}
            right={0}
            bottom={0}
            background='linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)'
            w={4}
          />
        </Box>
      </Box>
    </Box>
  )
}
