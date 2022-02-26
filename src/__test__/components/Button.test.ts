import React from "react"
import { shallow, mount } from "enzyme"
import { ButtonLogout } from "../../components/Button"

describe("--- Test Component Button", () => {

  test("-- Render Component Button", () => {
    const button = shallow(
      <ButtonLogout />
    )
    expect(button.length).toEqual(1)
  })

  test("-- Render Title Button", () => {
    const button = mount(
      <ButtonLogout />
    )
    expect(button.find('.button-logout').text()).toEqual('Salir')
  })
})