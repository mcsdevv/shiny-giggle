import React from "react"
import Img from "gatsby-image"
import SelectAdd from "./selectAddProduct"
import { Link } from "gatsby"

export default function ProductGrid({ products }) {
  return (
    <ul className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {products.map(item => {
        const desc =
          item.description.substr(0, item.description.lastIndexOf(" ", 100)) +
          "..."
        return (
          <li key={item.id}>
            <Link to={item.handle}>
              <Img
                fluid={item.images[0].localFile.childImageSharp.fluid}
                alt={item.title}
              />
              <h3 className="text-lg font-bold mb-2">{item.title}</h3>
              <p className="text-sm mb-2">{desc}</p>
            </Link>
            <SelectAdd variants={item.variants} id={item.shopifyId} />
          </li>
        )
      })}
    </ul>
  )
}
