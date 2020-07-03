import React, { useState, useEffect } from "react"
import Img from "gatsby-image"
import SelectProduct from "./selectProduct"

import { Link } from "gatsby"
import { useClientUnsafe } from "gatsby-theme-shopify-manager"

export default function ProductGrid({ products }) {
  const shopify = useClientUnsafe()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const productIds = products.map(p => p.shopifyId)
  // Update availability on runtime
  useEffect(() => {
    shopify.product
      .fetchMultiple(productIds)
      .then(products => {
        // Returning an array with the same index as the static product array, inside of this array another array with the variants and their availability
        const data = products.map(product => {
          return product.variants.map(variant => {
            return {
              available: variant.available,
            }
          })
        })
        setData(data)
        setLoading(false)
      })
      .catch(error => {
        console.log(error)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <ul className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {products.map((item, index) => {
        const desc =
          item.description.substr(0, item.description.lastIndexOf(" ", 75)) +
          "..."
        return (
          <li key={item.id}>
            <Link to={item.handle}>
              <Img fluid={item.images[0].localFile.childImageSharp.fluid} />
              <h3 className="text-lg font-bold mb-2">{item.title}</h3>
              <p className="text-sm mb-2">{desc}</p>
            </Link>
            <SelectProduct
              variants={item.variants}
              id={item.shopifyId}
              availability={data[index]}
              loading={loading}
            />
          </li>
        )
      })}
    </ul>
  )
}
