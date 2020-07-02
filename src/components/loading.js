import React from "react"
import style from "./loading.module.css"

export default function LoadingDots() {
  return (
    <ul className={style.loading}>
      <li className={style.dot} />
      <li className={style.dot} />
      <li className={style.dot} />
    </ul>
  )
}
