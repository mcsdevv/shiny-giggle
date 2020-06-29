/** @jsx jsx */
import { jsx, Button, Spinner, Box } from "theme-ui"

import { useAddItemToCart } from "gatsby-theme-shopify-manager"
import { useState, useEffect } from "react"

export default function ButtonAdd({ item, qty, text }) {
  const [buttonState, setButtonState] = useState("primary")
  const variantId = item.shopifyId
  const quantity = parseInt(qty)
  const hook = useAddItemToCart()
  function add() {
    setButtonState("disabled")
    hook(variantId, quantity).then(() => {
      setButtonState("success")
      setTimeout(() => setButtonState("primary"), 1000)
    })
  }
  return (
    <Button
      onClick={add}
      disabled={
        buttonState === "disabled" ||
        buttonState === "success" ||
        item.avaiableForSale === false
      }
      variant={buttonState}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {buttonState === "disabled" && (
          <Spinner variant="styles.loadingSpinner" size="1.5rem" />
        )}
        {buttonState === "success" && (
          <svg
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
            sx={{
              stroke: "currentColor",
              strokeWidth: "3px",
              fill: "none",
              width: "1.5rem",
            }}
          >
            <path d="M5 13l4 4L19 7"></path>
          </svg>
        )}
        {buttonState === "primary" && text}
      </Box>
    </Button>
  )
}
