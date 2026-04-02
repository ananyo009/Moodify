import React from 'react'

const Formgrp = ({label,placeholder,value ,onChange,type}) => {
  return (
      <div className="form-group">
          <label htmlFor={label}>{label}</label>
      <input
        onChange={onChange} type={type} id={label} placeholder={placeholder} value={value} />
      </div>
      
  )
}

export default Formgrp