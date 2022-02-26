import React from 'react';
import {
  Card,
  CardContent,
  Grid,
  makeStyles,
  TextField
} from '@material-ui/core';
import { Formik } from 'formik';
import Modal from '@material-ui/core/Modal';
import "../css/buttons.css"
import "../css/titles.css"

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'relative',
    width: 300,
    backgroundColor: "#001d3d",
    padding: "20px",
    top: '200px',
    left: '600px',
  },
}));

function UpdateTask(props) {
  const classes = useStyles();
  //Function prop para usar el EDIT_TASK
  const onSubmit = (values) => {
    //Genero los objetos para enviar
    //Inicio
    let data = {
      name: values.tareaInput,
    }
    let filter = {
      id: values.id,
    }
    props.sendDataEdit({
      variables: { data, filter },
    }).then((res) => {
      console.log(data, filter)
      props.handleCloseFunction()
      props.refetchFun(true);
    }).catch(err => {
      props.handleCloseFunction()
      console.log(err)
    });
  };

  const initialValues = {
    tareaInput: props.datosForm.content,
    id: props.datosForm.id,
  }

  const body = (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={async (values, actions) => {
        await onSubmit(values)
        actions.resetForm({
          values: {
            tareaInput: '',
            id: '',
            usuario: ''
          },
        });
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
      }) => (
        <form onSubmit={handleSubmit}>
          <Card className={classes.paper}>
            <CardContent>

              <p className="title-update-task">
                Editar Tarea
              </p>

              <Grid
                container
                spacing={3}
              >
              
                <Grid
                  item
                  xs={12}
                >
                  <Grid
                    item
                    xs={12}
                  >
                    <TextField
                      required
                      fullWidth
                      name="tareaInput"
                      id="tareaInput"
                      label="Tarea"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.tareaInput}
                    />
                    {errors.tareaInput && touched.tareaInput && errors.tareaInput}
                  </Grid>

                </Grid>
              </Grid >

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

            </CardContent>
          </Card>
        </form>
      )}
    </Formik>

  );
  //retorno a la vista task el componente modal
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