import React from "react"
import "../css/buttons.css"

function ButtonLogout(props) {
  return (
    <button className="button-logout" variant="contained" onClick={props.logoutFun} type="button">
      Salir
    </button>
  )
}

export { ButtonLogout }