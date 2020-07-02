import React from "react"
export default function Badge(props) {
  const variants = {
    primary: "bg-blue-700 text-white",
    success: "bg-green-700 text-white",
    muted: "bg-gray-600 text-white",
  }
  return (
    <span
      className={`text-xs font-medium px-1 rounded ${
        variants[props.variant] || variants.primary
      } ${props.className}`}>
      {props.children}
    </span>
  )
}
