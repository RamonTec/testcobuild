import React from 'react';
import Modal from '@material-ui/core/Modal';
import "../css/buttons.css"
import "../css/titles.css"
import "../css/newTask.css"

function UpdateTask(props) {

  const [updateTask, setUpdateTask] = React.useState('')

  // Metodo encargado de modificar la tarea seleccionada
  const updateTaskForm = (event) => {
    event.preventDefault()
    
    let data = {
      name: updateTask,
    }
    let filter = {
      id: props.datosForm.id,
    }
    
    props.sendDataEdit({
      variables: { data, filter },
    }).then((res) => {
      console.log(data, filter)
      props.handleCloseFunction()
      props.refetchFun(true)
      props.loadingState(true)
    }).catch(err => {
      props.handleCloseFunction()
      console.log(err)
    });

  }

  // Funcion que recibe el evento nuevo (lo que ingresa en el input) y llama setUpdateTask para actualizar el estado
  const onChangeTask = (event) => {
    setUpdateTask(event.target.value)
  }

  const body = (
    <div className="center-form-new-task">
      <form onSubmit={updateTaskForm}> 

        <textarea
          onChange={onChangeTask}
          value={updateTask}
          placeholder="Editar tarea"
        />
        
        <div className="buttons-modal">
          
          <button
            className="button-update"
            type="submit"
          >
            Guardar
          </button>

          <button
            className="button-cancel"
            onClick={props.handleCloseFunction}
          >
            Cancelar
          </button>
        </div>
        
      </form>
    </div>

  );
  
  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.handleCloseFunction}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}

export { UpdateTask }