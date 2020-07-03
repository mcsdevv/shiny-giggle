import React from "react"
import ProductList from "../components/shop/ProductList"
import SEO from "../components/Seo"
import CartSummary from "../components/shop/CartSummary"

import { useCartCount, useCartItems } from "gatsby-theme-shopify-manager"
import { graphql } from "gatsby"

export default function Warenkorb({ data }) {
  // Hooks
  const cartItems = useCartItems()
  const cartCount = useCartCount()
  // Static Variant data for Images
  const {
    allShopifyProductVariant: { edges: variants },
  } = data
  // Debug
  return (
    <>
      <SEO title="Warenkorb" />
      <h3 className="text-3xl font-bold mb-4">Warenkorb</h3>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <p className="mb-4 text-sm text-gray-800">
            {cartCount > 0
              ? `Artikel im Warenkorb: ${cartCount}`
              : "Der Warenkorb ist leer."}
          </p>
          {cartCount > 0 && (
            <ProductList products={cartItems} staticVariants={variants} />
          )}
        </div>
        {cartCount > 0 && <CartSummary />}
      </div>
    </>
  )
}

export const query = graphql`
  query cartQuery {
    allShopifyProductVariant {
      edges {
        node {
          shopifyId
          image {
            localFile {
              childImageSharp {
                fixed(width: 100) {
                  ...GatsbyImageSharpFixed_withWebp_tracedSVG
                }
              }
              absolutePath
            }
          }
        }
      }
    }
  }
`
