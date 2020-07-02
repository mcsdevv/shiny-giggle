import React, { useState, useEffect } from "react"
import { Link } from "gatsby"

import Logo from "./logo"
import Nav from "./nav"
import CartButton from "./shop/buttonCart"

export default function Header() {
  const [sticky, setSticky] = useState(false)
  function scrollFunction() {
    if (
      document.body.scrollTop > 50 ||
      document.documentElement.scrollTop > 50
    ) {
      setSticky(true)
    } else setSticky(false)
  }
  useEffect(() => {
    scrollFunction()
    window.onscroll = e => {
      scrollFunction()
    }
  }, [])

  return (
    <header
      className={`bg-white py-4 border-b border-transparent transition-colors duration-200 sticky top-0 mb-8 z-50 ${
        sticky && `border-gray-300`
      }`}>
      <div className="container mx-auto">
        <div className="grid grid-cols-3">
          <div className="flex items-center">
            <Nav />
          </div>
          <div className="flex items-center justify-center">
            <Link to="/">
              <Logo className="w-12" />
            </Link>
          </div>
          <div className="flex items-center justify-end">
            <CartButton />
          </div>
        </div>
      </div>
    </header>
  )
}
