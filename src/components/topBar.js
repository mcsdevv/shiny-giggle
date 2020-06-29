/** @jsx jsx */
import { jsx, Flex, Box } from "theme-ui"

export default function TopBar({ claim, contact }) {
  return (
    <Flex sx={{ justifyContent: "space-between" }}>
      <Box>{claim}</Box>
      <Box>{contact}</Box>
    </Flex>
  )
}
