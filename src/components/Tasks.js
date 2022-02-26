import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";

import {
  Grid
} from '@material-ui/core';

import { GET_TASK, CREATE_TASK, DEL_TASK, EDIT_TASK } from '../graphql/task';
import { GET_USER } from '../graphql/user';

import { NewTask } from './NewTask';
import { Cards } from './Task';
import { UpdateTask } from './UpdateTask';
import { ButtonLogout } from "./Button"

import "../css/taskItem.css"
import "../css/titles.css"

function Tasks(props) {

  const [loading, setLoading] = useState(false);
  const [task, setTask] = useState([]);
  const [dataModal, setDataModal] = useState([]);
  const [isRefetch, setIsRefetch] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const { loading: LoadingTask, error, data, refetch } = useQuery(GET_TASK, {
    fecthPolicy: "no-cache",
  });

  const { loading: LoadingUser, error: errorUser, data: dataUser } = useQuery(GET_USER, {
    fecthPolicy: "no-cache",
  });

  const [newTask] = useMutation(CREATE_TASK, {
    onCompleted: data => {
      setLoading(false);
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

  const [changeStateTask] = useMutation(EDIT_TASK, {
    onCompleted: data => {
      setLoading(false);
    }
  });

  const handleClose = (data) => {
    if (data && data.id) {
      setDataModal(data)
    }
    setOpenModal(!openModal);
  }
  useEffect(() => {
    if (data && data.tasksList) {
      let tasks = data.tasksList.items;
      setTask(tasks);
    }

    if (isRefetch) {
      refetch()
      setIsRefetch(false)
    }

    if (LoadingTask || LoadingUser) {
      return <h1>Cargando</h1>
    }

  }, [LoadingTask, data, error, isRefetch, LoadingUser, errorUser, dataUser, refetch]);
  return (
    <div>

      <Grid container justifyContent="flex-end" direction="row" md={12}>
        <ButtonLogout logoutFun={props.logoutFunction}/>
      </Grid>
      
      <Grid container spacing={2}>
        <Grid
          item
          md={12}
        >
          <p className="title-create-task">
            Crear tarea
          </p>

          <NewTask 
            newTask={newTask} 
            logoutFun={props.logoutFunction} 
            loadingState={setLoading} 
            refetchFun={setIsRefetch} 
          />
        </Grid>

        <Grid
          item
          md={12}
          ccontainer justifyContent="flex-end" direction="row"
        >
          {!!task && task.map((item, i) => {
            return (
              <Grid spacing={2}>
                <Cards
                  item={item}
                  editFun={setOpenModal}
                  handleCloseFunction={handleClose}
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
        open={openModal} 
        datosForm={dataModal} 
        handleCloseFunction={handleClose} 
      />
    </div>
  );
}

export { Tasks }