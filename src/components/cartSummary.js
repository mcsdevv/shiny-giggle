import React, { useState } from 'react'
import Button from './button'

import { useCart, useRemoveItemsFromCart } from 'gatsby-theme-shopify-manager'
import { dotToComma } from '../utils/dotToComma'

export default function CartSummary () {
  // Hooks
  const cart = useCart()
  const removeItems = useRemoveItemsFromCart()
  const [removing, setRemoving] = useState(false)
  // Calculations
  const subtotal = parseFloat(cart?.subtotalPrice)
  const subtotalString = dotToComma(subtotal.toFixed(2))
  const shipping = subtotal > 50 ? 0 : 3.99
  const shippingString = dotToComma(shipping.toFixed(2))
  const total = subtotal + shipping
  const totalString = dotToComma(total.toFixed(2))
  // Remove action
  function handleRemove () {
    setRemoving(true)
    const all = cart.lineItems.map(i => i.variant.id)
    removeItems(all).catch(error => console.log(error))
  }
  // Render
  return (
    <div>
      <div className='rounded shadow-md p-4'>
        <h3 className='text-2xl font-bold mb-4'>Bestellzusammenfassung</h3>
        <p>
          <strong>Zwischensumme: </strong>
          {subtotalString} €
        </p>
        <hr className='my-2' />
        <p>
          <strong>Versandkosten: </strong>
          {shipping === 0 ? 'Kostenfrei' : shippingString + ' €'}
        </p>
        <hr className='my-2' />
        <p>
          <strong>Gesamt: </strong>
          {totalString} €
        </p>
        <hr className='my-2 border-black' />
        <p className='text-gray-600 mb-2 text-sm'>
          <strong>Hinweis:</strong> Versandkosten und Steuern sind geschätzt und
          werden während des Bestellvorgangs aktualisiert, basierend auf deinen
          Rechnungs- und Versandinformationen.
        </p>
        <div className='flex items-center justify-between'>
          <Button
            mt='2'
            variant='error'
            loading={removing}
            onClick={handleRemove}
          >
            <svg
              fill='none'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              className='w-4 mr-2 inline-block'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16' />
            </svg>
            Warenkorb löschen
          </Button>
          <a target='__blank' href={cart.webUrl}>
            <Button variant='success'>
              Zur Kasse
              <svg
                fill='currentColor'
                viewBox='0 0 20 20'
                className='w-4 ml-2 inline-block'
              >
                <path
                  fillRule='evenodd'
                  d='M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z'
                  clipRule='evenodd'
                />
              </svg>
            </Button>
          </a>
        </div>
      </div>
    </div>
  )
}
