import React from "react"
import Loading from "./loading"

export default function (props) {
  const variants = {
    base: `inline-block px-4 py-2 font-medium transition-colors duration-200 focus:outline-none ${
      props.disabled && `cursor-default`
    } flex justify-center items-center`,
    primary: "bg-blue-100 text-blue-900 hover:bg-blue-200 active:bg-blue-300",
    success:
      "bg-green-200 text-green-900 hover:bg-green-300 active:bg-green-400",
    error: "bg-red-200 text-red-900 hover:bg-red-300 active:bg-red-400",
    loading: "bg-gray-300 text-gray-600",
  }
  const btnClasses = `${variants.base} ${
    !props.loading && props.variant
      ? variants[props.variant]
      : variants["loading"]
  } ${props.className} ${props.inlineForm ? "rounded-r" : "rounded"}`
  return (
    <button
      onClick={props.onClick}
      className={btnClasses}
      disabled={props.disabled}>
      {props.loading ? <Loading /> : props.children}
    </button>
  )
}
