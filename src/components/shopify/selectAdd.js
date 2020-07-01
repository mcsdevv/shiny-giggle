/** @jsx jsx */
import { useState, useEffect } from "react"
import { jsx, Select, Box, Flex } from "theme-ui"

import { useClientUnsafe } from "gatsby-theme-shopify-manager"
import ProductButton from "./productButton"

export default function SelectAdd({ variants, id }) {
  const shopify = useClientUnsafe()
  const initialData = []
  // Initialize state
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(variants.length - 1)
  const [data, setData] = useState(initialData)
  // Using the client hook to fetch availability on runtime
  useEffect(() => {
    shopify.product
      .fetch(id)
      .then(product => {
        const update = product.variants.map(i => {
          return {
            available: i.available,
          }
        })
        setData(update)
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
  const SelectField = () => (
    <Select value={selected} onChange={handleChange} name="selectVariant">
      {variants.map((v, i) => (
        <option value={i} key={v.id}>
          {v.title}
        </option>
      ))}
    </Select>
  )
  const PriceBox = () => (
    <Box>
      <span sx={{ fontSize: 4, fontWeight: 500 }}>
        {variants[selected].priceV2.amount}
      </span>
      <span sx={{ fontSize: 2, ml: 1 }}>€</span>
    </Box>
  )
  return (
    <Box>
      <Box mb="2">
        <SelectField />
      </Box>
      <Flex sx={{ justifyContent: "space-between", alignItems: "center" }}>
        <PriceBox />
        <ProductButton
          id={variants[selected].shopifyId}
          qty={1}
          text="In den Warenkorb"
          loading={loading}
          available={loading ? false : data[selected].available}
        />
      </Flex>
    </Box>
  )
}
