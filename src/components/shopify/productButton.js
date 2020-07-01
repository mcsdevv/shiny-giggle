/** @jsx jsx */
import { jsx, Box } from "theme-ui"

import { useAddItemToCart } from "gatsby-theme-shopify-manager"
import { useState } from "react"

import Button from "../button"

export default function ProductButton({ id, qty, available, text, loading }) {
  const [buttonState, setButtonState] = useState("primary")
  const variantId = id
  const quantity = parseInt(qty)
  const hook = useAddItemToCart()

  function handleClick() {
    setButtonState("disabled")
    hook(variantId, quantity).then(() => {
      setButtonState("success")
      setTimeout(() => setButtonState("primary"), 1000)
    })
  }

  function InnerButton() {
    if (!available) {
      return "Ausverkauft"
    } else {
      switch (buttonState) {
        case "success":
          return (
            <svg
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
              sx={{
                stroke: "currentColor",
                strokeWidth: "3px",
                fill: "none",
                width: "24px",
              }}>
              <path d="M5 13l4 4L19 7"></path>
            </svg>
          )
        default:
          return text
      }
    }
  }

  return (
    <Button
      onClick={handleClick}
      variant={!available ? "disabled" : buttonState}
      disabled={
        buttonState === "disabled" ||
        buttonState === "success" ||
        !available ||
        loading
      }
      loading={loading || buttonState === "disabled"}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <InnerButton />
      </Box>
    </Button>
  )
}