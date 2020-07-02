import React, { useState } from "react"

import ProductList from "../components/shop/listProducts"
import SEO from "../components/seo"
import Button from "../components/button"
import Layout from "../layouts"
import { dotToComma } from "../utils/dotToComma"

import {
  useCheckoutUrl,
  useCartCount,
  useRemoveItemsFromCart,
  useCart,
} from "gatsby-theme-shopify-manager"

export default function Warenkorb() {
  const cart = useCart()
  const cartCount = useCartCount()
  const goCheckout = useCheckoutUrl()
  const isSsr = typeof window === "undefined"
  const subtotal = isSsr ? 0 : parseFloat(cart.subtotalPrice)
  const shipping = subtotal > 50 ? 0 : 3.99
  const total = subtotal + shipping
  const totalComma = Number.parseFloat(total).toFixed(2)

  const [remove, setRemove] = useState(false)
  const hookRemoveItems = useRemoveItemsFromCart()

  function removeItems(items) {
    setRemove(true)
    hookRemoveItems(items)
      .then(() => {
        setRemove(false)
      })
      .catch(error => console.log(error))
  }

  function removeAllItems() {
    const all = cart.lineItems.map(i => i.variant.id)
    removeItems(all)
  }
  return (
    <Layout>
      <SEO title="Warenkorb" />
      <h3 className="text-3xl font-bold mb-4">Warenkorb</h3>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <p className="mb-4 text-sm text-gray-800">
            {cartCount > 0
              ? `Artikel im Warenkorb: ${cartCount}`
              : "Der Warenkorb ist leer."}
          </p>
          {!isSsr && <ProductList products={cart.lineItems} />}
        </div>
        {cartCount > 0 && (
          <div>
            <div className="rounded shadow p-4">
              <h3 className="text-2xl font-bold mb-4">
                Bestellzusammenfassung
              </h3>
              <p>
                <strong>Zwischensumme:</strong> {dotToComma(cart.subtotalPrice)}{" "}
                €
              </p>
              <hr className="my-2" />
              <p>
                <strong>Versandkosten:</strong>{" "}
                {shipping > 0 ? dotToComma(shipping) + " €" : "Kostenfrei"}
              </p>
              <hr className="my-2" />
              <p>
                <strong>Gesamt:</strong> {dotToComma(totalComma)} €
              </p>
              <hr className="my-2 border-black" />
              <p className="text-gray-600 mb-2 text-sm">
                <strong>Hinweis:</strong> Versandkosten und Steuern sind
                geschätzt und werden während des Bestellvorgangs aktualisiert,
                basierend auf deinen Rechnungs- und Versandinformationen.
              </p>
              <div className="flex items-center justify-between">
                <Button
                  mt="2"
                  variant="error"
                  loading={remove}
                  onClick={removeAllItems}>
                  Warenkorb löschen
                </Button>
                <a target="__blank" href={goCheckout}>
                  <Button variant="success">
                    Zur Kasse{" "}
                    <svg
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      className="w-4 ml-2">
                      <path
                        fillRule="evenodd"
                        d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"></path>
                    </svg>
                  </Button>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}
