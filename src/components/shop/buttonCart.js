import React, { useState, useEffect } from "react"
import { Link } from "gatsby"
import { useCartCount } from "gatsby-theme-shopify-manager"
import Button from "../button"
import Badge from "../badge"

export default function CartButton() {
  const isSsr = typeof window === "undefined"
  const getCount = useCartCount()
  const count = isSsr ? 0 : getCount
  const [cartCount, setCartCount] = useState(count)
  useEffect(() => {
    setCartCount(getCount)
  }, [getCount])
  return (
    <Link to="/warenkorb">
      <Button variant={cartCount > 0 ? "success" : "loading"}>
        <div className="flex items-center">
          Warenkorb
          <Badge variant={cartCount > 0 ? "success" : "muted"} className="ml-2">
            {cartCount}
          </Badge>
        </div>
      </Button>
    </Link>
  )
}
