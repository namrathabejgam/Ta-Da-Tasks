import React, { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {withStyles} from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import {MuiPickersUtilsProvider} from "@material-ui/pickers";
import { connect } from "react-redux";
import { addTodo, editTodo } from "../redux/actions";
import { DatePicker } from "@material-ui/pickers";
import moment from 'moment';
import MomentUtils from '@date-io/moment';
import Typography from '@material-ui/core/Typography';

const styles = () => {
    return {
        paper: {
            position: "relative",
            minHeight: "231px",
            outline: "none",
            backgroundColor: "white",
            borderRadius: 0,
            top: "98.46px",
            margin: "0 auto",
            width: "50%"
          }  
    };
  };

const AddTaskForm = props => {

    const prefillModes = ['edit','view']
    const prefill = prefillModes.includes(props.mode) ? true : false
    const [summary, setSummary] = useState( prefill  ? props.data.content.summary : '');
    const [description, setDescription] = useState( prefill ? props.data.content.description : '');
    const [priority, setPriority] = useState( prefill ? props.data.content.priority : '');
    const [dueDate, setDueDate] = useState( prefill ? moment(props.data.content.dueDate) :new Date());   

    const handleAddTask = () => {
        const data = {
            "summary" : summary,
            "description" : description,
            "priority" : priority,
            "dueDate" : dueDate,
            "createdOn" : new Date()
        }
        props.mode === "edit" ? props.editTodo(data,props?.data.id) : props.addTodo(data);
        props.handleClose() ;
    };

    const handleChange = ( fieldValue, field) => {
        if (field === 'summary') {
            setSummary(fieldValue);
        }
        else if(field === 'description') {
            setDescription(fieldValue);
        }
        else if(field === 'priority') {
            setPriority(fieldValue.target.value);
        }           
        else if(field === "dueDate"){
            setDueDate(fieldValue);
        }
    }


    const getInputField = (input) => {
        if(input.type === "select"){
            return (
            <FormControl style={{width: '196px'}}>
                <InputLabel shrink>Priority</InputLabel>
                <Select
                  value={input.value}
                  onChange={(value) => handleChange(value, input.key)}
                  disabled={props.mode==="view"?true:false}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={"Low"}>Low</MenuItem>
                    <MenuItem value={"Medium"}>Medium</MenuItem>
                    <MenuItem value={"High"}>High</MenuItem>
                </Select>
              </FormControl>                
            )
        }
        if(input.type === "date"){
            return (
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                    <DatePicker
                        style={{width: '212px'}}
                        label="Due Date"
                        value={dueDate}
                        minDate={new Date()}
                        onChange={(value) => handleChange(value, input.key)}
                        animateYearScrolling
                        disabled={props.mode==="view"?true:false}
                    />
                    </MuiPickersUtilsProvider>       
            )
        }
        if (input.readOnly) {
            return (
                <>
                </>
            );
        } else {
            return (
                <TextField
                    required={input.required}
                    label={input.label}
                    value={input.value}
                    onChange={(event) => {
                        handleChange(event.target.value, input.key)}
                    }
                    rows={input.label.toLowerCase()==="description"?"4":"1"}
                    multiline
                    style={{width:'100%'}}
                    type={input.type}
                    disabled={props.mode==="view"?true:false}
                    startAdornment={input.startAdornment ? input.startAdornment : ''}
                />
            );
        }       
    }


    const getInputFields = (fieldName) => {
        let inputFieldList = {
            summary:{
                label: "Summary",
                value: summary,
                key: "summary",
                type: "text",
            },
            description:{
                label: "Description",
                value: description,
                key: "description",
                type: "text",
            },
            priority:{
                label: "priority",
                value: priority,
                key: "priority",
                readOnly: false,
                type: "select",
                options: ['Low', 'Medium', 'High']
            },
            dueDate:{
                label: "Due Date",
                value: dueDate,
                key: "dueDate",
                type: "date"               
            },
            createdOn:{
                label: "Created On",
                value: moment(props?.data?.content?.createdOn).format('MMMM Do'),
                key: "createdOn",
                type: "text"               
            },
            currentState:{
                label: "Current State",
                value: props?.data?.completed===true ? "Completed" : "Pending" ,
                key: "currentState",
                type: "text"               
            }                           
        };
        return <Grid item xs={11}>{getInputField(inputFieldList[fieldName])}</Grid>        
    }  

    return (
            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={props.open}
                onClose={props.handleClose}
                style={{marginTop: '10%',marginLeft: '30%',width: '500px'}}
            >
                <Paper elevation={3}>                     
                <Grid container justify={"center"} style={{paddingTop:'20px'}}>
                    <Grid item container xs={11} justify={"center"}>
                        <Typography variant="h5">
                            {props.mode.toUpperCase() + " TASK"}
                        </Typography>
                    </Grid>                                  
                    <Grid item container xs={12} justify={"space-evenly"}>
                        {getInputFields("summary")}
                    </Grid>
                    <Grid item container xs={12} justify={"space-evenly"}>
                        {getInputFields("description")}
                    </Grid>
                    <Grid item container xs={12} justify={"space-evenly"} style={{paddingTop: '15px',paddingLeft:'11px'}}>   
                        <Grid item container xs={6} justify={"space-evenly"}>
                            {getInputFields("priority")}
                        </Grid>
                        <Grid item container xs={6} justify={"space-evenly"}>
                            {getInputFields("dueDate")}
                        </Grid> 
                    </Grid>
                    { props.mode === "view" &&
                    <Grid item container xs={12} justify={"space-evenly"} style={{paddingTop: '15px',paddingLeft:'11px'}}>   
                        <Grid item container xs={6} justify={"space-evenly"}>
                            {getInputFields("createdOn")}
                        </Grid>
                        <Grid item container xs={6} justify={"space-evenly"}>
                            {getInputFields("currentState")}
                        </Grid> 
                    </Grid> }                   
                </Grid>
               <Grid container alignItems="center" justify="space-around" style={{width: '100%',paddingTop: '20px',paddingBottom: '20px'}}>
                   <Grid item>
                   <Button variant="outlined" color="primary" component="span" onClick={props.handleClose} style={{marginRight: '15px'}}>
                        Cancel
                    </Button>
                    {props.mode!=="view" &&
                        <Button variant="contained" color="primary" component="span"
                            onClick={
                                handleAddTask
                            }
                            disabled={summary.length === 0}
                        >
                            Save
                        </Button>
                    }
                   </Grid>
                </Grid>             
                </Paper>                       
            </Modal>
    );
}
export default connect( null,
    { addTodo, editTodo }
)(withStyles(styles)(AddTaskForm));