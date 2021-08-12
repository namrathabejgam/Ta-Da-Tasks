import React, { useState } from 'react';
import './App.css';
import IconButton from '@material-ui/core/IconButton';
import AddCircleOutlinedIcon from '@material-ui/icons/AddCircleOutlined';
import Grid from '@material-ui/core/Grid';
import AddTaskForm from './components/AddTaskForm';
import VisibilityFilters from './components/VisibilityFilters'
import TodoList from './components/TodoList'
import { Typography } from '@material-ui/core';

function App() {
  const [openTaskModal , setOpenTaskModal] = useState(false);
  const [mode , setMode] = useState("");
  const [data, setData] = useState("");

  const openTaskModalForm = (mode,todo) => {
    setOpenTaskModal(true)
    mode && setMode(mode)
    todo && setData(todo)
  }

  const handleClose = () => {
    setOpenTaskModal(false);
  }

  return (
    <Grid item container xs={12} style={{height: '100vh', width: '100%'}} justify="space-between">
      <Grid item style={{width: '100%'}}>
        <Grid item xs={12} container alignItems="flex-start" justify="center" style={{backgroundColor: 'none',}}>
          <Typography variant="h4" color="primary">TA-DA-TASKS!</Typography>
        </Grid>        
        <Grid item xs={12} container alignItems="flex-start" justify="flex-start" style={{backgroundColor: 'none',}}>
          <VisibilityFilters/>
        </Grid>
        <Grid item xs={12}>
          <TodoList openTaskModalForm={openTaskModalForm}/>
        </Grid>
      </Grid>
      <Grid item xs container alignItems="flex-end" justify="flex-end" style={{backgroundColor: 'none',}}>
        <Grid item>
          <IconButton aria-label="add" color="primary">
            <AddCircleOutlinedIcon  style={{width: '50px', height: '50px'}} onClick={() => openTaskModalForm("add")} fontSize="large"/>
          </IconButton>
        </Grid>
      </Grid>
      {
        openTaskModal && 
        <AddTaskForm
          open={openTaskModal}
          mode={mode}
          data={data}
          handleClose={handleClose}
        />
      }
    </Grid>
  );
}

export default App;