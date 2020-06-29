/** @jsx jsx */
import { jsx, Select, Box, Text, Flex } from "theme-ui"
import { useState } from "react"
import ButtonAdd from "./buttonAdd"

export default function SelectAdd({ variants }) {
  const [selected, setSelected] = useState(0)
  function handleChange(e) {
    setSelected(e.target.value)
  }
  function getPrecision(i) {
    const j = parseFloat(i)
    return j.toFixed(2)
  }
  const sel = variants[selected]
  return (
    <Box>
      <Box mb="2">
        <Select value={selected} onChange={handleChange}>
          {variants.map((v, i) => (
            <option value={i} key={v.id}>
              {v.title}
            </option>
          ))}
        </Select>
      </Box>
      <Flex sx={{ justifyContent: "space-between", alignItems: "center" }}>
        <Box>
          <Text sx={{ fontSize: 3 }}>{sel.priceV2.amount} €</Text>
          <Text sx={{ fontSize: 0, color: "gray.500", lineHeight: "1" }}>
            {getPrecision((sel.priceV2.amount / sel.weight) * 100)} € / 100 g
          </Text>
        </Box>
        <ButtonAdd item={sel} qty={1} text="Hinzufügen" />
      </Flex>
    </Box>
  )
}
