/** @jsx jsx */
import { jsx, Button, Spinner, Box } from "theme-ui"

import { useAddItemToCart } from "gatsby-theme-shopify-manager"
import { useState } from "react"

export default function ButtonAdd({ id, qty, available, text, loading }) {
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
    }
    switch (buttonState) {
      case "disabled":
        return <Spinner variant="styles.loadingSpinner" size="24px" />
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
            }}
          >
            <path d="M5 13l4 4L19 7"></path>
          </svg>
        )
      default:
        return text
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
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <InnerButton />
      </Box>
    </Button>
  )
}
