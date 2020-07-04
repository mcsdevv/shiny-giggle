import React, { useState } from 'react'
import ProductButton from './productButton'
import Select from './selectField'

import { dotToComma } from '../utils/dotToComma'

export default function SelectProduct ({ id, variants, availability, loading }) {
  // Initialize state
  const [selected, setSelected] = useState(variants.length - 1)
  function handleChange (e) {
    setSelected(e.target.value)
  }
  const price = dotToComma(variants[selected].priceV2.amount)
  return (
    <div className='max-w-sm'>
      <form id={'selectForm-' + id} className='mb-2'>
        <Select
          label='Variante auswählen:'
          id={'select-' + id}
          options={variants}
          value={selected}
          onChange={handleChange}
          name='select-variant'
        />
      </form>
      <div className='flex items-center justify-between'>
        <p className='font-semibold'>
          <span className='text-2xl mr-2'>{price}</span>
          <span>€</span>
        </p>
        <ProductButton
          id={variants[selected].shopifyId}
          qty={1}
          text='In den Warenkorb'
          available={
            loading
              ? variants[selected].availableForSale
              : availability[selected].available
          }
        />
      </div>
    </div>
  )
}
