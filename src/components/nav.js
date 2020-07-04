import React from 'react'
import { Home } from './icons'
import { Link } from 'gatsby'
import { Button } from '@chakra-ui/core'
export default function Nav () {
  return (
    <div className='items-center hidden md:flex'>
      <Button variant='ghost'>
        <Link to='/'>
          <Home className='py-1 w-4' />
        </Link>
      </Button>
      <Button variant='ghost'>
        <Link to='/'>Grillen</Link>
      </Button>
      <Button variant='ghost'>
        <Link to='/'>Kochen</Link>
      </Button>
    </div>
  )
}
