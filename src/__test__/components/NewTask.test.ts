import React from "react"
import { shallow, mount } from "enzyme"
import { NewTask } from "../../components/NewTask"

describe("--- Test Component NewTask", () => {

  test("-- Render Component NewTask", () => {
    const newTask = shallow(
      <NewTask />
    )
    expect(newTask.length).toEqual(1)
  })

  test("-- Render Title NewTask", () => {
    const newTask = mount(
      <NewTask />
    )
    expect(newTask.find('.button-save').text()).toEqual('Guardar')
  })

})