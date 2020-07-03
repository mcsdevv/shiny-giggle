import React, { useState, useEffect } from "react"
import ProductButton from "./productButton"
import Select from "./selectField"

import { useClientUnsafe } from "gatsby-theme-shopify-manager"
import { dotToComma } from "../utils/dotToComma"

export default function SelectProduct({ id, variants }) {
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
        <Select
          label="Variante auswählen:"
          id={"select-" + id}
          options={variants}
          value={selected}
          onChange={handleChange}
          name="select-variant"
        />
      </form>
      <div className="flex items-center justify-between">
        <p className="font-semibold">
          <span className="text-2xl mr-2">{price}</span>
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
