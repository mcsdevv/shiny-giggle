import React, { useState, useEffect } from "react"

import { useClientUnsafe } from "gatsby-theme-shopify-manager"
import { dotToComma } from "../../utils/dotToComma"
import ProductButton from "./buttonAddProduct"

export default function SelectAdd({ id, variants }) {
  const shopify = useClientUnsafe()
  const initialState = []
  // Initialize state
  const [isLoading, setLoading] = useState(true)
  const [selected, setSelected] = useState(variants.length - 1)
  const [data, setData] = useState(initialState)
  // Using the client hook to fetch availability on runtime
  useEffect(() => {
    shopify.product
      .fetch(id)
      .then(product => {
        const data = product.variants.map(i => {
          return {
            available: i.available,
          }
        })
        setData(data)
        setLoading(false)
      })
      .catch(error => {
        console.log(error)
      })
  }, [shopify, id])
  // Handle change of the select input
  function handleChange(e) {
    setSelected(e.target.value)
  }
  const price = dotToComma(variants[selected].priceV2.amount)
  return (
    <div className="max-w-sm">
      <form id={"selectForm-" + id} className="mb-2">
        <label htmlFor={"select-" + id}>
          <span className="text-xs block">Variante auswählen:</span>
          <div className="relative">
            <select
              className="appearance-none p-2 border-black w-full border rounded"
              value={selected}
              onChange={handleChange}
              onBlur={handleChange}
              id={"select-" + id}
              name={"select-" + id}>
              {variants.map((v, i) => (
                <option value={i} key={v.id}>
                  {v.title}
                </option>
              ))}
            </select>
            <div className="absolute right-0 inset-y-0 flex items-center">
              <svg fill="currentColor" viewBox="0 0 20 20" className="w-6">
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"></path>
              </svg>
            </div>
          </div>
        </label>
      </form>
      <div className="flex items-center justify-between">
        <p>
          <span className="text-2xl font-medium">{price} </span>
          <span>€</span>
        </p>
        <ProductButton
          id={variants[selected].shopifyId}
          qty={1}
          text="In den Warenkorb"
          available={isLoading ? false : data[selected].available}
          loading={isLoading}
        />
      </div>
    </div>
  )
}
