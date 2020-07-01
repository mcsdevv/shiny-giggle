/** @jsx jsx */
import { useState, useEffect } from "react"
import { jsx, Select, Box, Flex, Label } from "theme-ui"

import { useClientUnsafe } from "gatsby-theme-shopify-manager"
import { dotToComma } from "../../utils/dotToComma"
import ProductButton from "./productButton"

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
      <span sx={{ fontSize: 4, fontWeight: 500 }}>{price}</span>
      <span sx={{ fontSize: 2, ml: 1 }}>€</span>
    </Box>
  )
  const price = dotToComma(variants[selected].priceV2.amount)
  return (
    <Box>
      <Box mb="2">
        <Label htmlFor="selectVariant">Variante auswählen:</Label>
        <SelectField />
      </Box>
      <Flex sx={{ justifyContent: "space-between", alignItems: "center" }}>
        <PriceBox />
        <ProductButton
          id={variants[selected].shopifyId}
          qty={1}
          text="In den Warenkorb"
          available={isLoading ? false : data[selected].available}
          loading={isLoading}
        />
      </Flex>
    </Box>
  )
}
