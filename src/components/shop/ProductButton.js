import React, { useState } from "react"
import { useAddItemToCart } from "gatsby-theme-shopify-manager"
import Button from "../Button"

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
  function Inner() {
    if (loading) {
      return text
    } else if (!loading && !available) {
      return "Ausverkauft"
    } else return text
  }

  const isDisabled =
    buttonState === "loading" ||
    buttonState === "success" ||
    !available ||
    loading
  const isLoading = loading || buttonState === "loading"
  const variant = available ? buttonState : "muted"

  return (
    <Button
      onClick={handleClick}
      variant={variant}
      disabled={isDisabled}
      loading={isLoading}
      confirmed={buttonState === "success"}>
      <Inner />
    </Button>
  )
}
