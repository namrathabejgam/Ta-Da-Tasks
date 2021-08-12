import React, { useState } from 'react';
import { connect } from "react-redux";
import { toggleTodo, deleteTodo } from "../redux/actions";
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import moment from 'moment';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const Todo = ({ todo, toggleTodo, deleteTodo, openTaskModalForm }) => {
  const [hovered, setHovered] = useState('false');
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);

  const toggleHover = (set) => {
    setHovered(set)
  }

  const handleDeleteClose = () => {
    setOpenDeleteConfirmation(false)
  }

  const rowStyle = {cursor: 'pointer', backgroundColor: '#f0f2f5',boxShadow: '5px 10px 13px rgb(255, 255, 255,0.6)' }

  return(
  <>
  <TableRow onMouseEnter={() => toggleHover('true')} onMouseLeave={() => toggleHover('false')} onClick={() => openTaskModalForm("view",todo)} style={hovered==="true" ?rowStyle: {}}>
    <TableCell component="th" scope="row">
      {todo.content.summary}
    </TableCell>
    <TableCell align="left">{todo.content.priority}</TableCell>
    <TableCell align="left">{moment(todo.content.createdOn).format('DD-MM-YYYY')}</TableCell>
    <TableCell align="left">{moment(todo.content.dueDate).format('DD-MM-YYYY')}</TableCell>
    <TableCell align="left">
      <IconButton color="primary" aria-label="edit" component="span" onClick={(e) => {
          e.stopPropagation();
          openTaskModalForm("edit",todo)
        }}>
        <EditIcon/>
      </IconButton>
      <IconButton color="primary" aria-label="delete" component="span" onClick={(e) => {
          e.stopPropagation();
          setOpenDeleteConfirmation(true)

        }}>
        <DeleteIcon/>
      </IconButton>
      <Button variant="contained" color="primary" onClick={(e) => {
        e.stopPropagation();
        toggleTodo(todo.id)}}>
        {todo && todo.completed ? "Reopen" : "Mark as Done"}
      </Button>
    </TableCell>
  </TableRow>
  <Dialog
  open={openDeleteConfirmation}
  onClose={handleDeleteClose}
  aria-labelledby="responsive-dialog-title"
  >
  <DialogTitle id="responsive-dialog-title">{"DELETE TASK"}</DialogTitle>
  <DialogContent>
  <DialogContentText>
      You clicked on delete. Are you sure you want to delete this task?
  </DialogContentText>
  </DialogContent>
  <DialogActions>
  <Button variant="outlined" color="primary" onClick={handleDeleteClose}>
      Cancel
  </Button>
  <Button onClick={() => deleteTodo(todo.id)} variant="contained" color="primary">
      Confirm
  </Button>
  </DialogActions>
  </Dialog>
  </>
);
}

export default connect(
  null,
  { toggleTodo, deleteTodo }
)(Todo);