import React, { useState } from "react"
import {
  useRemoveItemFromCart,
  useUpdateItemQuantity,
} from "gatsby-theme-shopify-manager"
import Button from "../button"

function ListItem({ data }) {
  const updateQuantity = useUpdateItemQuantity()
  const removeItem = useRemoveItemFromCart()
  const [quantity, setQuantity] = useState(data.quantity)
  const [loading, setLoading] = useState(false)
  const noChange = quantity === data.quantity
  function handleChange(e) {
    if (e.keyCode === 13 || e.type === "click") {
      if (isNaN(quantity)) {
        setQuantity(0)
      } else {
        setLoading(true)
        updateQuantity(data.variant.id, quantity).then(() => setLoading(false))
      }
    } else if (e.type === "change") {
      if (!data.variant.available) {
        console.log("Not available!")
      } else {
        if (e.target.value >= 0 && e.target.value <= 50) {
          const newValue = parseInt(e.target.value)
          setQuantity(newValue)
        } else if (e.target.value >= 51) {
          setQuantity(50)
        }
      }
    }
  }
  return (
    <li className="flex justify-between items-center pb-4 mb-4 border-b border-gray-200">
      <img
        className="mr-2"
        src={data.variant.image.src}
        width="100"
        height="100"
        alt={data.variant.title}
      />
      <div className="flex-grow">
        <h4 className="font-bold">{data.title}</h4>
        <div className="text-sm text-gray-800">
          <p>
            <strong>Variante: </strong>
            {data.variant.title}
          </p>
        </div>
      </div>
      <div className="flex-shrink-0">
        <label htmlFor={"change-label-" + data.variant.id}>
          <p className="text-sm">Anzahl:</p>
          <div className="flex">
            <input
              className={`border-t border-l border-b rounded-l border-gray-500 p-2 w-20`}
              type="number"
              id={"change-label-" + data.variant.id}
              value={quantity}
              onChange={e => handleChange(e)}
              onKeyDown={e => handleChange(e)}
            />
            <Button
              variant={noChange ? "loading" : "success"}
              className="w-16 flex-grow border-r border-t border-b border-gray-500"
              loading={loading}
              onClick={e => handleChange(e)}
              inlineForm
              disabled={noChange}>
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
            </Button>
          </div>
          <button
            className="text-sm text-red-500"
            onClick={() => removeItem(data.variant.id)}>
            Löschen
          </button>
        </label>
      </div>
    </li>
  )
}

export default function ProductList({ products }) {
  return (
    <ul>
      {products.map(item => (
        <ListItem data={item} key={item.id} />
      ))}
    </ul>
  )
}
