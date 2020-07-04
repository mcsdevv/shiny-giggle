import React, { useState } from 'react'
import Button from './button'
import Img from 'gatsby-image'

import {
  useRemoveItemFromCart,
  useUpdateItemQuantity
} from 'gatsby-theme-shopify-manager'

function ListItem ({ data, staticVariants }) {
  // Hooks
  const updateQuantity = useUpdateItemQuantity()
  const removeItem = useRemoveItemFromCart()
  // State
  const [quantity, setQuantity] = useState(data.quantity)
  const [loading, setLoading] = useState(false)
  // Checks
  const noChange = quantity === data.quantity
  // State handling
  function handleChange (e) {
    if (e.keyCode === 13 || e.type === 'click') {
      if (isNaN(quantity)) {
        setQuantity(0)
      } else {
        setLoading(true)
        updateQuantity(data.variant.id, quantity).then(() => setLoading(false))
      }
    } else if (e.type === 'change') {
      if (!data.variant.available) {
        console.log('Not available!')
      } else {
        if (e.target.value >= 0 && e.target.value <= 50) {
          const newValue = parseInt(e.target.value)
          setQuantity(newValue)
        } else if (e.target.value >= 51) {
          setQuantity(50)
        }
      }
    }
  }
  function handleRemove () {
    removeItem(data.variant.id)
  }
  // Get Static Variant Image
  function getVariantFixedImage () {
    const v = staticVariants.find(v => v.node.shopifyId === data.variant.id)
    return v.node.image.localFile.childImageSharp.fixed
  }
  // debug
  // console.log(staticVariants[0].node.shopifyId)
  // console.log(data.variant.id)
  // Render
  return (
    <li className='md:flex justify-between items-center pb-4 mb-4 border-b border-gray-200'>
      <Img
        fixed={getVariantFixedImage()}
        alt={data.variant.title}
        className='mr-2'
      />
      <div>
        <h4 className='font-bold'>{data.title}</h4>
        <div className='text-sm text-gray-800'>
          <p>
            <strong>Variante: </strong>
            {data.variant.title}
          </p>
          <button
            className='text-sm text-red-500 hover:text-red-800 transition-colors duration-200'
            onClick={handleRemove}
          >
            Löschen
          </button>
        </div>
      </div>
      <div>
        <label htmlFor={'change-label-' + data.variant.id}>
          <p className='text-sm'>Anzahl:</p>
          <div className='flex'>
            <input
              className={`border-t border-l border-b rounded-l transition-colors duration-200 outline-none ${
                noChange || loading ? 'border-gray-500' : 'border-green-400'
              } p-2 md:w-16`}
              type='number'
              id={'change-label-' + data.variant.id}
              value={quantity}
              onChange={e => handleChange(e)}
              onKeyDown={e => handleChange(e)}
            />
            <Button
              variant={noChange ? 'loading' : 'success'}
              className='md:w-12 flex-grow border-r border-t border-b border-gray-500'
              loading={loading}
              onClick={e => handleChange(e)}
              title='Anzahl übernehmen'
              inlineForm
              disabled={noChange}
            >
              <svg
                strokeLinecap='round'
                strokeLinejoin='round'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth='3px'
                fill='none'
                className='w-6'
              >
                <path d='M5 13l4 4L19 7' />
              </svg>
            </Button>
          </div>
        </label>
      </div>
    </li>
  )
}

export default function ProductList ({ products, staticVariants }) {
  return (
    <ul>
      {products.map(item => (
        <ListItem data={item} staticVariants={staticVariants} key={item.id} />
      ))}
    </ul>
  )
}
