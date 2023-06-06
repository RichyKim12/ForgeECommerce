import React from 'react'

function NewProduct() {
  const fileSelectHandler = (event) =>{
    console.log(event)
  }

  return (
    <>
     <input type = "file" onClick={fileSelectHandler}>
      
     </input>
    </>

  )
}

export default NewProduct