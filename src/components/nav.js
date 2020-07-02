import React from "react"
import { Home } from "./icons"
import { Link } from "gatsby"
import Button from "./button"

export default function Nav() {
  return (
    <div className="flex items-center">
      <Button variant="ghost">
        <Link to="/">
          <Home className="py-1 w-4" />
        </Link>
      </Button>
      <Button variant="ghost">
        <Link to="/">Grillen</Link>
      </Button>
      <Button variant="ghost">
        <Link to="/">Kochen</Link>
      </Button>
    </div>
  )
}
