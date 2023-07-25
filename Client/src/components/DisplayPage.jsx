import React from 'react'
import AddButtons from './AddButtons'
import Projects from './Projects'
import Clients from './Clients'

const DisplayPage = () => {
  return (
      <>
      <AddButtons/>
          <Projects/>
          <Clients/>
      </>
  )
}

export default DisplayPage