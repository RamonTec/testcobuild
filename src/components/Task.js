import React from 'react';
import {
  Button,
  Checkbox
} from '@material-ui/core';
import "../css/taskItem.css"

function Cards(props) {

  const [checked, setChecked] = React.useState(false);

  //set status
  const handleChange = (event,item) => {
    setChecked(event.target.checked);
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
      props.refetchFun(true);
    }).catch(err => {
      console.log(err)
    });
  }
  
  const stateChanger = (item) => {
    let data = {
      status: !item.status,
    }
    let filter = {
      id: item.id,
    }
    props.stateFunction({
      
      variables: { data, filter  }
    }).then((res) => {
      props.refetchFun(true);
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
            checked={checked}
            onChange={(e) => handleChange(e,props.item)}
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
        </li>

      )}

    </div>
  );
}

export { Cards }