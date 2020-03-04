import React from 'react'

 function Name({ name, handleChange }) {
  return (
    <div>
        <label className="header-name">
          <input
            value={name}
            onChange={(e) => handleChange(e.target.value)}
            onClick={(e) => e.target.setSelectionRange(0, e.target.value.length)}
            placeholder="Untitled"
          />
        </label>
    </div>
  )
}
export default Name
