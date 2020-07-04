import React, { useState, useEffect } from 'react'
import Button from './button'
import Badge from './badge'

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
    <Link to='/warenkorb'>
      <Button variant={notEmpty ? 'success' : 'loading'}>
        <div className='flex items-center'>
          Warenkorb
          <Badge variant={notEmpty ? 'success' : 'muted'} className='ml-2'>
            {count}
          </Badge>
        </div>
      </Button>
    </Link>
  )
}
