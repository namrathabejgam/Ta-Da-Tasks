import React from "react";
import { connect } from "react-redux";
import Todo from "./Todo";
import { getTodosByVisibilityFilter } from "../redux/selectors";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const TodoList = ({ todos,openTaskModalForm }) => (
  <>
    {todos && todos.length ?
    <TableContainer component={Paper}>
    <Table aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>Summary</TableCell>
          <TableCell align="left">Priority</TableCell>
          <TableCell align="left">Created On</TableCell>
          <TableCell align="left">Due Date</TableCell>
          <TableCell align="left">Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {todos.map((todo, index) => {
          return <Todo key={`todo-${todo.id}`} todo={todo} openTaskModalForm={openTaskModalForm}/>;
        })
        }
      </TableBody>
    </Table>
  </TableContainer> 
  : 
  <Grid item container xs={12} justify="center">
    <Grid item style={{paddingTop: '50px'}}>
    Nothing in here right now!
    </Grid>
  </Grid>
  }
  </> 
);

const mapStateToProps = state => {
  const { visibilityFilter } = state;
  const todos = getTodosByVisibilityFilter(state, visibilityFilter);
  return { todos };
};

export default connect(mapStateToProps)(TodoList);