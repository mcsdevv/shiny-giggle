import React, { useState } from "react"
import { useAddItemToCart } from "gatsby-theme-shopify-manager"
import Button from "../button"

export default function ProductButton({ id, qty, available, loading, text }) {
  const addItemToCart = useAddItemToCart()
  const [buttonState, setButtonState] = useState("primary")
  const variantId = id
  const quantity = parseInt(qty)
  function handleClick() {
    setButtonState("loading")
    addItemToCart(variantId, quantity)
      .then(() => {
        setButtonState("success")
        setTimeout(() => setButtonState("primary"), 500)
      })
      .catch(error => console.log(error))
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
              stroke="currentColor"
              strokeWidth="3px"
              fill="none"
              className="w-6">
              <path d="M5 13l4 4L19 7"></path>
            </svg>
          )
        default:
          return text
      }
    }
  }

  const isDisabled =
    buttonState === "loading" ||
    buttonState === "success" ||
    !available ||
    loading
  const isLoading = loading || buttonState === "loading"
  const variant = available ? buttonState : "loading"

  return (
    <Button
      onClick={handleClick}
      variant={variant}
      disabled={isDisabled}
      loading={isLoading}>
      <InnerButton />
    </Button>
  )
}
