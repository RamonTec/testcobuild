import React from "react"
import { shallow } from "enzyme"
import Inicio from "../../components/Inicio.js"

describe("--- Test Component Inicio", () => {

  test("-- Render Component Inicio", () => {
    const inicio = shallow(
      <Inicio />
    )
    expect(inicio.length).toEqual(1)
  })

})