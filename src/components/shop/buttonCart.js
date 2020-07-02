import React from "react"
import { Link } from "gatsby"
import { useCartCount } from "gatsby-theme-shopify-manager"
import Button from "../button"
import Badge from "../badge"

export default function CartButton() {
  const cartCount = useCartCount()
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
