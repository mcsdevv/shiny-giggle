import React from "react"

export default function Select({ options, value, name, id, onChange, label }) {
  return (
    <label htmlFor={"select-" + id}>
      <span className="text-xs block">{label}</span>
      <div className="relative">
        <select
          name={name}
          id={"select-" + id}
          value={value}
          onChange={onChange}
          onBlur={onChange}
          className="appearance-none p-2 border-black w-full border rounded outline-none">
          {options.map((o, i) => (
            <option value={i} key={o.id}>
              {o.title}
            </option>
          ))}
        </select>
        <div className="absolute right-0 inset-y-0 mr-2 flex items-center">
          <svg fill="currentColor" viewBox="0 0 20 20" className="w-6">
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"></path>
          </svg>
        </div>
      </div>
    </label>
  )
}
