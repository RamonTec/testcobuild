import React from 'react';
import {
  Button,
  Checkbox
} from '@material-ui/core';
import "../css/taskItem.css"
import "../css/spinners.css"

function Task(props) {

  //set status
  const handleChange = (event,item) => {
    stateChanger(item)
  };

  const deleteTask = ({item}) => {
    let filter = {
      id: {
        equals: item.id
      }
    }
    props.funDel({
      variables: { filter },
    }).then((res) => {
      props.refetchFun(true)
      props.loadingState(true)
    }).catch(err => {
      console.log(err)
    });
  }
  
  const stateChanger = (item) => {
    props.stateFunction({
      
      variables: { id: item.id, status: !item.status  }
    }).then((res) => {
      props.refetchFun(true);
      props.loadingState(true)
    }).catch(err => {
      console.log(err)
    });
  }

  return (
    <div>

      { !!props.ifButtonOn && (
        <li className="TodoItem">
        
          <p className="TodoItem-p">
            {props.item.name}
          </p>
          <Button onClick={() => props.handleCloseFunction(props.item)} color="primary">Editar</Button>
          <Button onClick={() => deleteTask(props)} color="secondary">Eliminar</Button>
          <Checkbox
            checked={props.item.status}
            onChange={(e) => handleChange(e,props.item)}
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
        </li>

      )}

    </div>
  );
}

export { Task }