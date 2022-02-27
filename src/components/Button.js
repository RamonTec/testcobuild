import React from "react"
import "../css/buttons.css"

// Boton usado para cerrar la sesion
function ButtonLogout(props) {
  return (
    <button className="button-logout" variant="contained" onClick={props.logoutFun} type="button">
      Salir
    </button>
  )
}

export { ButtonLogout }