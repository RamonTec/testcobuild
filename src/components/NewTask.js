import React from "react";
import "../css/buttons.css"
import "../css/newTask.css"

function NewTask(props) {

  const [newTaskValue, setNewTask] = React.useState('')

  const onAddTask = (event) => {
    event.preventDefault()
    let data = {
      name: newTaskValue,
      status: false
    }
    props.newTask({
      variables: { data },
    }).then((res) => {
      props.refetchFun(true);
    }).catch(err => {
      console.log(err)
    });
  }

  const onChangeTodo = (event) => {
    setNewTask(event.target.value)
  }

  return (
    <form onSubmit={onAddTask}>
      <textarea
        onChange={onChangeTodo}
        value={newTaskValue}
        placeholder="Escribe la nueva tarea"
      />

      <button className="button-save" type="submit">
        Guardar
      </button>

    </form>
  );
}

export { NewTask }