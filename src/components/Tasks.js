import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";

import {
  Grid
} from '@material-ui/core';

import { GET_TASK, CREATE_TASK, DEL_TASK, EDIT_TASK, CHANGE_STATE } from '../graphql/task';
import { GET_USER } from '../graphql/user';

import { NewTask } from './NewTask';
import { Task } from './Task';
import { UpdateTask } from './UpdateTask';
import { ButtonLogout } from "./Button"

import { CircularProgress } from '@material-ui/core'

import "../css/taskItem.css"
import "../css/titles.css"
import "../css/spinners.css"

function Tasks(props) {

  const [loading, setLoading] = useState(false);
  const [task, setTask] = useState([]);
  const [dataModal, setDataModal] = useState([]);
  const [isRefetch, setIsRefetch] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  // Consultas de grahpql, obtener tareas, usuario, crear tareas, eliminar tareas, editar tareas
  const { error, data, refetch } = useQuery(GET_TASK, {
    fecthPolicy: "no-cache",
  });

  const { error: errorUser, data: dataUser } = useQuery(GET_USER, {
    fecthPolicy: "no-cache",
  });

  const [newTask] = useMutation(CREATE_TASK, {
    onCompleted: data => {
      setLoading(false)
    }
  });

  const [delTask] = useMutation(DEL_TASK, {
    onCompleted: data => {
      setLoading(false);
    }
  });

  const [ediTask] = useMutation(EDIT_TASK, {
    onCompleted: data => {
      setLoading(false);
    }
  });

  const [changeStateTask] = useMutation(CHANGE_STATE, {
    onCompleted: data => {
      console.log(data)
      setLoading(false)
    }
  });

  const handleClose = (data) => {
    
    if (data && data.id) {
      setDataModal(data)
    }
    setOpenModal(!openModal);
  }

  useEffect(() => {
    // verifico la data, caso tal seteo la que llega
    if (data && data.tasksList) {
      setTask(data.tasksList.items);
    }

    // Verifico
    if (isRefetch) {
      refetch()
      setIsRefetch(false)
      setLoading(false)
    }

  }, [data, error, isRefetch, errorUser, dataUser, refetch]);
  return (
    <div>

      <Grid container justifyContent="flex-end" direction="row" md={12}>
        <ButtonLogout logoutFun={props.logoutFunction}/>
      </Grid>
      
      <Grid container spacing={2}>
        <Grid
          md={12}
        >

          <NewTask 
            newTask={newTask}
            loadingState={setLoading} 
            refetchFun={setIsRefetch} 
          />
        </Grid>

        <Grid
          md={12}
          ccontainer justifyContent="flex-end" direction="row"
        >
          {!!task && task.map((item, i) => {
            return (
              <Grid spacing={2}>
                <Task
                  item={item}
                  editFun={setOpenModal}
                  handleCloseFunction={handleClose}
                  loadingState={setLoading} 
                  refetchFun={setIsRefetch}
                  funDel={delTask}
                  ifButtonOn={true}
                  stateFunction={changeStateTask}
                  key={i} />
              </Grid>
            )
          })}
        </Grid>
      </Grid>

      <UpdateTask 
        sendDataEdit={ediTask} 
        refetchFun={setIsRefetch}
        loadingState={setLoading} 
        open={openModal} 
        datosForm={dataModal} 
        handleCloseFunction={handleClose} 
      />

      { loading === true && (
        <div className="spinner-center">
          <CircularProgress />
        </div>
      )}
    </div>
  );
}

export { Tasks }